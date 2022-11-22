import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from "ethers";

describe("Erc20", function () {

    async function info(erc20: any, admin: any, manager: any, blacklist: any){

        var managers = await erc20.allOps();
        console.log("管理员地址列表：", managers);

        var bl = await erc20.allBl();
        console.log("黑名单地址列表：", bl);

        var name = await erc20.name();
        var symbol = await erc20.symbol();
        var total = await erc20.totalSupply();
        console.log("name: ", name, ", symbol: ", symbol, ", total: ", ethers.utils.formatEther(total));
        var balance = await erc20.balanceOf(admin.address);
        console.log(admin.address + " 余额：" + ethers.utils.formatEther(balance));
        balance = await erc20.balanceOf(manager.address);
        console.log(manager.address + " 余额：" + ethers.utils.formatEther(balance));
        balance = await erc20.balanceOf(blacklist.address);
        console.log(blacklist.address + " 余额：" + ethers.utils.formatEther(balance));
    }

    // 部署固定合约，用于后续测试复用
    async function deployErc20Fixture() {
        // 获取钱包账户
        const [admin, manager, blacklist] = await ethers.getSigners();
        console.log(`\t账户：
        \tadmin：\t\t${admin.address}，
        \tmanager：\t${manager.address}，
        \tblacklist\t${blacklist.address}`);

        // 部署代币合约
        const ERC20Token = await ethers.getContractFactory("ERC20Token");
        var name = "CT";
        var symbol = "CTS";
        var supply = ethers.utils.parseEther('100000');
        var erc20 = await ERC20Token.deploy(name, symbol, supply);
        await erc20.deployed();
        console.log(`ERC20Token deployed to ${erc20.address}`);

        return { admin, manager, blacklist, erc20};
    }

    describe("代币功能验证", function () {
        it("主要功能验证", async function () {
            const { admin, manager, blacklist, erc20 } = await loadFixture(deployErc20Fixture);
            var mint = ethers.utils.parseEther('10000');
            await info(erc20, admin, manager, blacklist);

            console.log("\n验证mint")
            await erc20.connect(admin).mint(manager.address, mint);
            await erc20.connect(admin).mint(blacklist.address, mint);
            await info(erc20, admin, manager, blacklist);

            console.log("\n验证 添加管理员地址");
            await erc20.addOp(manager.address);
            await info(erc20, admin, manager, blacklist);

            // 验证管理员地址
            console.log("\n验证管理员：增发");
            await erc20.connect(manager).mint(manager.address, mint);
            await info(erc20, admin, manager, blacklist);

            console.log("\n验证管理员：销毁");
            await erc20.connect(manager).burn(mint);
            await info(erc20, admin, manager, blacklist);

            // console.log("\n验证管理员：添加黑名单");
            // await erc20.connect(manager).addBl([blacklist.address]);
            // await info(erc20, admin, manager, blacklist);

            // 验证黑名单地址
            console.log("\n验证黑名单");
            await erc20.transfer(blacklist.address, mint); // 单笔转账消耗gas大约：40000
            await erc20.multiTransfer([blacklist.address], [mint]);
            await erc20.connect(blacklist).transfer(manager.address, mint);
        });
    });
});

import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";

describe("Manager", function () {

    // 部署固定合约，用于后续测试复用
    async function deployFixture() {
        // 获取钱包账户
        const [admin1, admin2] = await ethers.getSigners();
        console.log(`\t账户：
        \tadmin1：\t${admin1.address}
        \tadmin2：\t${admin2.address}`);

        // 部署代币合约
        var Manager = await ethers.getContractFactory("Manager");
        var manager = await Manager.deploy({gasLimit: 10000000, gasPrice: 10000000000});
        //var manager = await Manager.deploy();
        await manager.deployed();
        console.log(`Manager deployed to ${manager.address}`);

        return { admin1, admin2, manager};
    }

    describe("管理账户验证", function () {
        it("主要功能验证", async function () {
            const { admin1, admin2, manager } = await loadFixture(deployFixture);
            var managers = await manager.allOps();
            console.log("管理员地址列表：", managers);

            // 添加
            var tx = await manager.addOp(admin2.address);
            var receipt = await tx.wait();

            var managers = await manager.allOps();
            console.log("添加后管理员地址列表：", managers);

            // 删除
            var tx = await manager.connect(admin2).delOp(admin1.address);
            var receipt = await tx.wait();

            var managers = await manager.allOps();
            console.log("删除后管理员地址列表：", managers);
        });
    });
});

import { ethers } from "hardhat";

async function main() {
    const ERC20Token = await ethers.getContractFactory("ERC20Token");
    var name = "CT";
    var symbol = "CTS";
    var supply = ethers.utils.parseEther('10000000000000');
    const erc20 = await ERC20Token.deploy(name, symbol, supply);
    await erc20.deployed();
    console.log(`ERC20Token deployed to ${erc20.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

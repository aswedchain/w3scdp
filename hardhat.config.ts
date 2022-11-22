import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import 'hardhat-abi-exporter';
import 'hardhat-contract-sizer';
import 'hardhat-gas-reporter'

const config: HardhatUserConfig = {
    solidity: "0.8.9",
    networks: {
        private: {
            url: 'http://127.0.0.1:8545',
            // 对应地址：(疑问：与metamask钱包中地址不一致，待分析)
            // 活动管理员 0x8827DAD245AEFDD076e426C6d0f566B44320Ccb8 
            // 节点管理员：0x2E290BB5Ad4177318ed5c1CBcD4B18507AC353e9
            // 矿工：0x0a1231B7044Dfb1A550ED4a5fd386c5e1C36b88E
            // 投票人：0xC4A97825758624eB13664f6675FCD733e4dA3f1f
            accounts: ['0x3a6d97a3392d0b2732a282efc62a87f5e391c291dd78a9ef7c54c3b29bea1b2c', 
                        '0x13386b9df618bec5c3fc58fd3cbbbf3db99cb46f458ed9550c398aff9c8a1e21',
                        '0xa478c53cb205161c1b58956bd41b3d3ca790f1a46204e3401022b65d7eed280d',
                        '0xa6beb56ac8d046b0e1b13ea9b8bcec0cc3cfe729c1fecaf8e6095674b37f957a']
        },
        metatest: {
            url: `http://metarpc.baas.aswed.space/`,
            // 对应地址：
            // 活动管理员 0x8827DAD245AEFDD076e426C6d0f566B44320Ccb8 
            // 节点管理员：0x2E290BB5Ad4177318ed5c1CBcD4B18507AC353e9
            // 矿工：0x0a1231B7044Dfb1A550ED4a5fd386c5e1C36b88E
            // 投票人：0xC4A97825758624eB13664f6675FCD733e4dA3f1f
            accounts: ['0x3a6d97a3392d0b2732a282efc62a87f5e391c291dd78a9ef7c54c3b29bea1b2c', 
                        '0x13386b9df618bec5c3fc58fd3cbbbf3db99cb46f458ed9550c398aff9c8a1e21',
                        '0xa478c53cb205161c1b58956bd41b3d3ca790f1a46204e3401022b65d7eed280d',
                        '0xa6beb56ac8d046b0e1b13ea9b8bcec0cc3cfe729c1fecaf8e6095674b37f957a']
        },
        nfttest: {
            url: `http://nftrpc.baas.aswed.space/`,
            // 对应地址：
            // 活动管理员 0x8827DAD245AEFDD076e426C6d0f566B44320Ccb8 
            // 节点管理员：0x2E290BB5Ad4177318ed5c1CBcD4B18507AC353e9
            // 矿工：0x0a1231B7044Dfb1A550ED4a5fd386c5e1C36b88E
            // 投票人：0xC4A97825758624eB13664f6675FCD733e4dA3f1f
            accounts: ['0x3a6d97a3392d0b2732a282efc62a87f5e391c291dd78a9ef7c54c3b29bea1b2c', 
                        '0x13386b9df618bec5c3fc58fd3cbbbf3db99cb46f458ed9550c398aff9c8a1e21',
                        '0xa478c53cb205161c1b58956bd41b3d3ca790f1a46204e3401022b65d7eed280d',
                        '0xa6beb56ac8d046b0e1b13ea9b8bcec0cc3cfe729c1fecaf8e6095674b37f957a']
        },
        sepolia: {
            url: `http://sepoliarpc.baas.aswed.space/`,
            // 对应地址：
            // 活动管理员 0x8827DAD245AEFDD076e426C6d0f566B44320Ccb8 
            // 节点管理员：0x2E290BB5Ad4177318ed5c1CBcD4B18507AC353e9
            // 矿工：0x0a1231B7044Dfb1A550ED4a5fd386c5e1C36b88E
            // 投票人：0xC4A97825758624eB13664f6675FCD733e4dA3f1f
            accounts: ['0x3a6d97a3392d0b2732a282efc62a87f5e391c291dd78a9ef7c54c3b29bea1b2c', 
                        '0x13386b9df618bec5c3fc58fd3cbbbf3db99cb46f458ed9550c398aff9c8a1e21',
                        '0xa478c53cb205161c1b58956bd41b3d3ca790f1a46204e3401022b65d7eed280d',
                        '0xa6beb56ac8d046b0e1b13ea9b8bcec0cc3cfe729c1fecaf8e6095674b37f957a']
        }
    },
    // 编译abi
    abiExporter: [
        {
            path: './abis/',
            runOnCompile: true,
            clear: true,
            flat: true,
            only: [],
            pretty: false,
            spacing: 4
        },
        {
            path: './abis/pretty',
            runOnCompile: true,
            clear: true,
            flat: true,
            only: [],
            pretty: true,
            spacing: 4
        }
    ],
    // 计算合约大小
    contractSizer: {
        alphaSort: true,
        runOnCompile: true,
        disambiguatePaths: false,
    },
    gasReporter: {
        enabled: true,
        currency: 'CNY',
    },
    mocha:{
        timeout: 1000000
    }
};


export default config;

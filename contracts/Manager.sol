// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./Array.sol";

// 管理员合约
contract Manager {
    // 管理员地址
    mapping(address => bool) managers;
    Array managerAddrs;

     // 不是一个操作员地址
    error NotManager(address addr);
    // 全0地址
    error ZeroAddress();
    // 自己删除自己
    error DelSelf();

    // 构造函数
    constructor()  {
        managers[msg.sender] = true;
        managerAddrs = new Array();
        managerAddrs.push(msg.sender);
    }

    modifier onlyManager(address addr) {
        if (!managers[addr]) {
            // 不是管理员地址
            revert NotManager(addr);
        }
        _;
    }

    function addOp(address manager) external onlyManager(msg.sender) {
        if (manager == address(0)) {
            revert ZeroAddress();
        }
        if(managers[manager]){
            return;
        }
        managers[manager] = true;
        managerAddrs.push(manager);
    }

    function delOp(address manager) external onlyManager(msg.sender) {
        if (manager == msg.sender) {
            // 不能自己删除自己
            revert DelSelf();
        }
        if (managers[manager]) {
            // 之前是有效管理员
            delete managers[manager];
            managerAddrs.remove(manager);
        }
    }

    // 查询所有的管理员地址列表及其状态
    function allOps() external view returns (address[] memory) {
        return managerAddrs.all();
    }
}

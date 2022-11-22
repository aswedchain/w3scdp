// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.9;

import "./Array.sol";

// 黑名单
contract Blacklist {

    // 黑名单记录
    mapping (address => bool) public blacklist;
    Array blAddrs;

    // 全0地址
    error BannedAddress(address addr);

    constructor() {
        blAddrs = new Array();
    }

    modifier notInBlacklist(address addr) {
        if (blacklist[addr]) {
            revert BannedAddress(addr);
        }
        _;
    }

    // 查看所有地址
    function allBl() public view returns(address[] memory){
        return blAddrs.all();
    }

    // 新增地址
    function addBl(address[] calldata addresses) external {
        for(uint i=0;i<addresses.length;i++){
            if(blacklist[addresses[i]]){
                // 已经存在
                continue;
            }
            blacklist[addresses[i]] = true;
            blAddrs.push(addresses[i]);
        }
    }

    // 删除地址
    function removeBl(address[] calldata addresses) external {
        for(uint i=0;i<addresses.length;i++){
            if(!blacklist[addresses[i]]){
                // 不存在
                continue;
            }
            delete blacklist[addresses[i]];
            blAddrs.remove(addresses[i]);
        }
    }
}

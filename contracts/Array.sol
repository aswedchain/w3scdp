// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.9;

// 可删除元素的地址数组
contract Array {

    address[] addrs;

    constructor() {}

    function all() external view returns (address[] memory) {
        return addrs;
    }

    function push(address addr) external {
        return addrs.push(addr);
    }

    // function pop() external {
    //     return addrs.pop();
    // }

    function get(uint index) external view returns (address) {
        return addrs[index];
    }

    function length() external view returns (uint) {
        return addrs.length;
    }

    // 删除数组中元素
    function remove(address addr) external {
        for(uint i=0;i<addrs.length;i++){
            if(addr == addrs[i]){
                addrs[i] = addrs[addrs.length -1];
                addrs.pop();
                return;
            }
        }
    }
}

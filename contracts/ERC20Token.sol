// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import "./Manager.sol";
import "./Blacklist.sol";

// ERC20代币
contract ERC20Token is ERC20, Manager, Blacklist, IERC165 {

    // to地址数量和amount数量不一致
    error ToAndAmountArrayLengthNotEqual(uint toLength, uint amountLength);
    // 转账失败
    error TransferFail(address to, uint amount);

    constructor(
        string memory name,
        string memory symbol,
        uint totalSupply ) ERC20(name, symbol) {
        _mint(msg.sender, totalSupply);
    }

    // 增发
    function mint(address account, uint amount) public onlyManager(msg.sender) {
        _mint(account, amount);
    }

    // 销毁
    function burn(uint amount) external onlyManager(msg.sender) {
        _burn(msg.sender, amount);
    }

    // 批量转账
    function multiTransfer(address[] calldata to, uint[] calldata amount) external {
        if(to.length != amount.length){
            revert ToAndAmountArrayLengthNotEqual(to.length, amount.length);
        }
        for(uint i=0;i<to.length;i++){
            if(!transfer(to[i], amount[i])){
                revert TransferFail(to[i], amount[i]);
            }
        }
    }

    // 统一处理转账前的黑名单拦截
    function _beforeTokenTransfer(address from, address to, uint256 amount) 
                    internal override notInBlacklist(from) notInBlacklist(to) {}

    // 合约类型
    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == type(IERC20).interfaceId;
    }
}

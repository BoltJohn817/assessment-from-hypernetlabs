//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "../contracts/TheButton.sol";

contract TestContract {
    TheButton target;

    constructor(address _contract) {
        target = TheButton(_contract);
    }

    function click() external payable {
        target.click{value: msg.value}();
    }
}

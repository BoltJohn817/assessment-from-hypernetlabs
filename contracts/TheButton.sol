//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract TheButton {
    address public owner;
    address public lastClicker;
    uint256 private timeLimit = 300;
    uint256 public startTime;

    constructor() {
        owner = msg.sender;
        startTime = block.timestamp;
    }

    modifier onlyEOA() {
        uint32 size;
        address _addr = msg.sender;
        assembly {
            size := extcodesize(_addr)
        }
        require(size == 0, "Only EOA calls");
        _;
    }

    function click() external payable onlyEOA {
        require(msg.value >= 1 ether, "The value must be more than 1 ether.");

        payable(msg.sender).transfer(msg.value - 1 ether);

        if (block.timestamp >= startTime + timeLimit) {
            startTime = block.timestamp + timeLimit;

            // If no one clicked in 5 minutes
            // console.log(address(this).balance);
            if (lastClicker != address(0))
                payable(lastClicker).transfer(address(this).balance);
            return;
        }
        startTime = block.timestamp;
        lastClicker = msg.sender;
    }
}

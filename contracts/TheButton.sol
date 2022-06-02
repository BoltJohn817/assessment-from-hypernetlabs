//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract TheButton {
    address public lastClicker;
    uint256 private timeLimit = 4;
    uint256 public startTime;
    uint8 public isFinished;

    constructor() {
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
        require(isFinished == 0, "Clicking is finished");
        require(msg.value == 1 ether, "The value must be 1 ether.");

        if (block.timestamp >= startTime + timeLimit) {
            isFinished = 1;

            // If no one clicked in 5 minutes
            // console.log(address(this).balance);
            if (lastClicker != address(0))
                payable(lastClicker).transfer(address(this).balance);
            return;
        }
        lastClicker = msg.sender;
    }
}

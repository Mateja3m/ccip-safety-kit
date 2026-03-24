// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract UnsafeNoReplay {
    address public allowedSender;

    constructor(address allowedSender_) {
        allowedSender = allowedSender_;
    }

    function ccipReceive(bytes32 messageId, address sender, bytes calldata) external returns (bool) {
        if (sender != allowedSender) {
            revert("bad sender");
        }

        return messageId != bytes32(0);
    }
}


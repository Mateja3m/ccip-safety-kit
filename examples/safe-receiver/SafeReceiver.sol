// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract SafeReceiver {
    error DuplicateMessage(bytes32 messageId);
    error InvalidSender(address sender);

    event MessageProcessed(bytes32 messageId, bool success);

    mapping(bytes32 => bool) public processedMessages;
    address public allowedSender;
    bool public paused;

    constructor(address allowedSender_) {
        allowedSender = allowedSender_;
    }

    function pause() external {
        paused = true;
    }

    function ccipReceive(bytes32 messageId, address sender, bytes calldata data) external returns (bool) {
        if (paused) {
            return false;
        }

        if (sender != allowedSender) {
            revert InvalidSender(sender);
        }

        if (processedMessages[messageId]) {
            revert DuplicateMessage(messageId);
        }

        processedMessages[messageId] = true;
        emit MessageProcessed(messageId, data.length > 0);
        return true;
    }
}


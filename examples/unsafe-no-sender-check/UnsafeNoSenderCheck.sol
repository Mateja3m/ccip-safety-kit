// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract UnsafeNoSenderCheck {
    event MessageProcessed(bytes32 messageId, bool success);

    mapping(bytes32 => bool) public processedMessages;

    function ccipReceive(bytes32 messageId, address, bytes calldata data) external returns (bool) {
        if (processedMessages[messageId]) {
            return false;
        }

        processedMessages[messageId] = true;
        emit MessageProcessed(messageId, data.length > 0);
        return true;
    }
}


# Rules

`ccip-safety-kit` currently uses lightweight heuristic rules intended for fast feedback.

## messageId tracking

Looks for signs that the receiver stores processed message identifiers, typically with a `mapping(bytes32 => bool)`.

Why it matters:

- helps prevent reprocessing
- creates a clear execution history

## replay protection

Looks for logic that rejects or skips already processed messages.

Why it matters:

- prevents replay of the same delivery
- reduces duplicate state transitions

## sender validation

Looks for sender, router, or source-chain validation patterns.

Why it matters:

- restricts who can trigger receiver logic
- reduces spoofing and misrouting risk

## pause control

Looks for a pause flag, pause function, or similar emergency switch.

Why it matters:

- allows fast operational response
- limits blast radius when issues are discovered

## debug events

Looks for structured processing events, such as `MessageProcessed(bytes32 messageId, bool success)`.

Why it matters:

- improves observability
- helps debugging and incident review

## Notes

- These checks are intentionally simple.
- Contracts using inheritance or external libraries for safety logic may not be fully recognized.
- The current rules are best used as pre-audit guidance, not as formal guarantees.


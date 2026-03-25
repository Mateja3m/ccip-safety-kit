# CCIP safety kit

TypeScript CLI for analyzing Solidity CCIP receiver contracts for common safety issues.

`ccip-safety-kit` is an early developer toolkit for catching obvious receiver-safety gaps before audit or deployment. It is designed as a practical PoC: fast to run, easy to understand, and lightweight enough for local development or CI.

Requires Node.js 18 or newer.

## Local usage

If you just want to run the app locally:

```bash
npm install
npm run build
node ./dist/cli.js analyze ./examples
```

Useful local commands:

```bash
# shows CLI help and available flags
node ./dist/cli.js --help

# analyzes all Solidity examples in the examples/ folder
node ./dist/cli.js analyze ./examples

# analyzes only one Solidity file
node ./dist/cli.js analyze ./examples/unsafe-no-replay/UnsafeNoReplay.sol

# prints the same analysis as JSON instead of terminal text
node ./dist/cli.js analyze ./examples --json
```

What this does:

- scans `.sol` files in the given path
- checks for common CCIP receiver safety patterns
- prints warnings and hints in the terminal
- exits with code `1` if warning-level findings are detected

Command summary:

- `npm install`: installs local Node.js dependencies
- `npm run build`: compiles TypeScript from `src/` into runnable JavaScript in `dist/`
- `node ./dist/cli.js --help`: shows CLI usage and example commands
- `node ./dist/cli.js analyze ./examples`: scans every Solidity file inside `examples/`
- `node ./dist/cli.js analyze <file-or-folder>`: scans a custom Solidity file or directory
- `node ./dist/cli.js analyze ./examples --json`: returns machine-readable JSON output

## Why this tool exists

CCIP receiver contracts often repeat the same categories of mistakes:

- missing `messageId` tracking
- weak replay or duplicate execution handling
- missing sender or source validation
- no pause or emergency control
- weak operational event visibility

This package gives teams a lightweight static pass before deeper review. It does not simulate the protocol and it does not replace a security audit.

## Key features

- CLI-first workflow with `analyze <path>`
- TypeScript implementation with no heavy blockchain runtime
- modular rule checks for common receiver safety patterns
- readable terminal output
- optional JSON output for scripting or CI
- minimal Solidity fixtures for examples and rule development

## Installation

Run once locally:

```bash
npm install
npm run build
```

Optional npm-style usage after publish:

```bash
npx ccip-safety-kit analyze ./contracts
npm install -g ccip-safety-kit
ccip-safety-kit analyze ./contracts
```

After publish, replace `./contracts` with the folder or file that contains your Solidity receiver contracts.

Published package examples:

```bash
npx ccip-safety-kit analyze ./contracts
npx ccip-safety-kit analyze ./contracts --json
ccip-safety-kit analyze ./src
ccip-safety-kit analyze ./src/Receiver.sol --json
```

## Example output

```text
ccip-safety-kit
Scanned 3 Solidity file(s), 3 contract(s)
Receiver-like contracts: 3

SafeReceiver  (examples/safe-receiver/SafeReceiver.sol)
  [OK] No obvious CCIP receiver safety issues detected.

UnsafeNoReplay  (examples/unsafe-no-replay/UnsafeNoReplay.sol)
  [WARN] Replay protection not detected.
  [HINT] Reject or ignore already processed messageIds before execution.
  [WARN] No messageId tracking found.
  [HINT] Add a bytes32 => bool mapping, for example processedMessages[messageId].
  [WARN] Duplicate execution prevention not detected.
  [HINT] Guard the receiver path so duplicate deliveries cannot execute business logic twice.
  [INFO] Pause or emergency control not detected.
  [HINT] Consider an admin-controlled pause switch for emergencies.
  [INFO] Missing structured processing events.
  [HINT] Emit a stable event such as MessageProcessed(bytes32 messageId, bool success).
```

## Rule coverage

Current heuristic checks include:

- messageId tracking
- replay protection
- duplicate execution prevention
- sender or source validation
- pause or emergency control
- structured debug events

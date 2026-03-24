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
npx ccip-safety-kit analyze ./examples
npm install -g ccip-safety-kit
ccip-safety-kit analyze ./examples
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

Rule details:

- [Quickstart](./docs/quickstart.md)
- [Rules](./docs/rules.md)
- [Roadmap](./docs/roadmap.md)

## Project structure

```text
ccip-safety-kit/
  src/
    cli.ts
    index.ts
    analyzer/
    rules/
    reporter/
    utils/
  examples/
    safe-receiver/
    unsafe-no-replay/
    unsafe-no-sender-check/
  docs/
    quickstart.md
    rules.md
    roadmap.md
    publishing-checklist.md
  dist/
  README.md
  LICENSE
  package.json
  tsconfig.json
```

## Limitations

- analysis is heuristic and regex-based
- no full Solidity AST or inheritance resolution
- false positives and false negatives are possible
- intended for pre-audit triage, not security guarantees

## Roadmap

- deeper Solidity parsing and AST-backed checks
- rule suppression and config support
- richer reporting formats for CI
- repository and pipeline integration

See [docs/roadmap.md](./docs/roadmap.md).

## Contributing

Contributions are welcome, especially around rule quality, false-positive reduction, fixture coverage, and documentation. Keep changes small, practical, and easy to review.

## License

MIT. See [LICENSE](./LICENSE).

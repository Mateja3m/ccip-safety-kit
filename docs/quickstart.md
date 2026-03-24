# Quickstart

## Install

Use `npx`:

```bash
npx ccip-safety-kit analyze ./examples
```

Or install globally:

```bash
npm install -g ccip-safety-kit
ccip-safety-kit analyze ./examples
```

For local development:

```bash
npm install
npm run build
node ./dist/cli.js analyze ./examples
```

## Run analyze

Analyze a directory:

```bash
ccip-safety-kit analyze ./examples
```

Analyze a single Solidity file:

```bash
ccip-safety-kit analyze ./examples/unsafe-no-sender-check/UnsafeNoSenderCheck.sol
```

Get JSON output:

```bash
ccip-safety-kit analyze ./examples --json
```

## Interpret results

- `[WARN]` means the analyzer did not find an expected safety pattern.
- `[INFO]` means the pattern is useful but may be optional depending on the receiver design.
- `[OK]` means no obvious issues were found by the current rule set.

The tool uses heuristics, so results should be reviewed by a developer rather than accepted blindly.


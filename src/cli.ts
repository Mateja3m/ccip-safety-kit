#!/usr/bin/env node
import path from "node:path";

import { analyzePath } from "./analyzer";
import { formatJsonReport, formatTerminalReport } from "./reporter";
import { pathExists } from "./utils/file-system";

type ParsedArgs = {
  command?: string;
  targetPath?: string;
  json: boolean;
  help: boolean;
};

function parseArgs(argv: string[]): ParsedArgs {
  const args = argv.slice(2);
  const parsed: ParsedArgs = { json: false, help: false };

  for (const arg of args) {
    if (arg === "--json") {
      parsed.json = true;
      continue;
    }

    if (arg === "--help" || arg === "-h") {
      parsed.help = true;
      continue;
    }

    if (!parsed.command) {
      parsed.command = arg;
      continue;
    }

    if (!parsed.targetPath) {
      parsed.targetPath = arg;
      continue;
    }
  }

  return parsed;
}

function helpText(): string {
  return [
    "ccip-safety-kit",
    "",
    "Analyze Solidity CCIP receiver contracts for common safety issues.",
    "",
    "Usage:",
    "  ccip-safety-kit analyze <path> [--json]",
    "  ccip-safety-kit --help",
    "",
    "Examples:",
    "  ccip-safety-kit analyze ./examples",
    "  ccip-safety-kit analyze ./contracts --json",
  ].join("\n");
}

function run(): number {
  const args = parseArgs(process.argv);

  if (args.help || !args.command) {
    console.log(helpText());
    return 0;
  }

  if (args.command !== "analyze") {
    console.error(`Unknown command: ${args.command}`);
    console.error("Run `ccip-safety-kit --help` for usage.");
    return 1;
  }

  if (!args.targetPath) {
    console.error("Missing required path argument.");
    console.error("Usage: ccip-safety-kit analyze <path> [--json]");
    return 1;
  }

  const resolvedPath = path.resolve(args.targetPath);
  if (!pathExists(resolvedPath)) {
    console.error(`Path not found: ${resolvedPath}`);
    return 1;
  }

  const report = analyzePath(resolvedPath);
  const output = args.json ? formatJsonReport(report) : formatTerminalReport(report);
  const hasWarnings = report.contracts.some((contract) =>
    contract.results.some((result) => !result.passed && result.severity === "warning")
  );

  console.log(output);
  return hasWarnings ? 1 : 0;
}

process.exitCode = run();


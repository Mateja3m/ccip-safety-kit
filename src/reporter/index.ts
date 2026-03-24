import path from "node:path";

import type { AnalysisReport, ContractReport, RuleResult } from "../types";

function failedResults(results: RuleResult[]): RuleResult[] {
  return results.filter((result) => !result.passed);
}

function renderContract(report: ContractReport, cwd: string): string[] {
  const lines: string[] = [];
  const relativePath = path.relative(cwd, report.filePath) || report.filePath;
  const failures = failedResults(report.results);

  lines.push(`${report.contractName}  (${relativePath})`);

  if (failures.length === 0) {
    lines.push("  [OK] No obvious CCIP receiver safety issues detected.");
    return lines;
  }

  for (const result of failures) {
    const label = result.severity === "warning" ? "[WARN]" : "[INFO]";
    lines.push(`  ${label} ${result.message}`);
    lines.push(`  [HINT] ${result.suggestion}`);
  }

  return lines;
}

export function formatTerminalReport(report: AnalysisReport, cwd: string = process.cwd()): string {
  const lines: string[] = [];
  const receiverReports = report.contracts.filter((item) => item.isReceiverLike);

  lines.push("ccip-safety-kit");
  lines.push(`Scanned ${report.scannedFiles} Solidity file(s), ${report.scannedContracts} contract(s)`);
  lines.push(`Receiver-like contracts: ${report.receiverContracts}`);

  if (receiverReports.length === 0) {
    lines.push("No receiver-like contracts detected.");
    return lines.join("\n");
  }

  for (const contract of receiverReports) {
    lines.push("");
    lines.push(...renderContract(contract, cwd));
  }

  return lines.join("\n");
}

export function formatJsonReport(report: AnalysisReport): string {
  return JSON.stringify(report, null, 2);
}


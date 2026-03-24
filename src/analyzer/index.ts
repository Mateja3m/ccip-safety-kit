import { runRules } from "../rules";
import type { AnalysisReport, ContractReport } from "../types";
import { extractContracts } from "../utils/contracts";
import { collectSolidityFiles } from "../utils/file-system";

function isReceiverLike(contractBody: string): boolean {
  return (
    /\bccipReceive\s*\(/.test(contractBody) ||
    /\bmessageId\b/.test(contractBody) ||
    /\bAny2EVMMessage\b/.test(contractBody)
  );
}

export function analyzePath(targetPath: string): AnalysisReport {
  const sourceFiles = collectSolidityFiles(targetPath);
  const contracts = sourceFiles.flatMap((file) => extractContracts(file));

  const reports: ContractReport[] = contracts.map((contract) => {
    const receiverLike = isReceiverLike(contract.contractBody);

    return {
      contractName: contract.contractName,
      filePath: contract.filePath,
      isReceiverLike: receiverLike,
      results: receiverLike ? runRules(contract) : [],
    };
  });

  return {
    scannedFiles: sourceFiles.length,
    scannedContracts: reports.length,
    receiverContracts: reports.filter((report) => report.isReceiverLike).length,
    contracts: reports,
  };
}


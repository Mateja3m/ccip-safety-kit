export type RuleSeverity = "warning" | "info";

export type RuleResult = {
  id: string;
  title: string;
  message: string;
  suggestion: string;
  severity: RuleSeverity;
  passed: boolean;
};

export type ContractReport = {
  contractName: string;
  filePath: string;
  isReceiverLike: boolean;
  results: RuleResult[];
};

export type AnalysisReport = {
  scannedFiles: number;
  scannedContracts: number;
  receiverContracts: number;
  contracts: ContractReport[];
};

export type SourceFile = {
  filePath: string;
  source: string;
};

export type ContractContext = {
  filePath: string;
  source: string;
  contractName: string;
  contractBody: string;
};


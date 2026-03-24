import type { ContractContext, RuleResult } from "../types";

export type Rule = {
  id: string;
  check: (context: ContractContext) => RuleResult;
};


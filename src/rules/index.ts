import type { ContractContext, RuleResult } from "../types";
import { detectDebugEvents } from "./detectDebugEvents";
import { detectDuplicateExecution } from "./detectDuplicateExecution";
import { detectMessageIdTracking } from "./detectMessageIdTracking";
import { detectPauseControl } from "./detectPauseControl";
import { detectReplayProtection } from "./detectReplayProtection";
import { detectSenderValidation } from "./detectSenderValidation";
import type { Rule } from "./types";

export const rules: Rule[] = [
  detectMessageIdTracking,
  detectReplayProtection,
  detectDuplicateExecution,
  detectSenderValidation,
  detectPauseControl,
  detectDebugEvents,
];

export function runRules(context: ContractContext): RuleResult[] {
  return rules.map((rule) => rule.check(context));
}


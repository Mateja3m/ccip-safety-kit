import type { Rule } from "./types";

export const detectDebugEvents: Rule = {
  id: "debug-events",
  check(context) {
    const passed =
      /event\s+MessageProcessed\s*\(/.test(context.contractBody) ||
      /emit\s+MessageProcessed\s*\(/.test(context.contractBody) ||
      /event\s+\w*Processed\w*\s*\(/.test(context.contractBody);

    return {
      id: "debug-events",
      title: "structured debug events",
      severity: "info",
      passed,
      message: passed
        ? "Structured processing events detected."
        : "Missing structured processing events.",
      suggestion: passed
        ? "No action suggested."
        : "Emit a stable event such as MessageProcessed(bytes32 messageId, bool success).",
    };
  },
};


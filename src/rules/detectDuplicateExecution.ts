import type { Rule } from "./types";

export const detectDuplicateExecution: Rule = {
  id: "duplicate-execution",
  check(context) {
    const passed =
      /processedMessages\s*\[/.test(context.contractBody) ||
      /return\s+false/.test(context.contractBody) ||
      /revert\s+DuplicateMessage/.test(context.contractBody);

    return {
      id: "duplicate-execution",
      title: "duplicate execution prevention",
      severity: "warning",
      passed,
      message: passed
        ? "Duplicate execution prevention detected."
        : "Duplicate execution prevention not detected.",
      suggestion: passed
        ? "No action suggested."
        : "Guard the receiver path so duplicate deliveries cannot execute business logic twice.",
    };
  },
};


import type { Rule } from "./types";

export const detectMessageIdTracking: Rule = {
  id: "message-id-tracking",
  check(context) {
    const passed =
      /mapping\s*\(\s*bytes32[^)]*=>\s*bool/.test(context.contractBody) ||
      /processedMessages/.test(context.contractBody) ||
      /executedMessages/.test(context.contractBody);

    return {
      id: "message-id-tracking",
      title: "messageId tracking",
      severity: "warning",
      passed,
      message: passed ? "messageId tracking detected." : "No messageId tracking found.",
      suggestion: passed
        ? "No action suggested."
        : "Add a bytes32 => bool mapping, for example processedMessages[messageId].",
    };
  },
};


import type { Rule } from "./types";

export const detectReplayProtection: Rule = {
  id: "replay-protection",
  check(context) {
    const passed =
      /processedMessages\s*\[\s*.*messageId.*\s*\]/s.test(context.contractBody) ||
      /DuplicateMessage/.test(context.contractBody) ||
      /already processed/i.test(context.contractBody) ||
      /replay/i.test(context.contractBody);

    return {
      id: "replay-protection",
      title: "replay protection",
      severity: "warning",
      passed,
      message: passed ? "Replay protection detected." : "Replay protection not detected.",
      suggestion: passed
        ? "No action suggested."
        : "Reject or ignore already processed messageIds before execution.",
    };
  },
};


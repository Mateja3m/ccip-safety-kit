import type { Rule } from "./types";

export const detectSenderValidation: Rule = {
  id: "sender-validation",
  check(context) {
    const passed =
      /allowedSender/.test(context.contractBody) ||
      /InvalidSender/.test(context.contractBody) ||
      /sourceChainSelector/.test(context.contractBody) ||
      /msg\.sender\s*!=/.test(context.contractBody) ||
      /sender\s*!=/.test(context.contractBody);

    return {
      id: "sender-validation",
      title: "sender validation",
      severity: "warning",
      passed,
      message: passed
        ? "Sender or source validation detected."
        : "Sender or source validation not detected.",
      suggestion: passed
        ? "No action suggested."
        : "Validate the trusted router, sender, and optionally source chain selector before processing.",
    };
  },
};


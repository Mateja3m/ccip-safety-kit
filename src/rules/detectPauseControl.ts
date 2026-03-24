import type { Rule } from "./types";

export const detectPauseControl: Rule = {
  id: "pause-control",
  check(context) {
    const passed =
      /\bpaused\b/.test(context.contractBody) ||
      /\bpause\s*\(/.test(context.contractBody) ||
      /\bwhenNotPaused\b/.test(context.contractBody);

    return {
      id: "pause-control",
      title: "pause or emergency control",
      severity: "info",
      passed,
      message: passed
        ? "Pause or emergency control detected."
        : "Pause or emergency control not detected.",
      suggestion: passed ? "No action suggested." : "Consider an admin-controlled pause switch for emergencies.",
    };
  },
};


import fs from "node:fs";
import path from "node:path";

import type { SourceFile } from "../types";

const EXCLUDED_DIRS = new Set(["node_modules", "dist", ".git"]);

export function pathExists(targetPath: string): boolean {
  return fs.existsSync(targetPath);
}

export function collectSolidityFiles(targetPath: string): SourceFile[] {
  const absolutePath = path.resolve(targetPath);
  const stat = fs.statSync(absolutePath);

  if (stat.isFile()) {
    return absolutePath.endsWith(".sol")
      ? [{ filePath: absolutePath, source: fs.readFileSync(absolutePath, "utf8") }]
      : [];
  }

  const files: SourceFile[] = [];
  const queue = [absolutePath];

  while (queue.length > 0) {
    const currentPath = queue.pop();
    if (!currentPath) continue;

    for (const entry of fs.readdirSync(currentPath, { withFileTypes: true })) {
      const fullPath = path.join(currentPath, entry.name);

      if (entry.isDirectory()) {
        if (!EXCLUDED_DIRS.has(entry.name)) {
          queue.push(fullPath);
        }
        continue;
      }

      if (entry.isFile() && entry.name.endsWith(".sol")) {
        files.push({
          filePath: fullPath,
          source: fs.readFileSync(fullPath, "utf8"),
        });
      }
    }
  }

  return files.sort((left, right) => left.filePath.localeCompare(right.filePath));
}


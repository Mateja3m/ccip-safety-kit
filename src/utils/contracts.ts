import type { ContractContext, SourceFile } from "../types";

export function extractContracts(file: SourceFile): ContractContext[] {
  const contractPattern = /\bcontract\s+([A-Za-z_][A-Za-z0-9_]*)[^{]*\{/g;
  const contracts: ContractContext[] = [];

  for (const match of file.source.matchAll(contractPattern)) {
    const contractName = match[1];
    const startIndex = match.index ?? 0;
    const openingBraceIndex = file.source.indexOf("{", startIndex);
    const closingBraceIndex = findMatchingBrace(file.source, openingBraceIndex);

    if (closingBraceIndex === -1) {
      continue;
    }

    contracts.push({
      filePath: file.filePath,
      source: file.source,
      contractName,
      contractBody: file.source.slice(openingBraceIndex + 1, closingBraceIndex),
    });
  }

  return contracts;
}

function findMatchingBrace(source: string, openingBraceIndex: number): number {
  let depth = 0;

  for (let index = openingBraceIndex; index < source.length; index += 1) {
    const char = source[index];
    if (char === "{") depth += 1;
    if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        return index;
      }
    }
  }

  return -1;
}


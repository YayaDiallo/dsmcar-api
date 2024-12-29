/* eslint-disable */
// @ts-nocheck

import Path from "node:path";
import URL from "node:url";
import FS from "node:fs";

const mapping = new Map([
  [".js", [".js", ".ts", ".tsx", ".jsx"]],
  [".cjs", [".cjs", ".cts"]],
  [".mjs", [".mjs", ".mts"]],
  [".jsx", [".jsx", ".tsx"]],
]);

export function resolve(specifier, context, next) {
  if (!specifier.startsWith(".")) {
    return next(specifier, context);
  }

  const parentURL = context.parentURL;
  if (
    !parentURL ||
    !parentURL.startsWith("file:") ||
    parentURL.includes("/.yarn/")
  ) {
    return next(specifier, context);
  }

  const specifiedExtension = Path.extname(specifier);
  const sourceExtensions = mapping.get(specifiedExtension);
  if (!sourceExtensions) {
    return next(specifier, context);
  }

  const location = Path.dirname(URL.fileURLToPath(parentURL));
  const required = specifier.slice(0, -specifiedExtension.length);
  const path = Path.join(location, required);
  for (const sourceExtension of sourceExtensions) {
    if (FS.existsSync(path + sourceExtension)) {
      return next(required + sourceExtension, context);
    }
  }

  return next(specifier, context);
}

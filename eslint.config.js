import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["src/**/*.{ts,js}"],
  },
  { languageOptions: { sourceType: "module", globals: globals.node } },
  {
    rules: {
      "prettier/prettier": ["error", { singleQuote: true }],
      "no-use-before-define": ["error", { functions: false }],
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettier,
];

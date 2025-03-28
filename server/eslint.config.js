import js from "@eslint/js";
import jsdoc from "eslint-plugin-jsdoc";
import n from "eslint-plugin-n";
import prettierConfig from "eslint-config-prettier";

/**
 * @type {Array<import("eslint").Linter.Config>}
 */
export default [
  js.configs.recommended,
  jsdoc.configs["flat/recommended"],
  n.configs["flat/recommended"],
  prettierConfig,
  {
    name: "own/recommended",
    files: ["**/*.js"],
    rules: {
      "jsdoc/require-description": "warn",
      "no-console": ["error", { allow: ["error", "warn", "info"] }],
      "no-unused-vars": [
        "error",
        { args: "after-used", destructuredArrayIgnorePattern: "^_" },
      ],
    },
  },
];

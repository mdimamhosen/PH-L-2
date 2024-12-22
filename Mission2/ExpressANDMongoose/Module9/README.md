# Typescript module

<!--
Project setup using eslint and prettier

eslint -->

first in tsconfig.json file add this [,
"include": ["src"], // which files to compile
"exclude": ["node_modules"] // which files to skip] ]

then npm eslint --init

then eslint.config.json file --->

import globals from "globals";

import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

/** @type {import('eslint').Linter.FlatConfig[]} \*/
export default [
{
files: ["**/\*.{js,mjs,cjs,ts}"], // Target .js, .mjs, .cjs, .ts files
languageOptions: {
parser: tsParser, // Use TypeScript parser for TypeScript files
globals: {
...globals.browser, // Include browser globals
process: "readonly", // Add 'process' as a global variable
},
},
plugins: {
"@typescript-eslint": tseslint, // Register the TypeScript plugin
},
rules: {

      "semi": ["error", "always"], // Enforce semicolons
      "quotes": ["warn", "double"], // Enforce double quotes
      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }], // Ignore unused variables starting with _
      "no-var": "error", // Disallow var
      "no-unused-vars": "error", // Standard unused-vars rule
      "prefer-const": ["warn", { "ignoreReadBeforeAssign": true }], // Prefer const for variables
      "@typescript-eslint/no-require-imports": "off", // Disable the rule that forbids 'require',
      "no-used-expressions": "error",
      "no-console": "warn",
      "no-undef": "error",
    },
    ignores: [".node_modules/*", "dist/*" , ".gitignore"], // Ignore node_modules and dist directories

},
// Manually including the recommended configurations
{
rules: {
...pluginJs.configs.recommended.rules, // Manually include rules from @eslint/js
...tseslint.configs["recommended"].rules, // Manually include TypeScript plugin recommended rules
},
},
];
]]

Instructions: Add the basic commands for eslint.

prettier --> [
{
"semi": true,
"singleQuote": true,
"arrowParens": "avoid"
}
]
Instructions: Add the basic commands for prettier.

--- > Scripts: [
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1",
"build": "tsc",
"lint": "eslint \"src/**/*.ts\"",
"lint:fix": "npx eslint src --fix",
"format": "prettier --ignore-path .gitignore --write \"**/*.+(js|ts|json)\"",
"start:dev": "ts-node-dev --respawn --transpile-only ./src/server.ts",
"start:prod": "node ./dist/server.js",
"start": "nodemon ./dist/server.js"
},
]

--- > ts-node-dev and how to use : Instruction

npx ts-node-dev --respawn --transpile-only ./dist/server.js

-->

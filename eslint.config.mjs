import { defineConfig, globalIgnores } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextCoreWebVitals,
  ...nextTypeScript,
  globalIgnores([".next/**", "node_modules/**", "check-settings-schema.js", "upload-logo.js"]),
  {
    rules: {
      // These existing state transitions are intentional UI synchronization;
      // the project does not opt into the React Compiler yet.
      "react-hooks/set-state-in-effect": "off"
    }
  }
]);

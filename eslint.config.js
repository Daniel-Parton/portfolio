import mantine from 'eslint-config-mantine';
import tseslint from 'typescript-eslint';
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort";

export default tseslint.config(
  ...mantine,
  { ignores: ['**/*.{mjs,cjs,js,d.ts,d.mts}', './.storybook/main.ts'] },
  {
    files: ['**/*.story.tsx'],
    plugins: {
      "simple-import-sort": simpleImportSortPlugin
    },
    rules: { 
      'no-console': 'off' 
    },
  }
);

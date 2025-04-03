// Rollup plugin to generate index.ts for src/components
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generateIndex() {
  return {
    name: 'generate-index',
    buildStart() {
      console.log('generateIndex plugin: buildStart hook triggered.');
      const componentsDir = path.resolve(__dirname, 'src/components');
      const indexPath = path.resolve(componentsDir, 'index.ts');
      const exportStatements = ['// This file is auto-generated. Do not edit or delete.'];

      function walk(dir) {
        const files = fs.readdirSync(dir);
        files.forEach((file) => {
          const fullPath = path.join(dir, file);
          const stat = fs.statSync(fullPath);
          if (stat.isDirectory()) {
            walk(fullPath);
          } else if (file === 'index.tsx' || file === 'index.ts') {
            const relativePath = path.relative(componentsDir, path.dirname(fullPath));
            const componentName = path.basename(relativePath);
            const fileContent = fs.readFileSync(fullPath, 'utf8');

            const hasDefaultExport = fileContent.includes('export default');
            const namedExportsMatch = fileContent.match(/export const (\w+)/g);
            const namedExports = namedExportsMatch ? namedExportsMatch.map((match) => match.split(' ')[2]) : [];

            if (hasDefaultExport) {
              exportStatements.push(`export { default as ${componentName} } from './${relativePath}';`);
              console.log(`Added default export for component: ${componentName}`);
            }

            if (namedExports.length > 0) {
              exportStatements.push(`export { ${namedExports.join(', ')} } from './${relativePath}';`);
              console.log(`Added named exports for component: ${componentName}: ${namedExports.join(', ')}`);
            }

            if (!hasDefaultExport && namedExports.length === 0) {
              console.log(`No exports found in component: ${componentName}`);
            }
          }
        });
      }

      walk(componentsDir);

      fs.writeFileSync(indexPath, exportStatements.join('\n'));
      console.log(`Index file generated at: ${indexPath}`);
    },
  };
}

export default generateIndex;
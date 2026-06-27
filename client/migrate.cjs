const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, 'src');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const fileDir = path.dirname(filePath);

  // Match import statements: import ... from '...'
  const importRegex = /from\s+['"]([^'"]+)['"]/g;
  
  let modified = false;
  let newContent = content.replace(importRegex, (match, importPath) => {
    // Only process relative imports that go up
    if (importPath.startsWith('../')) {
      const resolvedPath = path.resolve(fileDir, importPath);
      // Check if the resolved path is within the src directory
      if (resolvedPath.startsWith(srcDir)) {
        let aliasPath = resolvedPath.replace(srcDir, '@').replace(/\\/g, '/');
        modified = true;
        return `from '${aliasPath}'`;
      }
    }
    return match;
  });

  if (modified) {
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`Updated: ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx') || fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
      processFile(fullPath);
    }
  }
}

walkDir(srcDir);
console.log("Migration complete.");

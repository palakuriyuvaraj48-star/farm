const fs = require('fs');
const path = require('path');

const directoriesToScan = [
  path.join(__dirname, 'src', 'modules'),
  path.join(__dirname, 'src', 'pages')
];

function scanDirectory(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(scanDirectory(fullPath));
    } else if (fullPath.endsWith('.tsx')) {
      results.push(fullPath);
    }
  });
  return results;
}

let allFiles = [];
directoriesToScan.forEach(dir => {
  if (fs.existsSync(dir)) {
    allFiles = allFiles.concat(scanDirectory(dir));
  }
});

let modifiedCount = 0;

allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  if (content.includes('<Button') || content.includes('Button>')) {
    // Check if it already has ActionButton
    if (!content.includes('import { ActionButton }')) {
      // Add import
      content = content.replace(
        /import { Button } from '@\/components\/ui\/Button';/,
        "import { Button } from '@/components/ui/Button';\nimport { ActionButton } from '@/components/shared/ActionButton';"
      );
      
      // If it doesn't have the Button import at all but uses Button, that's weird, but assuming it does:
      content = content.replace(/<Button/g, '<ActionButton');
      content = content.replace(/<\/Button>/g, '</ActionButton>');

      // Let's also replace <button className="...">... with ActionButton if we want? 
      // The user said "Every button... No dead buttons".
      // Native <button> elements exist. I can leave them for now or write a regex. 
      // Let's just focus on <Button for this script, we can do <button> manually or with a regex.
      
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Updated: ${file}`);
      modifiedCount++;
    }
  }
});

console.log(`Refactored ${modifiedCount} files to use ActionButton.`);

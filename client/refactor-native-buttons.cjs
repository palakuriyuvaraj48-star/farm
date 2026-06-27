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

allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  if (content.includes('<button') && !content.includes('</ActionButton>')) {
    // some might already have ActionButton imported, some might not.
    if (!content.includes('import { ActionButton }')) {
      content = "import { ActionButton } from '@/components/shared/ActionButton';\n" + content;
    }
    
    // Replace <button with <ActionButton variant="ghost"
    // Wait, <button className="..."> -> <ActionButton className="..."
    content = content.replace(/<button /g, '<ActionButton ');
    content = content.replace(/<button>/g, '<ActionButton>');
    content = content.replace(/<\/button>/g, '</ActionButton>');

    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated native buttons: ${file}`);
  }
});

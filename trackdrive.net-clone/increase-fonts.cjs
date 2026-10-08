const fs = require('fs');
const path = require('path');

function increaseFontSizes(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const updatedContent = content.replace(/font-size:\s*(\d+)px/g, (match, size) => {
    return `font-size: ${parseInt(size, 10) + 2}px`;
  });
  fs.writeFileSync(filePath, updatedContent);
  console.log(`Updated ${filePath}`);
}

increaseFontSizes(path.join(__dirname, 'src/App.css'));
increaseFontSizes(path.join(__dirname, 'src/pages.css'));

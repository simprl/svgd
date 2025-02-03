import fs from 'fs';
import path from 'path';

// Mapping file extensions to syntax highlighting languages
const extensionToLang = {
    '.js': 'javascript',
    '.ts': 'typescript',
    '.json': 'json',
    '.html': 'html',
    '.css': 'css',
    '.md': 'markdown',
    // Add more extensions as needed
};

// Returns the language for a given file based on its extension
function getLanguageForFile(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    return extensionToLang[ext] || '';
}

// Recursively traverse a directory and return an array of absolute file paths
function traverseDir(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    for (const item of list) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            results = results.concat(traverseDir(fullPath));
        } else {
            results.push(fullPath);
        }
    }
    return results;
}

// Generate the Markdown file based on the src and tests folders in the root directory
function generateMarkdown(rootDir) {
    // Define the src and tests directories within the root
    const srcDir = path.join(rootDir, 'src');
    const testsDir = path.join(rootDir, 'tests');

    // Check if the src directory exists
    if (!fs.existsSync(srcDir) || !fs.statSync(srcDir).isDirectory()) {
        console.error(`Source directory not found: ${srcDir}`);
        process.exit(1);
    }

    // Get all files from the src directory
    const srcFiles = traverseDir(srcDir);

    // Sort files by their path relative to the root directory
    srcFiles.sort((a, b) => {
        const relA = path.relative(rootDir, a);
        const relB = path.relative(rootDir, b);
        return relA.localeCompare(relB);
    });

    let mdContent = '# Project Files\n\n';

    // Process each file in src
    for (const filePath of srcFiles) {
        // Get the file path relative to the root directory
        const relativePath = path.relative(rootDir, filePath);
        mdContent += `## ${relativePath}\n\n`;

        // Read the file content
        let fileContent;
        try {
            fileContent = fs.readFileSync(filePath, 'utf8');
        } catch (err) {
            fileContent = `*Error reading file: ${err.message}*`;
        }

        const language = getLanguageForFile(filePath);
        mdContent += `\`\`\`${language}\n${fileContent}\n\`\`\`\n\n`;

        // Construct the corresponding test file path:
        // For a source file like src/a/b.ts, the test file is expected to be tests/a/b.test.ts
        const relativeFromSrc = path.relative(srcDir, filePath);
        const fileDir = path.dirname(relativeFromSrc);
        const fileBase = path.basename(relativeFromSrc, path.extname(relativeFromSrc));
        const testFileName = `${fileBase}.test.ts`;
        const testFilePath = path.join(testsDir, fileDir, testFileName);

        if (fs.existsSync(testFilePath) && fs.statSync(testFilePath).isFile()) {
            const testRelativePath = path.relative(rootDir, testFilePath);
            mdContent += `### Test File: ${testRelativePath}\n\n`;

            let testFileContent;
            try {
                testFileContent = fs.readFileSync(testFilePath, 'utf8');
            } catch (err) {
                testFileContent = `*Error reading test file: ${err.message}*`;
            }

            const testLanguage = getLanguageForFile(testFilePath);
            mdContent += `\`\`\`${testLanguage}\n${testFileContent}\n\`\`\`\n\n`;
        }
    }

    // The output file is always project_files.md in the root directory
    const outputFile = path.join(rootDir, 'project_files.md');
    fs.writeFileSync(outputFile, mdContent, 'utf8');
    console.log(`Markdown file created successfully: ${outputFile}`);
}

// Process the command-line argument (root directory)
const args = process.argv.slice(2);
if (args.length < 1) {
    console.log('Usage: node generate-md.js <root_directory>');
    process.exit(1);
}

const rootDir = path.resolve(args[0]);
generateMarkdown(rootDir);

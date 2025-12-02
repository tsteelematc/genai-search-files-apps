import * as fs from 'fs';
import * as path from 'path';

const searchPath = "C:\\Users\\t-ste\\OneDrive - Madison College";
const searchTerm = "quiz";

console.log(`Searching for files containing '${searchTerm}' in their name at the root of: ${searchPath}`);
console.log("----------------------------------------------------------");

try {
    const files = fs.readdirSync(searchPath);

    const filteredAndSortedFiles = files
        .filter(file => file.toLowerCase().includes(searchTerm.toLowerCase()))
        .map(file => {
            const filePath = path.join(searchPath, file);
            const stats = fs.statSync(filePath);
            return {
                name: file,
                modified: stats.mtime
            };
        })
        .sort((a, b) => b.modified.getTime() - a.modified.getTime());

    if (filteredAndSortedFiles.length === 0) {
        console.log("No files found matching the criteria.");
    } else {
        console.log("Found files (sorted by date modified):");
        filteredAndSortedFiles.forEach(file => {
            console.log(`- ${file.name} (Last Modified: ${file.modified.toLocaleString()})`);
        });
    }
} catch (err) {
    if (err instanceof Error) {
        console.error(`An unexpected error occurred: ${err.message}`);
    } else {
        console.error("An unexpected error occurred:", err);
    }
}

console.log("----------------------------------------------------------");
console.log("Search complete.");

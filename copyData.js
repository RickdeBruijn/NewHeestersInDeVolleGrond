import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distFolder = path.resolve(__dirname, 'dist');
const srcScriptsFolder = path.resolve(__dirname, 'public/scripts');
const htaccessSrc = path.resolve(__dirname, 'public/.htaccess');

// Define the private data folder
const srcPrivateDataFolder = path.resolve(__dirname, 'private_data');

// Copy public scripts, data folder, and .htaccess
fs.copySync(srcScriptsFolder, path.join(distFolder, 'scripts'));
fs.copySync(htaccessSrc, path.join(distFolder, '.htaccess'));

// Copy private data folder to dist/private_data
fs.copySync(srcPrivateDataFolder, path.join(distFolder, 'private_data'));

console.log('✅ Scripts, data folder, .htaccess, and private_data copied to build folder');
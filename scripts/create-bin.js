import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const buildDir = path.join(__dirname, '..', 'build');
const appFile = path.join(buildDir, 'app.js');

let content = fs.readFileSync(appFile, 'utf8');

if (!content.startsWith('#!/usr/bin/env node')) {
  content = '#!/usr/bin/env node\n' + content;
  fs.writeFileSync(appFile, content);
}

const cmdContent = `@echo off
node "%~dp0\\app.js" %*`;

fs.writeFileSync(path.join(buildDir, 'app.cmd'), cmdContent);

console.log('✓ Created executable files for npm distribution');
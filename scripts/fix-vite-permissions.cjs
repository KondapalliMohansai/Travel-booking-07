// Some Linux deployment environments restore the Vite executable without its
// executable bit. Correct it before the production build. On Windows this is a no-op.
const fs = require('node:fs');
const path = require('node:path');

if (process.platform !== 'win32') {
  const viteBin = path.resolve(__dirname, '..', 'node_modules', '.bin', 'vite');
  try {
    fs.accessSync(viteBin, fs.constants.F_OK);
    fs.chmodSync(viteBin, 0o755);
  } catch (error) {
    // If Vite has not been installed, let npm/Vite report the more useful error.
    if (error.code !== 'ENOENT') {
      console.warn(`Could not adjust Vite permissions: ${error.message}`);
    }
  }
}

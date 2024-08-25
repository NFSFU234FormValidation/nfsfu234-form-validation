// tsup.config.ts
import { defineConfig } from 'tsup';
import path from 'path';
import fs from 'fs/promises';

async function moveDtsFiles() {
  const distDir = path.resolve(__dirname, 'dist');
  const jsDir = path.join(distDir, 'js');
  const typesDir = path.join(distDir, 'types');

  try {
    await fs.mkdir(typesDir, { recursive: true });
    console.log(`Created types directory at ${typesDir}`);

    const files = await fs.readdir(jsDir);
    console.log(`Files in js directory: ${files.join(', ')}`);

    for (const file of files) {
      if (file.endsWith('.d.ts') || file.endsWith('.d.mts')) {
        const oldPath = path.join(jsDir, file);
        const newPath = path.join(typesDir, file);

        await fs.rename(oldPath, newPath);
        console.log(`Moved ${file} to types directory`);
      }
    }
  } catch (err) {
    console.error('Error moving .d.ts files:', err);
  }
}

export default defineConfig({
  entry: ['src/ts/nfsfu234FormValidation.ts'],
  format: ['cjs', 'esm', 'iife'],
  dts: {
    entry: 'src/ts/nfsfu234FormValidation.ts',
  },
  outDir: 'dist/js',
  minify: true,
  sourcemap: true,
  async onSuccess() {
    console.log("onSuccess hook triggered");
    // Defer moving of .d.ts files to ensure they are generated first
    await new Promise(resolve => setTimeout(resolve, 5000)); // Increased delay to wait for DTS generation
    await moveDtsFiles();

    // Rename the generated files
    await fs.rename('dist/js/nfsfu234FormValidation.js', 'dist/js/nfsfu234FormValidation.module.js'); // Assuming the original is esm
    await fs.rename('dist/js/nfsfu234FormValidation.global.js', 'dist/js/nfsfu234FormValidation.js');
    await fs.rename('dist/js/nfsfu234FormValidation.global.js.map', 'dist/js/nfsfu234FormValidation.js.map');
  }

  
});

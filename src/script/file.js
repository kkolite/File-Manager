import path from 'path';
import fs from 'fs';

const { stdout } = process;

const readFile = (name) => {
    const directory = process.cwd();
    const src = path.join(directory, name);

    try {
        const stream = fs.createReadStream(src);

        let data = '';

        stream.on('data', chunk => data += chunk);
        stream.on('end', () => stdout.write(data));
    } catch {
        stdout.write('FS operation failed');
    }
}

export { readFile }
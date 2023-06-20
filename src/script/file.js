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

const renameFile = (file, name) => {
    const directory = process.cwd();
    const src = path.join(directory, file);

    fs.rename(src, name, function (err) {
        if (err) stdout.write('FS operation failed');
        stdout.write('File Renamed!');
    });
}

const createFile = (file) => {
    const directory = process.cwd();
    const src = path.join(directory, file);

    fs.writeFile(src, '', function (err) {
        if (err) {
            stdout.write('FS operation failed');
            return;
        }
        stdout.write('Create!');
    });
}

export { readFile, renameFile, createFile }
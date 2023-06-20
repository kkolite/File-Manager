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

const removeFile = (file) => {
    const directory = process.cwd();
    const src = path.join(directory, file);

    fs.unlink(src, function (err) {
        if (err) {
            stdout.write('FS operation failed');
            return;
        }
        stdout.write('File deleted!');
    });
}

const copyFiles = (file, copySrc) => {
    const directory = process.cwd();
    const src = path.join(directory, file);

    const writeFile = (data, file, copySrc) => {
        const directory = process.cwd();

        const src = path.join(directory, copySrc, file);

        fs.writeFile(src, '', function (err) {
            if (err) {
                stdout.write('FS operation failed');
                return;
            }
            stdout.write('Copy!');
        });
    }

    try {
        const stream = fs.createReadStream(src);

        let data = '';

        stream.on('data', chunk => data += chunk);
        stream.on('end', () => writeFile(data, file, copySrc));
    } catch {
        stdout.write('FS operation failed');
    }
}

export { readFile, renameFile, createFile, removeFile, copyFiles }
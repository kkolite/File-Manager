import path from 'path';
import fs from 'fs';
import { createHash } from 'node:crypto';
import zlib from 'zlib';
import { pipeline } from 'stream/promises';
import {MESSAGES} from "../messages.js";

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
        stdout.write(MESSAGES.ERROR);
    }
}

const renameFile = (file, name) => {
    const directory = process.cwd();
    const src = path.join(directory, file);

    fs.rename(src, name, function (err) {
        if (err) stdout.write(MESSAGES.ERROR);
        stdout.write(MESSAGES.RENAME);
    });
}

const createFile = (file) => {
    const directory = process.cwd();
    const src = path.join(directory, file);

    fs.writeFile(src, '', function (err) {
        if (err) {
            stdout.write(MESSAGES.ERROR);
            return;
        }
        stdout.write(MESSAGES.CREATE);
    });
}

const removeFile = (file) => {
    const directory = process.cwd();
    const src = path.join(directory, file);

    fs.unlink(src, function (err) {
        if (err) {
            stdout.write(MESSAGES.ERROR);
            return;
        }
        stdout.write(MESSAGES.DELETE);
    });
}

const copyFiles = (file, copySrc, isMove = false) => {
    const directory = process.cwd();
    const src = path.join(directory, file);

    const removeOriginal = () => {
        fs.unlink(src, function (err) {
            if (err) {
                stdout.write(MESSAGES.ERROR);
                return;
            }
        });
    }

    const writeFile = (data, file, copySrc, isMove) => {
        if (isMove) removeOriginal();

        const directory = process.cwd();

        const src = path.join(directory, copySrc, file);

        fs.writeFile(src, '', function (err) {
            if (err) {
                stdout.write(MESSAGES.ERROR);
                return;
            }
            stdout.write(isMove ? MESSAGES.MOVED : MESSAGES.CREATE);
        });
    }

    try {
        const stream = fs.createReadStream(src);

        let data = '';

        stream.on('data', chunk => data += chunk);
        stream.on('end', () => writeFile(data, file, copySrc, isMove));
    } catch {
        stdout.write(MESSAGES.ERROR);
    }
}

const calculateHash = (file) => {
    const directory = process.cwd();

    const src = path.join(directory, file);

    const createSHA = (data) => createHash('sha256').update(data).digest('hex');

    const logSHA = (data) => {
        const result = createSHA(data);
        stdout.write(result);
    }

    try {
        const stream = fs.createReadStream(src);

        let data = '';

        stream.on('data', chunk => data += chunk);
        stream.on('end', () => logSHA(data));
    } catch {
        stdout.write(MESSAGES.ERROR);
    }
};

const compress = async (file, src) => {
    const directory = process.cwd();

    const srcToRead = path.join(directory, file);
    const srcToWrite = path.join(directory, src);

    const gzip = zlib.createBrotliCompress();

    const read = fs.createReadStream(srcToRead);
    const write = fs.createWriteStream(srcToWrite);
    await pipeline(read, gzip, write);
};

const decompress = async (file, src) => {
    const directory = process.cwd();

    const srcToRead = path.join(directory, file);
    const srcToWrite = path.join(directory, src);

    const gzip = zlib.createBrotliDecompress();

    const read = fs.createReadStream(srcToRead);
    const write = fs.createWriteStream(srcToWrite);
    await pipeline(read, gzip, write);
};

export { readFile, renameFile, createFile, removeFile, copyFiles, calculateHash, compress, decompress }
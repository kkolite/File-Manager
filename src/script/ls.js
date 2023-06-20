import fs from 'fs';

const { stdout } = process;

const showList = async (src) => {
    fs.readdir(src, (err, files) => {
        if (err) throw new Error('FS operation failed');
        files.forEach(file => {
            stdout.write(`\n${file}\n`);
        });
    });
};

export { showList };
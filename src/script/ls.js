import fs from 'fs';
import {MESSAGES} from "../messages.js";

const { stdout } = process;

const showList = async (src) => {
    fs.readdir(src, (err, files) => {
        if (err) throw new Error(MESSAGES.ERROR);
        files.forEach(file => {
            stdout.write(`\n${file}\n`);
        });
    });
};

export { showList };
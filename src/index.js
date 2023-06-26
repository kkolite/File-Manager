import { showList } from './script/ls.js';
import { changeDirectory, up } from './script/cd.js'
import { getOsInfo } from './script/os.js'
import { readFile, renameFile, createFile, removeFile, copyFiles, calculateHash, compress, decompress } from './script/file.js';
import {MESSAGES} from "./messages.js";

const {stdout, stdin, argv} = process;

const regex = /--username.+/g;

const commandList = {
    up: "up",
    cd: /cd.+/g,
    ls: "ls",
    [".exit"]: ".exit",
    os: /os.+/g,
    cat: /cat.+/g,
    rn: /rn.+/g,
    add: /add.+/g,
    rm: /rm.+/g,
    cp: /cp.+/g,
    mv: /mv.+/g,
    hash: /hash.+/g,
    compress: /compress.+/,
    decompress: /decompress.+/,
}

const handleStdin = async (data) => {
    const text = data.toString();
    const src = process.cwd();

    const args = text.trim().split(' ');

    if (text.match(commandList[".exit"])) process.exit();

    else if (text.match(commandList.ls)) await showList(src);

    else if (text.match(commandList.cd)) changeDirectory(args[1]);

    else if (text.match(commandList.up)) up();

    else if (text.match(commandList.os)) getOsInfo(args[1]);

    else if (text.match(commandList.cat)) readFile(args[1]);

    else if (text.match(commandList.add)) createFile(args[1]);

    else if (text.match(commandList.rm)) removeFile(args[1]);

    else if (text.match(commandList.hash)) calculateHash(args[1]);

    else if (text.match(commandList.rn)) renameFile(args[1], args[2]);

    else if (text.match(commandList.cp)) copyFiles(args[1], args[2]);

    else if (text.match(commandList.mv)) copyFiles(args[1], args[2], true);

    else if (text.match(commandList.compress)) await compress(args[1], args[2]);

    else if (text.match(commandList.decompress)) await decompress(args[1], args[2]);

    else stdout.write(`${MESSAGES.UNKNOWN}${[Object.keys(commandList).join(`\n`)]}\n`)

    stdout.write(`You are currently in ${process.cwd()}\n`);
}

const handleExit = (username) => stdout.write(`Thank you for using File Manager, ${username}, goodbye!\n`);

const startApp = () => {
    let username;

    argv.forEach((el, i) => {
        if (!el.match(regex)) return;

        username = el.split('=')[1];

        stdout.write(`Welcome to the File Manager, ${username}!\n`);
    })

    stdin.on('data', handleStdin);

    process.on('exit', () => handleExit(username));
    process.on('SIGINT', () => process.exit());
}

startApp();
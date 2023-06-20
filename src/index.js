import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { showList } from './script/ls.js';
import { changeDirectory, up } from './script/cd.js'
import { getOsInfo } from './script/os.js'

const {stdout, stdin, argv} = process;

const regex = /--username.+/g;

const commandList = {
    up: "up",
    cd: /cd.+/g,
    ls: "ls",
    exit: ".exit",
    os: /os.+/g,
}

const getDirectoryPath = () => {
    const __filename = fileURLToPath(import.meta.url);
    return  dirname(__filename);
}

const handleStdin = async (data) => {
    const text = data.toString();
    const src = getDirectoryPath()

    if (text.match(commandList.exit)) process.exit();

    if (text.match(commandList.ls)) await showList(src);

    if (text.match(commandList.cd)) changeDirectory(text.split(' ')[1]);

    if (text.match(commandList.up)) up();

    if (text.match(commandList.os)) getOsInfo(text.split(' ')[1]);

    stdout.write(`You are currently in ${src}\n`);
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
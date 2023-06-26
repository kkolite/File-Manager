import os from 'os';
import {MESSAGES} from "../messages.js";

const { stdout } = process;

const optionList = {
    cpus: '--cpus',
    username: '--username',
    homedir: '--homedir',
    EOL: '--EOL',
    arch: '--architecture',
}

const getOsInfo = (option) => {
    if (option.match(optionList.cpus)) {
        const cpus = os.cpus();
        const message = `Total: ${cpus.length} \n ${cpus.reduce((acc, cpu) => acc + `Name: ${cpu.model}\nClock rate: ${cpu.speed}GHz\n\n`, '')}`
        stdout.write(message);
        return;
    }

    if (option.match(optionList.username)) {
        const message = os.userInfo().username;
        stdout.write(message);
        return;
    }

    if (option.match(optionList.homedir)) {
        const message = os.userInfo().homedir;
        stdout.write(message);
        return;
    }

    if (option.match(optionList.EOL)) {
        const message = os.EOL;
        stdout.write(JSON.stringify(message));
        return;
    }

    if (option.match(optionList.arch)) {
        const message = os.arch();
        stdout.write(message);
        return;
    }

    const errorMessage = `${MESSAGES.UNKNOWN}${[Object.values(optionList).join(`\n`)]}\n`;
    stdout.write(errorMessage);
}

export { getOsInfo }
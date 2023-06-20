import os from 'os';

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
        console.log(message)
    }

    if (option.match(optionList.username)) {
        const message = os.userInfo().username;
        console.log(message)
    }

    if (option.match(optionList.homedir)) {
        const message = os.userInfo().homedir;
        console.log(message)
    }

    if (option.match(optionList.EOL)) {
        const message = os.EOL;
        console.log(JSON.stringify(message))
    }

    if (option.match(optionList.arch)) {
        const message = os.arch();
        console.log(message)
    }
}

export { getOsInfo }
import os from 'os';

const optionList = {
    cpus: '--cpus',
    username: '--username',
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
}

export { getOsInfo }
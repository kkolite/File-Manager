import os from 'os';

const optionList = {
    cpus: '--cpus',
}

const getOsInfo = (option) => {
    const cpus = os.cpus();

    if (option.match(optionList.cpus)) {
        const message = `Total: ${cpus.length} \n ${cpus.reduce((acc, cpu) => acc + `Name: ${cpu.model}\nClock rate: ${cpu.speed}GHz\n\n`, '')}`
        console.log(message)
    }
}

export { getOsInfo }
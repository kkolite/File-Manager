const { stdout } = process;

const changeDirectory = (src) => {
    try {
        process.chdir(`${src}`);
    } catch(e) {
        stdout.write(`${src}`);
    }
}

const up = () => {
    process.chdir('../');
}

export { changeDirectory, up };
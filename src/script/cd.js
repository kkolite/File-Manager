const { stdout } = process;

const changeDirectory = (src) => {
    try {
        process.chdir(`${src}`);
    } catch(e) {
        stdout.write(`Error, no ${src}, ${e}`);
    }
}

const up = () => {
    process.chdir('../');
}

export { changeDirectory, up };
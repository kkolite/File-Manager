const { stdout } = process;

const changeDirectory = async (src) => {
    /*try {
       await process.chdir(src);
    } catch(e) {
        stdout.write(`Error, no ${src}, ${e}`);
    }*/
}

const up = () => {
    //process.chdir('../');
}

export { changeDirectory, up };
const {stdout, stdin, argv} = process;

const regex = /--username.+/g

const handleStdin = (data) => {
    const text = data.toString();
    if (data.toString().match('.exit')) process.exit();
    stdout.write(text);
}

const handleExit = () => stdout.write(`Thank you for using File Manager, ${username}, goodbye!`);

const startApp = () => {
    let username;

    argv.forEach((el, i) => {
        if (!el.match(regex)) return;

        username = el.split('=')[1];

        stdout.write(`Welcome to the File Manager, ${username}!`);
    })

    stdin.on('data', handleStdin);

    process.on('exit', handleExit);
    process.on('SIGINT', () => process.exit());
}

startApp();
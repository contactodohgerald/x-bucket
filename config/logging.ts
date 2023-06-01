import chalk from "chalk";

class Logging {

    log: any = (args: any) => this.info(args);

    info: any = (args: any) => console.log(chalk.blue(`[${new Date().toLocaleString()}] [INFO]`), typeof args === "string" ? chalk.blueBright(args) :args);

    warn: any = (args: any) => console.log(chalk.yellow(`[${new Date().toLocaleString()}] [WARNING]`), typeof args === "string" ? chalk.yellowBright(args) :args);

    error: any = (args: any) => console.log(chalk.red(`[${new Date().toLocaleString()}] [ERROR]`), typeof args === "string" ? chalk.redBright(args) :args);
    
}

const logger = new Logging()

export default logger


import chalk from 'chalk';

export const printError = (error) => {
  console.log(chalk.bgRed.black(` ERROR `), error);
};

export const printSuccess = (message) => {
  console.log(chalk.bgGreen.black(` SUCCESS `), message);
};

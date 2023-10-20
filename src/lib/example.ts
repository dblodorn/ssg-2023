import chalk from 'chalk';

export const example = () => {
  console.log(chalk.black.bgGreen("SSG 2023!"))

  for (var i = 0; i < 10; i++) {
    console.log(chalk.blue.bgRedBright(`🤪 Generating funny HTML pages like it's 201${i - 0}`))
  }
}
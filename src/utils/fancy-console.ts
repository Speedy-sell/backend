const consoleColorCode = {
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  reset: '\u001b[0m',
  red: '\x1b[31m',
};
const noSpace = '%s\x1b[0m';

export const fancyLog = (blueText, cyanText) => {
  // tslint:disable-next-line: no-console
  console.log(
    consoleColorCode.blue + noSpace,
    blueText,
    consoleColorCode.cyan,
    cyanText,
    consoleColorCode.reset,
  );
};

export const fancyWarn = (blueText, cyanText) => {
  // tslint:disable-next-line: no-console
  console.log(
    consoleColorCode.red + noSpace,
    blueText,
    consoleColorCode.cyan,
    cyanText,
    consoleColorCode.reset,
  );
};

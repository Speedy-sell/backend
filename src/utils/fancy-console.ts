// tslint:disable: no-console

const consoleColorCode = {
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
  BgRed: '\x1b[41m',
  reset: '\u001b[0m',
};
const noSpace = '%s\x1b[0m';

const info = (blueText, cyanText) => {
  console.log(
    consoleColorCode.blue + noSpace,
    blueText,
    consoleColorCode.cyan,
    cyanText,
    consoleColorCode.reset,
  );
};

const error = (blueText, cyanText) => {
  console.log(
    consoleColorCode.BgRed + noSpace,
    blueText,
    consoleColorCode.red,
    cyanText,
    consoleColorCode.reset,
  );
};

export const customLog = {
  info,
  error,
};

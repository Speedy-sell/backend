const consoleColorCode = {
  cyan: '\x1b[36m',
  blue: '\x1b[34m%s\x1b[0m',
  reset: '\u001b[0m',
};

export const fancyLog = (blueText, cyanText) => {
  // tslint:disable-next-line: no-console
  console.log(
    consoleColorCode.blue,
    blueText,
    consoleColorCode.cyan,
    cyanText,
    consoleColorCode.reset,
  );
};

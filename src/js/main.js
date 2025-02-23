import Calculator from './Calculator.js';

const displayElement = document.getElementById('display');
const buttons = document.querySelector('.buttons');
const calc = new Calculator(displayElement);

const keyMap = {
  operators: { '+': 'sum', '-': 'sub', '*': 'mult', x: 'mult', '/': 'div' },
  commands: {
    '=': 'equals',
    enter: 'equals',
    backspace: 'bksp',
    escape: 'clear',
    c: 'clear',
  },
  decimals: { '.': 'dec', ',': 'dec' },
};

buttons.addEventListener('click', (e) => {
  const button = e.target.closest('[data-key]');
  if (!button) return;
  handleInput(button.dataset.key);
});

document.addEventListener('keydown', (e) => {
  handleInput(e.key.toLowerCase());
});

const handleInput = (key) => {
  let action = [];

  if (/^\d$/.test(key)) {
    action = ['number'];
  } else {
    for (let type in keyMap) {
      if (key in keyMap[type]) {
        action = [type, keyMap[type][key]];
      }
    }
  }

  if (!action) return;

  const handler =
    action[0] === 'commands'
      ? calc.handlers.commands[action[1]]
      : calc.handlers[action[0]];

  handler?.(key, action[1]);
};

const displayElement = document.getElementById('display');
const buttons = document.querySelector('.buttons');

const keyBinds = {
  '+': 'sum',
  '-': 'sub',
  x: 'mult',
  '*': 'mult',
  '/': 'div',
  c: 'clear',
  backspace: 'bksp',
  escape: 'clear',
};

const mapKeys = (key) => {
  const normalizedKey = key.toLowerCase();
  return keyBinds[normalizedKey]
    ? [normalizedKey, keyBinds[normalizedKey]]
    : null;
};

buttons.addEventListener('click', (e) => {
  const button = e.target.closest('[data-key]');
  if (!button) return;
  handleInput(button.dataset.key);
});

document.addEventListener('keydown', (e) => {
  const keyMap = {
    Enter: '=',
    Backspace: 'backspace',
    Delete: 'c',
    Escape: 'c',
    '*': 'x',
    '.': '.',
  };

  const key = keyMap[e.key] || e.key;
  if (!isNaN(key) || key in keyBinds || key === '=' || key === '.') {
    e.preventDefault();
    handleInput(key);
  }
});

const handleInput = (key) => {
  if (!key) return;

  if (key === '=') {
    if (Calc.term1 && Calc.operator && Calc.term2) {
      Calc.evaluate();
    }
    Calc.refresh();
    return;
  }

  if (!isNaN(key) || key === '.') {
    const currentTerm = Calc.operator ? 'term2' : 'term1';
    const currentValue = Calc[currentTerm];

    if (key === '.') {
      if (currentValue.includes('.')) return;
      Calc[currentTerm] = currentValue === '' ? '0.' : currentValue + '.';
    } else {
      Calc[currentTerm] += key;
    }
  } else if (mapKeys(key)) {
    const [_, operation] = mapKeys(key);
    Calc[operation](key);
  }

  Calc.refresh();
};

const Calc = {
  display: displayElement,
  term1: '',
  term2: '',
  operator: '',

  append(result) {
    this.term1 = result.toString();
    this.term2 = '';
    this.operator = '';
  },

  evaluate() {
    if (!this.term1 || !this.operator || !this.term2) return;

    const num1 = parseFloat(this.term1);
    const num2 = parseFloat(this.term2);
    let result;

    switch (this.operator) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case 'x':
        result = num1 * num2;
        break;
      case '/':
        result = num2 === 0 ? NaN : num1 / num2;
        break;
      default:
        return;
    }

    if (isNaN(result)) {
      this.clear();
      this.displayError();
      return;
    }

    this.append(result.toFixed(2).replace(/\.?0+$/, ''));
  },

  setOperator(key) {
    if (this.term1 || this.term2) {
      this.operator = key;
    }
  },

  clear() {
    this.term1 = '';
    this.term2 = '';
    this.operator = '';
  },

  bksp() {
    if (this.term2) {
      this.term2 = this.term2.slice(0, -1);
    } else if (this.operator) {
      this.operator = '';
    } else if (this.term1) {
      this.term1 = this.term1.slice(0, -1);
    }
  },

  displayError() {
    this.display.textContent = 'Erro';
    setTimeout(() => this.refresh(), 1000);
  },

  refresh() {
    let displayText;

    if (this.operator) {
      displayText = `${this.term1} ${this.operator} ${this.term2}`.trim();
    } else {
      displayText = this.term1 || '0';
    }

    this.display.textContent = displayText;
  },

  sum(key) {
    this.evaluate();
    this.setOperator(key);
  },
  sub(key) {
    this.evaluate();
    this.setOperator(key);
  },
  mult(key) {
    this.evaluate();
    this.setOperator(key);
  },
  div(key) {
    this.evaluate();
    this.setOperator(key);
  },
};

export default class Calculator {
  constructor(display) {
    this.display = display;
    this.term1 = '';
    this.term2 = '';
    this.operator = {
      symbol: '',
      operation: '',
    };

    this.handlers = {
      number: (key) => this.handleNumber(key),
      operators: (symbol, op) => this.setOperator(symbol, op),
      decimals: () => this.handleDecimal(),
      commands: {
        equals: () => this.evaluate(),
        bksp: () => this.bksp(),
        clear: () => this.clear(),
      },
    };

    this.operations = {
      sum: (a, b) => a + b,
      sub: (a, b) => a - b,
      mult: (a, b) => a * b,
      div: (a, b) => (b === 0 ? NaN : a / b),
    };
  }

  handleNumber(key) {
    const currentTerm = this.operator.symbol ? 'term2' : 'term1';
    this[currentTerm] += key;
    this.refresh();
  }

  setOperator(symbol, operation) {
    if (this.term1 && this.term2) this.evaluate();
    if (this.term1) {
      this.operator = { symbol, operation };
      this.refresh();
    }
  }

  handleDecimal() {
    const currentTerm = this.operator.symbol ? 'term2' : 'term1';
    const currentValue = this[currentTerm];

    if (!currentValue.includes('.')) {
      this[currentTerm] = currentValue === '' ? '0.' : currentValue + '.';
      this.refresh();
    }
  }

  evaluate() {
    if (!this.term1 || !this.operator.operation || !this.term2) return;

    const num1 = parseFloat(this.term1);
    const num2 = parseFloat(this.term2);
    const operation = this.operations[this.operator.operation];

    if (!operation) return;

    const result = operation(num1, num2);

    if (isNaN(result)) {
      this.clear();
      this.display.classList.add('error');
      this.display.textContent = 'Erro: divisão por zero';
      setTimeout(() => {
        this.display.classList.remove('error');
        this.refresh();
      }, 2000);
      return;
    }

    this.setResult(this.formatResult(result));
  }

  setResult(result) {
    this.term1 = result.toString();
    this.term2 = '';
    this.operator = { symbol: '', operation: '' };
    this.refresh();
  }

  formatResult(num) {
    return num % 1 === 0
      ? num.toString()
      : num.toFixed(2).replace(/\.?0+$/, '');
  }

  bksp() {
    if (this.term2) {
      this.term2 = this.term2.slice(0, -1);
    } else if (this.operator.symbol) {
      this.operator = { symbol: '', operation: '' };
    } else if (this.term1) {
      this.term1 = this.term1.slice(0, -1);
    }
    this.refresh();
  }

  clear() {
    this.term1 = '';
    this.term2 = '';
    this.operator = { symbol: '', operation: '' };
    this.refresh();
  }

  refresh() {
    const expr = [];
    if (this.term1) expr.push(this.term1);
    if (this.operator.symbol) expr.push(this.operator.symbol);
    if (this.term2) expr.push(this.term2);
    this.display.textContent = expr.join(' ') || '0';
  }
}


class Operation {
  calculate(num1, num2) {}
}

class Addition extends Operation {
  calculate(num1, num2) {
    return num1 + num2;
  }
}

class Subtraction extends Operation {
  calculate(num1, num2) {
    return num1 - num2;
  }
}

class Multiplication extends Operation {
  calculate(num1, num2) {
    return num1 * num2;
  }
}

class Division extends Operation {
  calculate(num1, num2) {
    if (num2 === 0) {
      throw new Error('Cannot divide by zero');
    }
    return num1 / num2;
  }
}

class CalculatorFactory {
  static createCalculator(operation) {
    return new Calculator(operation);
  }
}

class Calculator {
  constructor(operation) {
    this.operation = operation;
  }

  calculate(num1, num2) {
    return this.operation.calculate(num1, num2);
  }
}


// Operation interface
class Operation {
  calculate(num1, num2) {}
}

// Addition operation
class Addition extends Operation {
  calculate(num1, num2) {
    return num1 + num2;
  }
}

// Subtraction operation
class Subtraction extends Operation {
  calculate(num1, num2) {
    return num1 - num2;
  }
}

// Multiplication operation
class Multiplication extends Operation {
  calculate(num1, num2) {
    return num1 * num2;
  }
}

// Division operation
class Division extends Operation {
  calculate(num1, num2) {
    if (num2 === 0) {
      throw new Error('Cannot divide by zero');
    }
    return num1 / num2;
  }
}

// CalculatorFactory creates calculator objects with the specified operation
class CalculatorFactory {
  static createCalculator(operation) {
    return new Calculator(operation);
  }
}

// Calculator performs arithmetic operations using the specified operation
class Calculator {
  constructor(operation) {
    this.operation = operation;
  }

  calculate(num1, num2) {
    return this.operation.calculate(num1, num2);
  }
}

// have to add user connection

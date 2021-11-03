const calculator = (number1, number2) => {
  const summa = (number1, number2) => number1 + number2;
  const rest = (number1, number2) => number1 - number2;
  const multiplication = (number1, number2) => number1 * number2;
  const division = (number1, number2) => number1 / number2;
  return [
    summa(number1, number2),
    rest(number1, number2),
    multiplication(number1, number2),
    division(number1, number2),
  ];
};
module.exports = calculator;

'use strict';

//f isNumber
const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

//Доходы
let money;

//f Start
let start = function () {
  do {
    money = prompt('“Ваш месячный доход?”');
  }
  while (!isNumber(money));
};
start();

/*Функции getExpensesMonth,
 * getAccumulatedMonth,
 * getTargetMonth,
 * getStatusIncome
 *-сделать методами объекта AppData**/

//object appData
let appData = {
  budget: +money,
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 150000,
  period: 12,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  //
  asking: function () {

    let addExpenses = prompt('“Перечислите возможные статьи расходов через запятую”', 'Подарки родственникам, путешествия, оплата за курсы.');
    appData.addExpenses = addExpenses.toLowerCase().split(', ');
    appData.deposit = confirm('“Есть ли у вас депозит в банке?”');

    /*
    7) Перенести цикл из метода getExpensesMonth в метод asking, и переписать цикл таким образом чтобы результат записывался в объект  appData.expenses
в формате:
expenses:
    “ответ на первый вопрос” : “ответ на второй вопрос”,
    “ответ на первый вопрос” : “ответ на второй вопрос”
     */

    for (let i = 0; i < 2; i++) {
      let expensesResponse;//Переменная для ответа-суммы
      let expenseName = prompt('“Введите обязательную статью расходов?”');//Переменная с ответом- текстом
      do {
        expensesResponse = prompt('“Во сколько это обойдется?”');
      }
      while (!isNumber(expensesResponse));
      appData.expenses[expenseName] = +expensesResponse;
    }
  },

  /*
  8) Переписать метод getExpensesMonth: с помощью цикла считаем сумму всех обязательных расходов и сохраняем результат в свойство expensesMonth нашего объекта
для того, чтобы посчитать сумму используйте цикл for in
   */
  getExpensesMonth: function () {
    let sum = 0;

    for (let key in appData.expenses) {
      sum += appData.expenses[key];
    }
    appData.expensesMonth = sum;
  },

  /*
  9) getAccumulatedMonth переименовать в getBudget. Этот метод будет высчитывать значения свойств budgetMonth и budgetDay, чтобы вычислить значения используем только свойства объекта (никаких внешних переменных)
   */
  getBudget: function () {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },

  getTargetMonth: function () {

    let achievedTarget = Math.ceil(appData.mission / appData.budgetMonth);

    if (achievedTarget < 0) {
      return console.log('“Цель не будет достигнута”');
    } else {
      return console.log('“Цель будет достигнута за ', achievedTarget, ' месяца/цев.”');
    }
  },

  getStatusIncome: function () {

    if (appData.budgetDay >= 1200) {
      return console.log('“У вас высокий уровень дохода”');
    } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
      return console.log('“У вас средний уровень дохода”');
    } else if (appData.budgetDay >= 0 && appData.budgetDay < 600) {
      return console.log('“К сожалению у вас уровень дохода ниже среднего”');
    } else if (appData.budgetDay < 0) {
      return console.log('“Что то пошло не так”');
    }
  }
};



//Сразу после объекта выполните вызов appData.asking();
appData.asking();

appData.getExpensesMonth();

appData.getBudget();


//('*** ИТОГО: ***');
console.log('*** Расходы за месяц: ***');
console.log(appData.expensesMonth);

console.log('*** За какой период будет достигнута цель (в месяцах): ***');
appData.getTargetMonth();

console.log('*** Уровень дохода: ***');
appData.getStatusIncome();







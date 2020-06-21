'use strict';

//f isNumber
const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

//Доходы
// let money, income = 'Основная работа, фриланс.';DELETE
let money;

//f Start
let start = function () {
  do {
    money = prompt('“Ваш месячный доход?”');
  }
  while (!isNumber(money));
  console.log('***** полученный тип данных money *****');
  console.log('стр 19- значение', money);
  console.log('стр 19- тип данных', typeof money);
  console.log('*******************');
};
start();

/**Функции getExpensesMonth, ***
 * getAccumulatedMonth, ***
 * getTargetMonth,***
 *  getStatusIncome
 *  - сделать методами объекта AppData**/
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
    console.log('***** полученный тип данных appData.budget/money *****');
    console.log('str 45 budget status; ', appData.budget, typeof appData.budget);
    let addExpenses = prompt('“Перечислите возможные статьи расходов через запятую”', 'Подарки родственникам, путешествия, оплата за курсы.');
    appData.addExpenses = addExpenses.toLowerCase().split(', ');
    appData.deposit = confirm('“Есть ли у вас депозит в банке?”');
    /*
    7) Перенести цикл из метода getExpensesMonth в метод asking, и переписать цикл таким образом чтобы результат записывался в объект  appData.expenses
в формате:
expenses: {
    “ответ на первый вопрос” : “ответ на второй вопрос”,
    “ответ на первый вопрос” : “ответ на второй вопрос”
}
     */

    for (let i = 0; i < 2; i++) {
      let expensesResponse;//Переменная для ответа-суммы
      let expenseName = prompt('“Введите обязательную статью расходов?”');//Переменная с ответом- текстом
      do {
        expensesResponse = prompt('“Во сколько это обойдется?”');
      }
      while (!isNumber(expensesResponse));
      appData.expenses[expenseName] = +expensesResponse;
      console.log('***** appData.expenses - цикл с вопросами и ответами по обязательным расходам *****');
      console.log(appData.expenses);
    }
  },

  /*
  8) Переписать метод getExpensesMonth: с помощью цикла считаем сумму всех обязательных расходов и сохраняем результат в свойство expensesMonth нашего объекта
для того, чтобы посчитать сумму используйте цикл for in
   */
  getExpensesMonth: function () {
    let sum = 0;

    for (let key in appData.expenses) {
      console.log('***** getexpensesMonth + expensesMonth - подсчет суммы всех обязательных расходов *****');
      console.log('ключ appData.expenses', key);
      console.log('значение appData.expenses', appData.expenses[key]);//значение
      sum += appData.expenses[key];
    }
    appData.expensesMonth = sum;
    console.log('str 86 expensesMonth', appData.expensesMonth);
  },
  /*
  9) getAccumulatedMonth переименовать в getBudget. Этот метод будет высчитывать значения свойств budgetMonth и budgetDay, чтобы вычислить значения используем только свойства объекта (никаких внешних переменных)
  Встречается только на строке 83 и 117, zatem vyzyvaem na 116.
  stroka 89- menjaem expensesTotalMonth na appData.expensesMonth, a income na 
  120 i 121- disabled.

   */
  getBudget: function () {

    appData.budgetMonth = appData.budget - appData.expensesMonth;
    console.log('*******************');
    console.log('stroka 95 appData[budget]', appData.budget);
    console.log('appData.expensesMonth', appData.expensesMonth);
    console.log('stroka 96 appData[budgetMonth]', appData.budgetMonth);
    console.log('*******************');

    // console.log(appData.budgetMonth / 30);

    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    console.log('***** appData.budgetDay *****');
    console.log('stroka 106 appData.budgetDay', appData.budgetDay);
    console.log('*******************');
    // return appData.budgetMonth;
    // return (income - appData.expensesMonth);
    // return (income - expensesTotalMonth);
  },
  //
  getTargetMonth: function () {
    let achievedTarget = Math.ceil(appData.mission / appData.budgetMonth);
    // let achievedTarget = Math.ceil(appData.mission / accumulatedMonth);
    //appData.budgetMonth вместо accumulatedMonth

    if (achievedTarget < 0) {
      return console.log('“Цель не будет достигнута”');
    } else {
      return console.log('“Цель будет достигнута за ', achievedTarget, ' месяца/цев.”');
    }
  },
  //13.45- menjaem budgetDay na appData.budgetDay
  //   getStatusIncome: function () {

  //     let statusIncomeResult = '';

  //     if (appData.budgetDay >= 1200) {
  //       statusIncomeResult = '“У вас высокий уровень дохода”';
  //       return statusIncomeResult;

  //     } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
  //       statusIncomeResult = '“У вас средний уровень дохода”';
  //       return statusIncomeResult;

  //     } else if (appData.budgetDay >= 0 && appData.budgetDay < 600) {
  //       statusIncomeResult = '“К сожалению у вас уровень дохода ниже среднего”';
  //       return statusIncomeResult;

  //     } else if (appData.budgetDay < 0) {
  //       statusIncomeResult = '“Что то пошло не так”';
  //       return statusIncomeResult;
  //     }
  //   }
  // };

  /**chernovoj variant */

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



//6) Сразу после объекта выполните вызов appData.asking();
appData.asking();

// console.log('*** Расходы за месяц: ***');
appData.getExpensesMonth();
// console.log('*** Расходы за месяц: ***' + '\n' + appData.expensesMonth);

appData.getBudget();

console.log('*** ИТОГО: ***');

console.log('*** Расходы за месяц: ***');
console.log(appData.expensesMonth);

console.log('*** За какой период будет достигнута цель (в месяцах): ***');
appData.getTargetMonth();

console.log('*** Уровень дохода: ***');
appData.getStatusIncome();


// console.log(appData.expensesMonth);
// console.log('*** За какой период будет достигнута цель (в месяцах): ***');
// console.log('*** Уровень дохода: ***' + '\n' + appData.getStatusIncome);
// console.log(;




















/*
12) В консоль вывести:

    — Расходы за месяц
    — За какой период будет достигнута цель (в месяцах)
    — Уровень дохода

Все остальное почистить в программе у нас всего две переменных money и appData
И две функции start и возможно isNumber
 */

// let expensesTotalMonth = appData.getExpensesMonth();//0?
// console.log('expensesTotalMonth: ', expensesTotalMonth);//Оставить

//от урока 4. Объявить переменную accumulatedMonth и присвоить ей результат вызова функции getAccumulatedMonth 
// let accumulatedMonth = appData.getBudget();





// let budgetDay = appData.budgetMonth / 30;
// // let budgetDay = accumulatedMonth / 30; вместо аккМесяц- appData.budgetMonth
// console.log('budgetDay: ', Math.floor(budgetDay));//ConsoleLog- Оставить





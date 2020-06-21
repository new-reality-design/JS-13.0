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
    money = +prompt('“Ваш месячный доход?”');
  }
  while (!isNumber(money));
};
start();

/**Функции getExpensesMonth, ***
 * getAccumulatedMonth, ***
 * getTargetMonth,***
 *  getStatusIncome
 *  - сделать методами объекта AppData**/
//object appData
let appData = {
  budget: money,
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
      console.log('appData.expenses: ', appData.expenses);////////
    }
  },

  /*
  8) Переписать метод getExpensesMonth: с помощью цикла считаем сумму всех обязательных расходов и сохраняем результат в свойство expensesMonth нашего объекта
для того, чтобы посчитать сумму используйте цикл for in
   */
  getExpensesMonth: function () {
    let sum = 0;
    console.log('stroka 71 appData[budget]', appData['budget']);
    for (let key in appData.expenses) {
      console.log(key);
      console.log(appData.expenses[key]);//значение
      sum += appData.expenses[key];
    }
    return (appData.expensesMonth = sum);
  },
  /*
  9) getAccumulatedMonth переименовать в getBudget. Этот метод будет высчитывать значения свойств budgetMonth и budgetDay, чтобы вычислить значения используем только свойства объекта (никаких внешних переменных)
   */
  getAccumulatedMonth: function (income) {
    return (income - expensesTotalMonth);
  },
  //
  getTargetMonth: function () {
    let achievedTarget = Math.ceil(appData.mission / accumulatedMonth);

    if (achievedTarget < 0) {
      return console.log('“Цель не будет достигнута”');
    } else {
      return console.log('“Цель будет достигнута за ', achievedTarget, ' месяца/цев.”');
    }
  },
  //
  getStatusIncome: function () {
    if (budgetDay >= 1200) {
      return ('“У вас высокий уровень дохода”');
    } else if (budgetDay >= 600 && budgetDay < 1200) {
      return ('“У вас средний уровень дохода”');
    } else if (budgetDay >= 0 && budgetDay < 600) {
      return ('“К сожалению у вас уровень дохода ниже среднего”');
    } else if (budgetDay < 0) {
      return ('“Что то пошло не так”');
    }
  }
};

//6) Сразу после объекта выполните вызов appData.asking();
appData.asking();

let expensesTotalMonth = appData.getExpensesMonth();//0?
console.log('expensesTotalMonth: ', expensesTotalMonth);//Оставить

//от урока 4. Объявить переменную accumulatedMonth и присвоить ей результат вызова функции getAccumulatedMonth 
let accumulatedMonth = appData.getAccumulatedMonth(money);


appData.getTargetMonth();


let budgetDay = accumulatedMonth / 30;
console.log('budgetDay: ', Math.floor(budgetDay));//ConsoleLog- Оставить

console.log('Уровень дохода: ', appData.getStatusIncome());

//Цель и сроки. DELETE
// let mission = 150000;
// let period = 12;



//Расходы.DELETE
// let addExpenses = prompt('“Перечислите возможные статьи расходов через запятую”', 'Подарки родственникам, путешествия, оплата за курсы.');


//Депозит.DELETE
// let depositQuestion = confirm('“Есть ли у вас депозит в банке?”'),
//   deposit = depositQuestion;
// let deposit = confirm('“Есть ли у вас депозит в банке?”');



//f getExpensesMonth


/*

const getExpensesMonth = function () {
  let sum = 0;
  let expenses = [];//????

  for (let i = 0; i < 2; i++) {
    let expensesResponse;


    expenses[i] = prompt('“Введите обязательную статью расходов?”');

    do {
      expensesResponse = prompt('“Во сколько это обойдется?”');
    }
    while (!isNumber(expensesResponse));

    sum += +expensesResponse;
  }
  return sum;
};

 */





//f getAccumulatedMonth 
//от урока 4. Объявить функцию getAccumulatedMonth. 
//Функция возвращает Накопления за месяц (Доходы минус расходы)
// const getAccumulatedMonth = function (income) {
//   return (income - expensesTotal);
// };




// 3) Если getTargetMonth возвращает нам отрицательное значение, то вместо “Цель будет достигнута” 
// - необходимо выводить “Цель не будет достигнута”

//f getTargetMonth
// const getTargetMonth = function () {
//   let achievedTarget = Math.ceil(appData.mission / accumulatedMonth);

//   if (achievedTarget < 0) {
//     return console.log('“Цель не будет достигнута”');
//   } else {
//     return console.log('“Цель будет достигнута за ', achievedTarget, ' месяца/цев.”');
//   }
// };
// appData.getTargetMonth();


// let budgetDay = accumulatedMonth / 30;
// console.log('budgetDay: ', Math.floor(budgetDay));//ConsoleLog- Оставить


//f getStatusIncome
// const getStatusIncome = function () {
//   if (budgetDay >= 1200) {
//     return ('“У вас высокий уровень дохода”');
//   } else if (budgetDay >= 600 && budgetDay < 1200) {
//     return ('“У вас средний уровень дохода”');
//   } else if (budgetDay >= 0 && budgetDay < 600) {
//     return ('“К сожалению у вас уровень дохода ниже среднего”');
//   } else if (budgetDay < 0) {
//     return ('“Что то пошло не так”');
//   }
// };

// console.log(appData.getStatusIncome());
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
  },
  //
  getExpensesMonth: function () {
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
    console.log('expenses: ', expenses);////////
    return sum;
  },
  //
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

let expensesTotalMonth = appData.getExpensesMonth();
console.log('expensesTotalMonth: ', expensesTotalMonth);//Оставить

//от урока 4. Объявить переменную accumulatedMonth и присвоить ей результат вызова функции getAccumulatedMonth 
let accumulatedMonth = appData.getAccumulatedMonth(money);


appData.getTargetMonth();


let budgetDay = accumulatedMonth / 30;
console.log('budgetDay: ', Math.floor(budgetDay));//ConsoleLog- Оставить

console.log(appData.getStatusIncome());

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
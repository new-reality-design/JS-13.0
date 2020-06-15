'use strict';

/*
1) Переписать функцию start циклом do while **
2) Добавить проверку что введённые данные являются числом, 
которые мы получаем на вопрос 'Во сколько это обойдется?’ в функции  getExpensesMonth **
3) Если getTargetMonth возвращает нам отрицательное значение, то вместо “Цель будет достигнута” 
необходимо выводить “Цель не будет достигнута”
 */

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let mission = 150000;
let period = 12;

//Доходы
let money, income = 'Основная работа, фриланс.';


//Расходы
let addExpenses = prompt('“Перечислите возможные статьи расходов через запятую”', 'Подарки родственникам, путешествия, оплата за курсы.');


//Депозит
let depositQuestion = confirm('“Есть ли у вас депозит в банке?”'),
  deposit = depositQuestion;


//1) Переписать функцию start циклом do while
let start = function () {
  // money = prompt('“Ваш месячный доход?”');//+

  do {
    money = prompt('“Ваш месячный доход?”');
    // console.log('“Ваш месячный доход такойто?”');
  }
  while (!isNumber(money));

};

start();


/*
2) Добавить проверку что введённые данные являются числом, 
которые мы получаем на вопрос 'Во сколько это обойдется?’ в функции getExpensesMonth.
 */
let expenses = [];

//f getExpensesMonth
const getExpensesMonth = function () {
  let sum = 0;

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

let expensesAmount = getExpensesMonth();
console.log('expensesTotal/expensesAmount: ', expensesAmount);//Оставить


//f getAccumulatedMonth
const getAccumulatedMonth = function (income) {
  return (income - expensesAmount);
};

let accumulatedMonth = getAccumulatedMonth(money);

/*
3) Если getTargetMonth возвращает нам отрицательное значение, то вместо “Цель будет достигнута” 
необходимо выводить “Цель не будет достигнута”
*/

//f getTargetMonth
const getTargetMonth = function () {
  let achievedTarget = Math.ceil(mission / accumulatedMonth); showTypeOf
  // achievedTarget = Math.ceil(achievedTarget);

  if (achievedTarget < 0) {
    return console.log('“Цель не будет достигнута”');
  } else {
    return console.log('“Цель будет достигнута за ', achievedTarget, ' месяца/цев.”');
  }
};
getTargetMonth();
// getTargetMonth(mission, accumulatedMonth);

// console.log('Цель будет достигнута за ', getTargetMonth(mission, accumulatedMonth), ' месяцев.');//ConsoleLog- Оставить
// let achievedTargetResult = getTargetMonth(mission, accumulatedMonth);
// console.log('Cрок достижения цели в месяцах (результат вызова функции getTargetMonth): ', achievedTargetResult);//ConsoleLog- Оставить


let budgetDay = accumulatedMonth / 30;
console.log('budgetDay: ', Math.floor(budgetDay));//ConsoleLog- Оставить


console.log('AddExpenses: ', addExpenses.toLowerCase().split(', '));//ConsoleLog- Оставить


//f showTypeOf
const showTypeOf = function (data) {
  console.log('showTypeOf- ', data, ':', typeof (data));
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);


//f getStatusIncome
const getStatusIncome = function () {
  if (budgetDay >= 1200) {
    return ('“У вас высокий уровень дохода”');
  } else if (budgetDay >= 600 && budgetDay < 1200) {
    return ('“У вас средний уровень дохода”');
  } else if (budgetDay >= 0 && budgetDay < 600) {
    return ('“К сожалению у вас уровень дохода ниже среднего”');
  } else if (budgetDay < 0) {
    return ('“Что то пошло не так”');
  }
};

console.log(getStatusIncome());
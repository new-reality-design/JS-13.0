'use strict';

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let mission = 150000;
let period = 12;

//Доходы
// let monthlyIncomeQuestion = +prompt('“Ваш месячный доход?”', '33000'),
//   money = monthlyIncomeQuestion,
//   income = 'Основная работа, фриланс.';
let money, income = 'Основная работа, фриланс.';


//Расходы
let addExpenses = prompt('“Перечислите возможные статьи расходов через запятую”', 'Подарки родственникам, путешествия, оплата за курсы.');
// addExpenses = possibleExpensesQuestion;

// console.log('addExpenses: ', addExpenses);
//Депозит
let depositQuestion = confirm('“Есть ли у вас депозит в банке?”'),
  deposit = depositQuestion;


/*Запись 2-
  let start = function () {
  money = prompt('“Ваш месячный доход?”');//+

  while (isNaN(money) || money.trim() === '' || money === null) {
    money = prompt('“Ваш месячный доход?”');
  }
};

start();
 */

/*Запись 3-
 let start = function () {
 money = prompt('“Ваш месячный доход?”');//+

 while (isNaN(parseFloat(money))) {
   money = prompt('“Ваш месячный доход?”');
 }
};

start();
 */
let start = function () {
  money = prompt('“Ваш месячный доход?”');//+

  while (!isNumber(money)) {
    money = prompt('“Ваш месячный доход?”');
  }
};

start();


//Обязательные расходы
// let expenses1 = prompt('“Введите обязательную статью расходов?”', 'Счета и питание.'),
//   expenses1Amount = +prompt('“Во сколько это обойдется?”', '5000'),
//   expenses2 = prompt('“Какие ещё у вас есть расходы?”', 'Транспорт'),
//   expenses2Amount = +prompt('“Во сколько это обойдется?”', '5000');
//Условия урока 4-
//1) Объявить функцию getExpensesMonth. Функция возвращает сумму всех обязательных расходов за месяц.

/*Запись 1-
 let expenses1, expenses2;

const getExpensesMonth = function () {
  let sum = 0;

  for (let i = 0; i < 2; i++) {

    if (i === 0) {
      expenses1 = prompt('“Введите обязательную статью расходов?”', 'Счета и питание.');
      console.log('expenses1: ', expenses1);

    } else if (i === 1) {
      expenses2 = prompt('“Какие ещё у вас есть расходы?”', 'Транспорт');
      console.log('expenses2: ', expenses2);
    }
    sum += +prompt('“Во сколько это обойдется?”');
    console.log(sum);
  }
  console.log(sum);
  return sum;
};
 */

let expenses = [];

const getExpensesMonth = function () {
  let sum = 0;

  for (let i = 0; i < 2; i++) {
    expenses[i] = prompt('“Введите обязательную статью расходов?”', 'Счета. Транспорт.');
    sum += +prompt('“Во сколько это обойдется?”', '2500');
    console.log(sum);
  }
  console.log('Массив "статьи расходов": ', expenses);
  console.log(sum);
  return sum;
};

let expensesAmount = getExpensesMonth();
console.log('expensesTotal/expensesAmount: ', expensesAmount);//Оставить


// 2) Объявить функцию getAccumulatedMonth. Функция возвращает Накопления за месяц (Доходы минус расходы)
const getAccumulatedMonth = function (income) {
  return (income - expensesAmount);
};


// 3) Объявить переменную accumulatedMonth и присвоить ей результат вызова функции getAccumulatedMonth
let accumulatedMonth = getAccumulatedMonth(money);


//4) Объявить функцию getTargetMonth. Подсчитывает за какой период будет достигнута цель, зная результат месячного накопления (accumulatedMonth) и возвращает результат.
const getTargetMonth = function (mission, budget) {
  let achievedTarget = mission / budget;
  achievedTarget = Math.ceil(achievedTarget);
  return achievedTarget;
};
let achievedTargetResult = getTargetMonth(mission, accumulatedMonth);
console.log('Cрок достижения цели в месяцах (результат вызова функции getTargetMonth): ', achievedTargetResult);//Оставить


//6) budgetDay высчитываем исходя из значения месячного накопления (accumulatedMonth)
let budgetDay = accumulatedMonth / 30;
console.log('budgetDay: ', Math.floor(budgetDay));//Оставить


// 7) Почистить консоль логи и добавить недостающие, должны остаться:
//  - вызовы функции showTypeOf***
//  - вызов функции getStatusIncome***
//  - Расходы за месяц вызов getExpensesMonth***
//  - Вывод возможных расходов в виде массива (addExpenses)***
//  - Cрок достижения цели в месяцах (результат вызова функции getTargetMonth) ***
//  - Бюджет на день (budgetDay) ***


console.log('AddExpenses: ', addExpenses.toLowerCase().split(', '));//Оставить


//  - вызовы функции showTypeOf
const showTypeOf = function (data) {
  console.log('showTypeOf- ', data, ':', typeof (data));
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);


//  - вызов функции getStatusIncome
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
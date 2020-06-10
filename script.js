'use strict';


//Доходы
let monthlyIncomeQuestion = +prompt('“Ваш месячный доход?”', '33000'),
  money = monthlyIncomeQuestion,
  income = 'Основная работа, фриланс.';


//Расходы
let addExpenses = prompt('“Перечислите возможные статьи расходов через запятую”', 'Подарки родственникам, путешествия, оплата за курсы.');
// addExpenses = possibleExpensesQuestion;
// console.log('addExpenses: ', addExpenses);


//Депозит
let depositQuestion = confirm('“Есть ли у вас депозит в банке?”'),
  deposit = depositQuestion;


//Обязательные расходы
let expensesQuestion1 = prompt('“Введите обязательную статью расходов?”', 'Счета и питание.'),
  expensesAmount1 = +prompt('“Во сколько это обойдется?”', '5000'),
  expensesQuestion2 = prompt('“Какие ещё у вас есть расходы?”', 'Транспорт'),
  expensesAmount2 = +prompt('“Во сколько это обойдется?”', '5000');


let mission = 150000;
let period = 12;


//Условия урока 4-
//1) Объявить функцию getExpensesMonth. Функция возвращает сумму всех обязательных расходов за месяц.
const getExpensesMonth = function (amount1, amount2) {
  return amount1 + amount2;
};
let expensesTotal = getExpensesMonth(expensesAmount1, expensesAmount2);
console.log('expensesTotal: ', expensesTotal);//Оставить


// 2) Объявить функцию getAccumulatedMonth. Функция возвращает Накопления за месяц (Доходы минус расходы)
const getAccumulatedMonth = function (income) {
  return (income - expensesTotal);
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
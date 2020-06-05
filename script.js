'use strict';

let money = 25000;
let income = 'Основная работа, фриланс.';
let addExpenses = 'Счета за квартиру. Счета за телефон. Покупки.';
let deposit = false;
let mission = 150000;
let period = 12;
let budgetDay = money / 30;

console.log('Money: ', typeof money);
console.log('Income: ', typeof income);
console.log('Deposit: ', typeof deposit);

console.log('AddExpenses length: ', addExpenses.length);

console.log('Период равен: ', period, 'ти месяцам/месяцев. \nЦель - заработать ', mission, ' рублей.');

console.log('AddExpenses: ');
console.log(addExpenses.toLowerCase().split('. '));

console.log('Дневной бюджет: ', Math.round(budgetDay));


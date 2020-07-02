'use strict';

//Lesson 11 check 

//Урок 9- сложить в переменные нужные элементы-
//1 Кнопку "Рассчитать" через id
const calculate = document.getElementById('start');
console.log('calculate: ', calculate);

//2 Кнопки “+” (плюс) через Tag, каждую в своей переменной.
// const buttons = document.getElementsByTagName('button');
// console.log('buttons: ', buttons);
const incomeAdd = document.getElementsByTagName('button')[0];
console.log('incomeAdd: ', incomeAdd);
const expensesAdd = document.getElementsByTagName('button')[1];
console.log('expensesAdd: ', expensesAdd);

//3 Чекбокс по id через querySelector // #deposit-check
const depositCheck = document.querySelector('#deposit-check');

//4 Поля для ввода возможных доходов (additional_income-item) при помощи querySelectorAll
//class additional_income-item
const additionalIncomeItems = document.querySelectorAll('.additional_income-item');
console.log('additionalIncomeItems: ', additionalIncomeItems);

//5 Каждый элемент в правой части программы через класс, которые имеют в имени класса "-value", начиная с class="budget_day-value" и заканчивая class="target_month-value">

//All_Values:
//1 Доход за месяц**
const budgetMonthValue = document.querySelector('.budget_month-value');
console.log('budgetMonthValue: ', budgetMonthValue);
//2 Дневной бюджет**
const budgetDayValue = document.querySelector('.budget_day-value');
console.log('budgetDayValue: ', budgetDayValue);
//3 Расход за месяц**
const expensesMonthValue = document.querySelector('.expenses_month-value');
console.log('expensesMonthValue: ', expensesMonthValue);
//4 Возможные доходы**
const additionalIncomeValue = document.querySelector('.additional_income-value');
console.log('additionalIncomeValue: ', additionalIncomeValue);
//5 Возможные расходы**
const additionalExpensesValue = document.querySelector('.additional_expenses-value');
console.log('additionalExpensesValue: ', additionalExpensesValue);
//6 Накопления за период**
const incomePeriodValue = document.querySelector('.income_period-value');
console.log('incomePeriodValue: ', incomePeriodValue);
//7 Срок достижения цели в месяцах
const targetMonthValue = document.querySelector('.target_month-value');
console.log('targetMonthValue: ', targetMonthValue);


//6 Оставшиеся поля через querySelector каждый в отдельную переменную:
//поля ввода (input) с левой стороны и не забудьте про range.

//1 Месячный доход- сумма
const salaryAmount = document.querySelector('.salary-amount');
console.log('salaryAmount: ', salaryAmount);

//2 Дополнительный доход- наименование
const incomeTitle = document.querySelector('.income-title');
console.log('incomeTitle: ', incomeTitle);

//3 Дополнительный доход- сумма
const incomeAmount = document.querySelector('.income-amount');
console.log('incomeAmount: ', incomeAmount);

//4 Обязательные расходы- наименование
const expensesTitle = document.querySelector('.expenses-title');
console.log('expensesTitle: ', expensesTitle);

//5 Обязательные расходы- сумма
const expensesAmount = document.querySelector('.expenses-amount');
console.log('expensesAmount: ', expensesAmount);

//6 Возможные расходы - название
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
console.log('additionalExpensesItem: ', additionalExpensesItem);

//7 Цель- сумма
const targetAmount = document.querySelector('.target-amount');
console.log('targetAmount: ', targetAmount);

//8 Период расчета (бегунок)
const periodSelect = document.querySelector('.period-select');


//f isNumber
const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};


//******************************************************************************/

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

//обьект appData
let appData = {
  budget: +money,
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 150000,
  period: 3,
  budgetDay: 0,
  budgetMonth: 0,//Сколько зарабатываем за месяц- высчитан из getBudget
  expensesMonth: 0,
  percentDeposit: '',
  moneyDeposit: '',
  //

  /*
  1) Сделать проверку при получении данных:
   - наименование дополнительного источника заработка
   - сумма дополнительного заработка
   - ввод статьи обязательных расходов
   - годовой процент депозита
   - сумма депозита
   */
  asking: function () {

    if (confirm('Есть ли у вас дополнительный источник заработка?')) {

      let itemIncome;

      do {
        itemIncome = prompt('Какой именно?', 'Садоводство');
      } while (
        (itemIncome === '' || itemIncome === null || isNumber(itemIncome) || itemIncome.trim() === '' || isNumber(itemIncome.trim()))
      );

      let cashIncome;

      do {
        cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', '10000');//NUMBER?
      } while (
        !isNumber(cashIncome)
      );
      appData.income[itemIncome] = cashIncome;
    }

    /*
    2) Возможные расходы (addExpenses) вывести строкой в консоль каждое слово с большой буквы слова разделены запятой и пробелом
    Пример (Интернет, Такси, Коммунальные расходы)
    */

    let addExpenses = prompt('“Перечислите возможные статьи расходов через запятую”', 'Подарки, путешествия, кУРСы, массаж');
    appData.addExpenses = addExpenses.toLowerCase().split(', ');

    let addExpensesToStr = appData.addExpenses.map(item => {
      return item.substring(0, 1).toUpperCase() + item.slice(1);
    });

    // appData.addExpenses = addExpensesToStr;
    console.log('(addExpenses - ToString) вывести строкой в консоль: ', addExpensesToStr.join(', '));

    appData.deposit = confirm('“Есть ли у вас депозит в банке?”');


    for (let i = 0; i < 2; i++) {

      let expenseName;//Переменная для ответа-текста
      let expensesResponse;//Переменная для ответа-суммы

      do {
        expenseName = prompt('“Введите обязательную статью расходов?”');
      } while (
        expenseName === '' || expenseName === null || isNumber(expenseName) || expenseName.trim() === '' || isNumber(expenseName.trim())
      );


      do {
        expensesResponse = prompt('“Во сколько это обойдется?”');
      }
      while (!isNumber(expensesResponse));
      appData.expenses[expenseName] = +expensesResponse;
    }
  },

  getExpensesMonth: function () {
    let sum = 0;

    for (let key in appData.expenses) {
      sum += appData.expenses[key];
    }
    appData.expensesMonth = sum;
  },

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
  },

  getInfoDeposit: function () {
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt('Какой годовой процент?', '10');
      } while (!isNumber(appData.percentDeposit));

      do {
        appData.moneyDeposit = prompt('Какая сумма заложена?', '10000');
      } while (!isNumber(appData.moneyDeposit));
    }
  },

  calcSavedMoney: function () {//метод для умноженая budgetMonth на period
    return appData.budgetMonth * appData.period;
  }
};


appData.asking();

appData.getExpensesMonth();

appData.getBudget();

appData.getInfoDeposit();


console.log('*** Расходы за месяц: ***');
console.log(appData.expensesMonth);

console.log('*** За какой период будет достигнута цель (в месяцах): ***');
appData.getTargetMonth();

console.log('*** Уровень дохода: ***');
appData.getStatusIncome();


console.log('Наша программа включает в себя данные: ');
for (let key in appData) {
  console.log('Ключ: ', key, ' и его Значение: ', appData[key]);
}




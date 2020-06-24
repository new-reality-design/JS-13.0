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

    appData.addExpenses = addExpensesToStr;
    console.log('(addExpenses) вывести строкой в консоль: ', appData.addExpenses.join(', '));

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




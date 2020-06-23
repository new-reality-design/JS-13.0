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
  period: 3,
  budgetDay: 0,
  budgetMonth: 0,//Сколько зарабатываем за месяц- высчитан из getBudget
  expensesMonth: 0,
  percentDeposit: '',
  moneyDeposit: '',
  //
  asking: function () {

    //Урок 8- вопрос про дополнительный заработок
    if (confirm('Есть ли у вас дополнительный источник заработка?')) {

      let itemIncome;

      do {
        itemIncome = prompt('Какой именно?', 'Садоводство');
        //Продолжаем спрашивать, пока возвращается полноценное число ил нулл или пустая строка.
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

    /**
     * 2) Возможные расходы (addExpenses) вывести строкой в консоль каждое слово с большой буквы слова разделены запятой и пробелом
loop-splice-join

Пример (Интернет, Такси, Коммунальные расходы)
     */

    let addExpenses = prompt('“Перечислите возможные статьи расходов через запятую”', 'Подарки, путешествия, кУРСы, массаж');
    appData.addExpenses = addExpenses.toLowerCase().split(', ');
    console.log('str 75- appData.addExpenses', appData.addExpenses);

    let addExpensesToStr = appData.addExpenses.map(item => {
      return item.substring(0, 1).toUpperCase() + item.slice(1);
    });
    console.log('str 79- addExpensesToStr: ', addExpensesToStr.join(', '));

    appData.addExpenses = addExpensesToStr;
    console.log('str 83: appData.addExpenses = addExpensesToStr: ', appData.addExpenses = addExpensesToStr);



    // appData.addExpenses.forEach(item => {
    //   let result = item.substring(0, 1).toUpperCase() + item.slice(1);
    //   console.log('str 85', result.join(', '));
    // });


    //let separateWords = appData.addExpenses.map(function(item) {
    //   return ' ' + item[0].toUpperCase() + item.slice(1).toLowerCase();
    // });
    appData.deposit = confirm('“Есть ли у вас депозит в банке?”');


    for (let i = 0; i < 2; i++) {
      let expensesResponse;//Переменная для ответа-суммы// cashExpenses у Максима


      let expenseName;//Переменная с ответом- текстом, ItemExpenses у Максима 
      // let expenseName = prompt('“Введите обязательную статью расходов?”');//Переменная с ответом- текстом, ItemExpenses у Максима 
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
  },

  //Urok-8
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




//Сразу после объекта выполните вызов appData.asking();
appData.asking();

appData.getExpensesMonth();

appData.getBudget();

appData.getInfoDeposit();

//('*** ИТОГО: ***');
console.log('*** Расходы за месяц: ***');
console.log(appData.expensesMonth);

console.log('*** За какой период будет достигнута цель (в месяцах): ***');
appData.getTargetMonth();

console.log('*** Уровень дохода: ***');
appData.getStatusIncome();



console.log('ПРОВЕРКА calcSavedMoney-', appData.calcSavedMoney());
console.log('Годовой %-', appData.percentDeposit);
console.log('Сумма залога-', appData.moneyDeposit);

//13) Используя цикл for in для объекта (appData), вывести в консоль сообщение "Наша программа включает в себя данные: " (вывести все свойства и значения)

console.log('Наша программа включает в себя данные: ');
for (let key in appData) {
  console.log('Ключ: ', key, ' и его Значение: ', appData[key]);
}


/*
1) Сделать проверку при получении данных:

   - наименование дополнительного источника заработка
   - сумма дополнительного заработка
   - ввод статьи обязательных расходов
   - годовой процент депозита
   - сумма депозита



Что значит проверка данных: где должен быть текст там только текст, где цифры только цифры!
Если проверку не прошло, то переспрашивать!

2) Возможные расходы (addExpenses) вывести строкой в консоль каждое слово с большой буквы слова разделены запятой и пробелом
loop-splice-join

Пример (Интернет, Такси, Коммунальные расходы)

 */


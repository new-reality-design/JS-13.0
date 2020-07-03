'use strict';

let start = document.getElementById('start');
start.setAttribute('disabled', 'disabled');

//Поле "Месячный доход"- числа
let salaryAmount = document.querySelector('.salary-amount');

const btnPlus = document.getElementsByTagName('button'),
  //Блок полей "Дополнительный доход"- название и сумма
  incomePlus = btnPlus[0],
  //Блок полей "Обязательные расходы"- название и сумма
  expensesPlus = btnPlus[1];

const depositCheck = document.querySelector('#deposit-check');

//Поле "Возможный доход"- строка
const additionalIncomeItems = document.querySelectorAll('.additional_income-item');

//Получение полей для вывода полученных из методов значений 
let budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
  budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
  expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
  additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
  additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
  incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
  targetMonthValue = document.getElementsByClassName('target_month-value')[0];

//Блок "Дополнительный доход"
const incomeTitle = document.querySelector('.income-title');
let incomeItems = document.querySelectorAll('.income-items');//Родитель

//Блок "Обязательные расходы"
const expensesTitle = document.querySelector('.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');//Родитель

//Возможные расходы - строка
const additionalExpensesItem = document.querySelector('.additional_expenses-item');

//Сумма накопления- Цель
const targetAmount = document.querySelector('.target-amount');

//Бегунок
let periodSelect = document.querySelector('.period-select');
let periodAmount = document.querySelector('.period-amount');

//Функция валидации на числа
const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

//Основной обьект
let appData = {
  budget: 0,
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  budgetDay: 0,
  budgetMonth: 0, //Сколько зарабатываем за месяц- результат полученный из getBudget
  expensesMonth: 0,
  percentDeposit: '',
  moneyDeposit: '',
  start: function () {

    appData.budget = +salaryAmount.value;

    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getAdditionalExpenses();
    appData.getAdditionalIncome();
    appData.getBudget();

    appData.showResult();
  },

  //Функция ValidateDSalaryAmount
  validateSalaryAmount: function () {
    if (salaryAmount.value !== '' && isNumber(salaryAmount.value)) {
      start.removeAttribute('disabled');
    } else {
      start.setAttribute('disabled', 'disabled');
    }
  },

  //Функция ShowResult- вывод в колонку справа результатов вычисления
  showResult: function () {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(appData.getTargetMonth());
    incomePeriodValue.value = appData.calcSavedMoney();
  },

  //Функция addExpensesBlock
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');

    //Удаление кнопки-expensesPlus
    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
  },

  //Функция addIncomeBlock
  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');

    //Удаление кнопки-incomePlus
    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }
  },

  //Функция getExpenses- получение Обязательных Расходов и их запись в обьект
  //-перебором всех элементов с классом expensesItems
  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector('.expenses-title').value;//Наименование
      let cashExpenses = item.querySelector('.expenses-amount').value;//Сумма
      //Проверка на наличие данных-
      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = cashExpenses;//Назначение- вместо цикла в asking
        //appData.expenses[itemExpenses]= Ключ, a cashExpenses= его значение
      }
    });
  },

  //Функция getIncome
  getIncome: function () {
    incomeItems.forEach(function (item) {
      let itemIncome, cashIncome;
      itemIncome = item.querySelector('.income-title').value;
      cashIncome = item.querySelector('.income-amount').value;

      if (itemIncome !== '' && cashIncome !== '') {
        appData.income[itemIncome] = cashIncome;
      }
    });

    for (let key in appData.income) {
      appData.incomeMonth += +appData.income[key];
    }
  },

  //Функция getAdditionalExpenses- возможные расходы- строка
  getAdditionalExpenses: function () {
    let additionalExpenses = additionalExpensesItem.value.split(',');
    additionalExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    });
  },

  //Функция getAdditionalIncome- возможные доходы- строка
  getAdditionalIncome: function () {
    additionalIncomeItems.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    })
  },

  //Функция getExpensesMonth - получаем сумму обязательных расходов
  getExpensesMonth: function () {
    let sum = 0;
    for (let key in appData.expenses) {
      sum += +appData.expenses[key];
    }
    appData.expensesMonth = sum;
  },

  //Функция getBudget - получаем сумму чистого дохода после вычета обязательных расходов
  getBudget: function () {
    appData.budgetMonth = (appData.budget + appData.incomeMonth) - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },

  //Функция - результат деления "ЦЕЛЬ" на чистый доход.
  getTargetMonth: function () {
    return targetAmount.value / appData.budgetMonth;
  },

  //Функция оценки уровня процветания
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

  //Функция для умножения budgetMonth на period
  calcSavedMoney: function () {
    return appData.budgetMonth * periodSelect.value;
  },

  //Функция для RangeInputValue
  getRangeValue: function () {
    periodAmount.innerHTML = this.value;
    incomePeriodValue.value = appData.calcSavedMoney();
  }
};

//Обработчики событий
start.addEventListener('click', appData.start);

expensesPlus.addEventListener('click', appData.addExpensesBlock);

incomePlus.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('change', appData.getRangeValue);

salaryAmount.addEventListener('input', appData.validateSalaryAmount);

'use strict';

let start = document.getElementById('start');
start.setAttribute('disabled', 'disabled');

let cancel = document.getElementById('cancel');

const dataInputsSection = document.querySelector('.data');
// let allDataInputs = dataInputsSection.querySelectorAll('input[type=text]');
// console.log('allDataInputs: ', allDataInputs);

const resultInputsSection = document.querySelector('.result');
// let allResultInputs = resultInputsSection.querySelectorAll('input[type=text]');
// console.log('allResultInputs: ', allResultInputs);


//Поле "Месячный доход"- числа
let salaryAmount = document.querySelector('.salary-amount');

const btnPlus = document.getElementsByTagName('button'),
  //Блок полей "Дополнительный доход"- название и сумма
  incomePlus = btnPlus[0],
  //Блок полей "Обязательные расходы"- название и сумма
  expensesPlus = btnPlus[1];

let depositCheck = document.querySelector('#deposit-check');

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
  resetObject: function () {
    appData.budget = 0,
      appData.income = {},
      appData.incomeMonth = 0,
      appData.addIncome = [],
      appData.expenses = {},
      appData.addExpenses = [],
      appData.deposit = false,
      appData.budgetDay = 0,
      appData.budgetMonth = 0,
      appData.expensesMonth = 0,
      appData.percentDeposit = '',
      appData.moneyDeposit = '';
  },

  start: function () {
    this.resetObject();

    this.budget = +salaryAmount.value;
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAdditionalExpenses();
    this.getAdditionalIncome();
    this.getBudget();

    this.showResult();

    this.showCancelBtn();
  },

  //Функция showCancelBtn
  showCancelBtn: function () {

    let allDataInputs = dataInputsSection.querySelectorAll('input[type=text]');

    allDataInputs.forEach(item => {
      item.setAttribute('disabled', 'disabled');
    });

    start.style.display = 'none';
    cancel.style.display = 'block';

    expensesPlus.setAttribute('disabled', 'disabled');
    incomePlus.setAttribute('disabled', 'disabled');
    depositCheck.setAttribute('disabled', 'disabled');
    periodSelect.setAttribute('disabled', 'disabled');

    // cancel.addEventListener('click', function () {
    //   console.log('Нажата кнопка Отменить');
    //   console.log(depositCheck.value);
    // });
    cancel.addEventListener('click', this.reset);
  },

  //Функция "Обнулить всё"

  reset: function () {

    let allDataInputs = dataInputsSection.querySelectorAll('input[type=text]');
    let allResultInputs = resultInputsSection.querySelectorAll('input[type=text]');

    allDataInputs.forEach(item => {
      item.removeAttribute('disabled');
      item.value = '';
    });

    allResultInputs.forEach(item => {
      item.value = '';
    });

    start.style.display = 'block';
    start.setAttribute('disabled', 'disabled');
    cancel.style.display = 'none';

    expensesPlus.removeAttribute('disabled');
    incomePlus.removeAttribute('disabled');
    depositCheck.removeAttribute('disabled');
    periodSelect.removeAttribute('disabled');

    periodSelect.value = 1;
    periodAmount.innerHTML = periodSelect.value;

    // console.log('Длина income items', incomeItems.length);
    // console.log(' income items', incomeItems);

    //remove Income fields
    let plus = btnPlus[0];

    incomeItems.forEach(item => {
      if (item !== incomeItems[0] && item !== plus) {
        item.parentNode.removeChild(item);
      }
    });

    //remove Expenses fields
    let minus = btnPlus[1];

    expensesItems.forEach(item => {
      if (item !== expensesItems[0] && item !== minus) {
        item.parentNode.removeChild(item);
      }
    });

    depositCheck.checked = false;

    expensesPlus.style.display = 'block';
    incomePlus.style.display = 'block';
  },

  //Функция ValidateSalaryAmount
  validateSalaryAmount: function () {
    if (salaryAmount.value !== '' && isNumber(salaryAmount.value)) {
      start.removeAttribute('disabled');
    } else {
      start.setAttribute('disabled', 'disabled');
    }
  },

  //Функция ShowResult- вывод в колонку справа результатов вычисления
  showResult: function () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcSavedMoney();
  },

  //Функция addExpensesBlock
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');

    //Удаление кнопки-expensesPlus
    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
      //display: inline-block;incomePlus.style.display = 'none';
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
      //Наименование расхода
      const itemExpenses = item.querySelector('.expenses-title').value,
        //Сумма расхода
        cashExpenses = item.querySelector('.expenses-amount').value;

      //Проверка на наличие данных-
      if (itemExpenses !== '' && cashExpenses !== '') {
        this.expenses[itemExpenses] = cashExpenses;
      }
    }, this);

  },

  //Функция getIncome- получение Дополнительных Доходов
  getIncome: function () {
    incomeItems.forEach(function (item) {
      //Наименование дохода
      const itemIncome = item.querySelector('.income-title').value,
        //Сумма дохода
        cashIncome = item.querySelector('.income-amount').value;

      if (itemIncome !== '' && cashIncome !== '') {
        this.income[itemIncome] = cashIncome;
      }
    }, this);

    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  },

  //Функция getAdditionalExpenses- возможные расходы- строка
  getAdditionalExpenses: function () {
    let additionalExpenses = additionalExpensesItem.value.split(',');
    additionalExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
    }, this);
  },

  //Функция getAdditionalIncome- возможные доходы- строка
  getAdditionalIncome: function () {
    additionalIncomeItems.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    }, this)
  },

  //Функция getExpensesMonth - получаем сумму обязательных расходов
  getExpensesMonth: function () {
    let sum = 0;
    for (let key in this.expenses) {
      sum += +this.expenses[key];
    }
    this.expensesMonth = sum;
  },

  //Функция getBudget - получаем сумму чистого дохода после вычета обязательных расходов
  getBudget: function () {
    this.budgetMonth = (this.budget + this.incomeMonth) - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  },

  //Функция - результат деления "ЦЕЛЬ" на чистый доход.
  getTargetMonth: function () {
    return targetAmount.value / this.budgetMonth;
  },

  //Функция для умножения budgetMonth на period
  calcSavedMoney: function () {
    return this.budgetMonth * periodSelect.value;
  },

  //Функция для RangeInputValue
  getRangeValue: function () {
    console.log('getRangeValue STR 287 18:24', this);
    periodAmount.innerHTML = periodSelect.value;
    incomePeriodValue.value = appData.calcSavedMoney();//!!! 293
  }
};

//Обработчики событий

start.addEventListener('click', appData.validateSalaryAmount);

//1 Привязать контекст вызова функции start к appData 
let calculateData = appData.start.bind(appData);
start.addEventListener('click', calculateData);

// start.addEventListener('click', appData.start);

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);

let changeRangeValue = appData.getRangeValue.bind(appData);
periodSelect.addEventListener('change', changeRangeValue);
// periodSelect.addEventListener('change', appData.getRangeValue);

salaryAmount.addEventListener('input', appData.validateSalaryAmount);

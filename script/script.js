'use strict';

let start = document.getElementById('start');
start.setAttribute('disabled', 'disabled');

// Сумма "Месячный доход"
let salaryAmount = document.querySelector('.salary-amount');

const btnPlus = document.getElementsByTagName('button'),
  //Добавить поле "Дополнительный доход"
  incomePlus = btnPlus[0],
  //Добавить поле "Обязательные расходы"
  expensesPlus = btnPlus[1];

const depositCheck = document.querySelector('#deposit-check');

//Поле "Возможный доход"- текст
const additionalIncomeItems = document.querySelectorAll('.additional_income-item');

//Поля для вывода полученных из методов значений 
let budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
  budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
  expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
  additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
  additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
  incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
  targetMonthValue = document.getElementsByClassName('target_month-value')[0];

//Секция "Дополнительный доход". Родитель- .income-items
const incomeTitle = document.querySelector('.income-title');
// const incomeAmount = document.querySelector('.income-amount');
let incomeItems = document.querySelectorAll('.income-items');

//Секция "Обязательные расходы". 
const expensesTitle = document.querySelector('.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');//Родитель

const additionalExpensesItem = document.querySelector('.additional_expenses-item');
// console.log('additionalExpensesItem: ', additionalExpensesItem);
const targetAmount = document.querySelector('.target-amount');
// console.log('targetAmount: ', targetAmount);

let periodSelect = document.querySelector('.period-select');
let periodAmount = document.querySelector('.period-amount');

////
const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
////

let appData = {
  budget: 0,
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  // period: 3,
  budgetDay: 0,
  budgetMonth: 0,//Сколько зарабатываем за месяц- высчитан из getBudget
  expensesMonth: 0,
  percentDeposit: '',
  moneyDeposit: '',
  start: function () {

    // appData.checkSalaryAmountValue();
    // if (salaryAmount.value === '') {
    //   start.setAttribute('disabled', 'disabled');
    //   return appData.start();

    // } else {
    //   appData.budget = +salaryAmount.value;
    //   console.log('appData.budget: ', appData.budget);

    //   appData.getExpenses();
    //   appData.getIncome();
    //   appData.getExpensesMonth();
    //   appData.getAdditionalExpenses();
    //   appData.getAdditionalIncome();

    //   appData.getBudget();
    //   appData.showResult();
    // }
    // if (salaryAmount.value === '') {
    //   alert('Ошибка, поле "Месячный Доход" должно быть заполнено.');
    //   return;
    // }

    // appData.validateSalaryAmount();

    appData.budget = +salaryAmount.value;
    console.log('appData.budget: ', appData.budget);

    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getAdditionalExpenses();
    appData.getAdditionalIncome();

    appData.getBudget();

    appData.showResult();
  },

  //FUNCTION VAlidateDSalaryAmount
  validateSalaryAmount: function () {
    if (salaryAmount.value !== '' && isNumber(salaryAmount.value)) {
      start.removeAttribute('disabled');
      console.log('Всё окей!');
      // start.setAttribute('disabled', 'disabled');
      // console.log('TRALALA!!!');
    } else {
      // start.removeAttribute('disabled');
      // console.log('ALL GOOD');
      start.setAttribute('disabled', 'disabled');
      console.log('Фигушки!!!');
    }
  },

  //FUNCTION ShowResult- вывод в колонку справа результатов вычисления
  showResult: function () {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(appData.getTargetMonth());
    incomePeriodValue.value = appData.calcSavedMoney();
  },

  //FUNCTION addExpensesBlock
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');

    //Удаление кнопки-expensesPlus
    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
  },

  //FUNCTION addIncomeBlock
  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');

    //Удаление кнопки-incomePlus
    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }
  },

  //FUNCTION getExpenses- получение Обязательных Расходов и их запись в обьект
  //перебором всем элементов с классом expensesItems
  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector('.expenses-title').value;//Наименование
      let cashExpenses = item.querySelector('.expenses-amount').value;//Сумма
      //Проверка на наличие данных-
      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = cashExpenses;//Назначение- вместо цикла в asking
        //appData.expenses[itemExpenses]= Ключ, a cashExpenses= значение ключа
      }
    });
  },

  //FUNCTION getIncome-DZ
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
      console.log(appData.income[key]);
    }

    //   // if (confirm('Есть ли у вас дополнительный источник заработка?')) {
    //   //   let itemIncome, cashIncome;
    //   //   do {
    //   //     itemIncome = prompt('Какой именно?', 'Садоводство');
    //   //   } while (
    //   //     (itemIncome === null || itemIncome.trim() === '' || isNumber(itemIncome.trim()))
    //   //   );
    //   //   do {
    //   //     cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', '10000');//NUMBER?
    //   //   } while (
    //   //     !isNumber(cashIncome)
    //   //   );
    //   //   appData.income[itemIncome] = +cashIncome;
    //   //   console.log('STR 164: ', appData.income);
    //   // }

    //   // for (let key in appData.income) {
    //   //   appData.incomeMonth += +appData.income[key];
    //   //   console.log(appData.income[key]);
    //   // }
  },

  //FUNCTION getAdditionalExpenses- возможные расходы
  getAdditionalExpenses: function () {
    let additionalExpenses = additionalExpensesItem.value.split(',');
    additionalExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    });
  },

  //FUNCTION getAdditionalIncome- возможные POSSIBLE доходы additionalIncomeItems
  getAdditionalIncome: function () {
    additionalIncomeItems.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    })
  },

  getExpensesMonth: function () {
    let sum = 0;

    for (let key in appData.expenses) {
      sum += +appData.expenses[key];//ADD +!!!!
    }
    appData.expensesMonth = sum;
  },

  getBudget: function () {
    appData.budgetMonth = (appData.budget + appData.incomeMonth) - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },

  getTargetMonth: function () {
    return targetAmount.value / appData.budgetMonth;
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

  // getInfoDeposit: function () {
  //   appData.deposit = confirm('“Есть ли у вас депозит в банке?”');

  //   if (appData.deposit) {
  //     do {
  //       appData.percentDeposit = prompt('Какой годовой процент?', '10');
  //     } while (!isNumber(appData.percentDeposit));

  //     do {
  //       appData.moneyDeposit = prompt('Какая сумма заложена?', '10000');
  //     } while (!isNumber(appData.moneyDeposit));
  //   }
  // },


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

start.addEventListener('click', appData.start);

expensesPlus.addEventListener('click', appData.addExpensesBlock);

incomePlus.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('change', appData.getRangeValue);

// appData.getInfoDeposit();

// console.log('*** Расходы за месяц: ***');
// console.log(appData.expensesMonth);

// console.log('*** За какой период будет достигнута цель (в месяцах): ***');
// appData.getTargetMonth();

// console.log('*** Уровень дохода: ***');
// appData.getStatusIncome();


// console.log('Наша программа включает в себя данные: ');
// for (let key in appData) {
//   console.log('Ключ: ', key, ' и его Значение: ', appData[key]);
// }


salaryAmount.addEventListener('input', appData.validateSalaryAmount);

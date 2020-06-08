'use strict';

//2)Спрашиваем у пользователя “Ваш месячный доход?” и результат 
//сохраняем в переменную money
let monthlyIncomeQuestion = +prompt('“Ваш месячный доход?”', '33000');
let money = monthlyIncomeQuestion;


let income = 'Основная работа, фриланс.';


//3) Спросить у пользователя “Перечислите возможные расходы за 
//рассчитываемый период через запятую” сохранить в переменную addExpenses
let possibleExpensesQuestion = prompt('“Перечислите возможные расходы за рассчитываемый период через запятую”', 'Подарки родственникам, путешествия, оплата за курсы.');
let addExpenses = possibleExpensesQuestion;
// let addExpenses = possibleExpensesQuestion.valueOf();



//4) Спросить у пользователя “Есть ли у вас депозит в банке?” 
//и сохранить данные в переменной deposit (булево значение true/false)
let depositQuestion = confirm('“Есть ли у вас депозит в банке?”');
let deposit = depositQuestion;


//5) Спросить у пользователя по 2 раза каждый вопрос и записать ответы в разные переменные 
let expensesQuestion1 = prompt('“Введите обязательную статью расходов?”', 'Счета и питание.');
let expensesAmount1 = +prompt('“Во сколько это обойдется?”', '5000');

let expensesQuestion2 = prompt('“Какие ещё у вас есть расходы?”', 'Транспорт');
let expensesAmount2 = +prompt('“Во сколько это обойдется?”', '5000');



//*6) Вычислить бюджет на месяц, учитывая обязательные расходы, 
//сохранить в новую переменную budgetMonth и вывести результат в консоль
let budgetMonth = money - (expensesAmount1 + expensesAmount1);
console.log('budgetMonth: ', budgetMonth);


//*7) Зная budgetMonth, посчитать за сколько месяцев будет достигнута цель
// mission, вывести в консоль, округляя в большую сторону (методы объекта Math в помощь).
let mission = 150000;
let achievedMission = mission / budgetMonth;
console.log('“Цель будет достигнута за ', Math.ceil(achievedMission), ' месяц/цев”');


//*8) Поправить budgetDay учитывая бюджет на месяц, а не месячный доход. 
//Вывести в консоль округлив в меньшую сторону 
let budgetDay = budgetMonth / 30;
console.log('budgetDay: ', Math.floor(budgetDay));


/** 
9- Написать конструкцию условий (расчеты приведены в рублях)	
Если budgetDay больше 1200, то “У вас высокий уровень дохода”
Если budgetDay больше 600 и меньше 1200, то сообщение “У вас средний уровень дохода”
Если budgetDay меньше 600 то в консоль вывести сообщение “К сожалению у вас уровень дохода ниже среднего”
Если отрицательное значение то вывести “Что то пошло не так”
Учесть варианты 0, 600 и 1200
 */

if (budgetDay >= 1200) {
  console.log('“У вас высокий уровень дохода”');
} else if (budgetDay >= 600 && budgetDay < 1200) {
  console.log('“У вас средний уровень дохода”');
} else if (budgetDay >= 0 && budgetDay < 600) {
  console.log('“К сожалению у вас уровень дохода ниже среднего”');
} else if (budgetDay < 0) {
  console.log('“Что то пошло не так”');
}


let period = 12;


console.log('*** Из урока 02- ***');
console.log('Money: ', typeof money);
console.log('Income: ', typeof income);
console.log('Deposit: ', typeof deposit);
console.log('AddExpenses length: ', addExpenses.length);
console.log('Период равен: ', period, 'ти месяцам/месяцев. \nЦель - заработать ', mission, ' рублей.');
console.log('AddExpenses: ');
console.log(addExpenses.toLowerCase().split(', '));
console.log('Дневной бюджет: ', Math.round(budgetDay));


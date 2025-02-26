
/**
 * Получает массив транзакций и возвращает массив с используемыми там типами транзакций
 * @param {Array} transactions  Массив транзакций
 * @returns {Array} Массив уникальных типов транзакций
 */
export function getUniqueTransactionTypes(transactions)
{
    let SetTransactions = new Set();
    for(let i = 0; i < transactions.length; i++)
    {
        SetTransactions.add(transactions[i].transaction_type);
    }

    return SetTransactions;
}

/**
 * Высчитает сумму для поля transaction_amount всех элементов массива
 * @param {*} transactions Массив транзакций
 * @returns {Number} Числовое значение суммы
 */
export function calculateTotalAmount(transactions)
{
    /*
    let SumAmount = 0;
    for(let i = 0; i < transactions.length; i++)
        {
            SumAmount += transactions[i].transaction_amount;
        }
    return SumAmount;
    */

    return transactions.reduce((sum, item) => sum + item.transaction_amount, 0);
}

/**
 * Вычисляет общую сумму транзакций за указанный год, и/или месяц и/или день
 * @param {Array} transactions Массив транзакций
 * @param {string | number} year Необязательный параметр, год транзакции
 * @param {string | number} month Необязательный параметр, месяц транзакции
 * @param {string | number} day Необязательный параметр, день транзакции
 * @returns {number} Числовое значение суммы за указанную дату
 */
export function calculateTotalAmountByDate(transactions, year, month, day)
{
    let SumAmountByDate = 0;
    let isYear = true, isMonth = true, isDay = true;
    if(year === undefined)
        isYear = false;
    if(month === undefined)
        isMonth = false;
    if(day === undefined) 
        isDay = false;

    if(isYear && isMonth && isDay)
    {
        for(let i = 0; i < transactions.length; i++)
            {
                let dates = transactions[i].transaction_date.split("-");
                if(dates[0] == year && dates[1] == month && dates[2] == day)
                {
                    SumAmountByDate += transactions[i].transaction_amount;
                }
            }
        
        return SumAmountByDate;
    }

    if(isYear && isMonth)
    {
        for(let i = 0; i < transactions.length; i++)
            {
                let dates = transactions[i].transaction_date.split("-");
                if(dates[0] == year && dates[1] == month)
                {
                    SumAmountByDate += transactions[i].transaction_amount;
                }
            }   
    
        return SumAmountByDate;     
    }
    
    if(isYear && isDay)
    {
        for(let i = 0; i < transactions.length; i++)
            {
                let dates = transactions[i].transaction_date.split("-");
                if(dates[0] == year && dates[2] == day)
                {
                    SumAmountByDate += transactions[i].transaction_amount;
                }
            }       

        return SumAmountByDate; 
    }

    if(isDay && isMonth)
    {
        for(let i = 0; i < transactions.length; i++)
            {
                let dates = transactions[i].transaction_date.split("-");
                if(dates[1] == month && dates[2] == day)
                {
                    SumAmountByDate += transactions[i].transaction_amount;
                }
            }       
            
        return SumAmountByDate;
    }

    if(isYear)
    {
        for(let i = 0; i < transactions.length; i++)
            {
                let dates = transactions[i].transaction_date.split("-");
                if(dates[0] == year)
                {
                    SumAmountByDate += transactions[i].transaction_amount;
                }
            }        
    
        return SumAmountByDate;
    }

    if(isMonth)
    {
        for(let i = 0; i < transactions.length; i++)
            {
                let dates = transactions[i].transaction_date.split("-");
                if(dates[1] == month)
                {
                    SumAmountByDate += transactions[i].transaction_amount;
                }
            }    

        return SumAmountByDate; 
    }

    if(isDay)
    {
        for(let i = 0; i < transactions.length; i++)
            {
                let dates = transactions[i].transaction_date.split("-");
                if(dates[2] == day)
                {
                    SumAmountByDate += transactions[i].transaction_amount;
                }
            }        

        return SumAmountByDate;
    }

    return SumAmountByDate;
}

/**
 * Проходит изначальный массив транзакций и создает новый, где будут только транзакции с указанным типом
 * @param {Array} transactions Массив транзакций
 * @param {string} type Тип транзакции
 * @returns {Array} Массив транзакций указанного типа
 */
export function getTransactionByType(transactions, type)
{
    /*
    let thisTypeTransactions = [];
    for(let i = 0; i < transactions.length; i++)
        {
            if(transactions[i].transaction_type == type)
            {
                thisTypeTransactions.push(transactions[i]);
            }
        }
    return thisTypeTransactions;
    */
    return transactions.filter(transaction => transaction.transaction_type == type);
}

/**
 * Возвращает массив транзакций, произведенных в диапозоне между начальной и конечной датой
 * @param {Array} transactions Массив транзакций
 * @param {string} startDate Дата - начало диапозона
 * @param {string} endDate  Дата - конец диапозона
 * @returns {Array} Массив транзакций в диапозоне дат
 */
export function getTransactionsInDateRange(transactions, startDate, endDate)
{
    let startDateSplit = startDate.split("-");
    let endDateSplit = endDate.split("-");
    let flag = (startDateSplit[0] > endDateSplit[0]) 
    ? true 
    : (startDateSplit[0] == endDateSplit[0] 
        ? (startDateSplit[1] > endDateSplit[1] 
            ? true 
            : (startDateSplit[1] == endDateSplit[1] 
                ? (startDateSplit[2] > endDateSplit[2] 
                    ? true 
                    : false)
                : false)) 
        : false );


    if(flag)
    {
        console.log("Вы перепутали начало и конец диапозона местами! В целях правильной работы, они были поменяны местами!");
        let buffer = startDateSplit;
        startDateSplit = endDateSplit;
        endDateSplit = buffer;
    }

    let arrayOfTransactions = [];
    for(let i = 0; i < transactions.length; i++)
        {
            let DateSplit = transactions[i].transaction_date.split("-");

            if(startDateSplit[0] < DateSplit[0] && DateSplit[0] < endDateSplit[0])
            {
                arrayOfTransactions.push(transactions[i]);
                continue;
            }
            if(startDateSplit[1] < DateSplit[1] && DateSplit[1] < endDateSplit[1])
            {
                arrayOfTransactions.push(transactions[i]);
                continue;
            }
            if(startDateSplit[1] == DateSplit[1] && startDateSplit[2] <= DateSplit[2])
            {
                arrayOfTransactions.push(transactions[i]);
                continue;
            }
            if(endDateSplit[1] == DateSplit[1] && endDateSplit[2] >= DateSplit[2])
            {
                arrayOfTransactions.push(transactions[i]);
                continue;
            }
        }
    return arrayOfTransactions;
}

/**
 * Проходит изначальный массив транзакций и создает новый, где будут только транзакции с заданным продавцом
 * @param {Array} transactions Массив транзакций
 * @param {string} merchantName Имя продавца
 * @returns {Array} Массив транзакций с заданным продавцом
 */
export function getTransactionsByMerchant(transactions, merchantName)
{
    let arrayOfTransactions = [];

    for(let i = 0; i < transactions.length; i++)
        {
            if(transactions[i].merchant_name == merchantName)
            {
                arrayOfTransactions.push(transactions[i]);
            }
        }

    return arrayOfTransactions;
}

/**
 * Высчитывает среднее значение транзакции между всеми транзакциями
 * @param {Array} transactions Массив транзакций
 * @returns {Array} среднее арифметическое поля transaction_amount
 */
export function calculateAverageTransactionAmount(transactions)
{
    let sumAmount = calculateTotalAmount(transactions);
    return sumAmount / transactions.length;
}

/**
 * Вовзращает массив транзакций, поле transaction_amount которых находится в диапозоне между minAmount и maxAmount
 * @param {Array} transactions Массив транзакций
 * @param {string | number} minAmount Минимальная сумма транзакции
 * @param {string | number} maxAmount Максимальная сумма транзакции
 * @returns {Array} Массив транзакций 
 */
export function getTransactionsByAmountRange(transactions, minAmount, maxAmount)
{
    let arrayOfTransactions = [];

    if(minAmount > maxAmount)
    {
        let buffer = minAmount;
        minAmount = maxAmount;
        maxAmount = buffer;
    }

    for(let i = 0; i < transactions.length; i++)
        {
            if(transactions[i].transaction_amount <= maxAmount && transactions[i].transaction_amount >= minAmount)
            {
                arrayOfTransactions.push(transactions[i]);
            }
        }

    return arrayOfTransactions;
}

/**
 * Вычисляет сумму для всех дебитовых транзакций
 * @param {Array} transactions Массив транзакций
 * @returns {number} Сумма дебитовых транзакций
 */
export function calculateTotalDebitAmount(transactions)
{
    let arrayOfTransactions = getTransactionByType(transactions, "debit");
    return calculateTotalAmount(arrayOfTransactions);
}

/**
 * Возвращает месяц, в котором было больше всего транзакций
 * @param {Array} transactions Массив транзакций
 * @returns {Array} Массив, в котором последний элемент - индекс лучшего месяца, а остальные элементы - количество транзакций в каждом месяце
 */
export function findMostTransactionsMonth(transactions)
{
    let firstDate = transactions[0].transaction_date;
    let lastDate = transactions[transactions.length -1].transaction_date;

    let diff = Number(lastDate.split("-")[1]) - Number(firstDate.split("-")[1]);
    
    let arrayOfColTransactions = [];

    for(let i = 1; i <= diff + 1; i++)
    {
        arrayOfColTransactions.push(0);
        for(let j = 0; j < transactions.length; j++)
        {
            if(i == transactions[j].transaction_date.split("-")[1])
            {
                arrayOfColTransactions[i-1] += 1;
            }
        }
    }

    let max = arrayOfColTransactions[0];
    let maxIndex = 0;
    for( let i = 1; i < arrayOfColTransactions.length; i++)
    {
        if(max < arrayOfColTransactions[i])
        {
            max = arrayOfColTransactions[i];
            maxIndex = i;
        }
    }
    arrayOfColTransactions.push(maxIndex + 1);
    return arrayOfColTransactions;
}

/**
 * Возвращает месяц, в котором было больше дебетовых транзакций
 * @param {Array} transactions Массив транзакций
 * @returns {Array} Массив, в котором последний элемент - индекс лучшего месяца, а остальные элементы - количество транзакций в каждом месяце
 */
export function findMostDebitTransactionMonth(transactions)
{
    let arrayOfTransactions = getTransactionByType(transactions, "debit");
    return findMostTransactionsMonth(arrayOfTransactions);
}

/**
 * Возвращает название типа, транзакций которого больше всего
 * @param {Array} transactions Массив транзакций
 * @returns Возвращает Debit, если больше дебитовых транзакций, Credit если кредитных и Equal если количество равное
 */
export function mostTransactionTypes(transactions)
{
    let debit = getTransactionByType(transactions, "debit");
    let credit = getTransactionByType(transactions, "credit");

    return (debit == credit) ? "Equal" : (debit > credit) ? "Debit" : "Credit";
}

/**
 * Возвращает массив транзакций, совершенных до указанной даты
 * @param {Array} transactions Массив транзакций
 * @param {string} date Конечная дата транзакций
 * @returns Массив транзакций до указанный даты
 */
export function getTransactionsBeforeDate(transactions, date)
{
    return getTransactionsInDateRange(transactions, transactions[0].transaction_date, date);
}

/**
 * Возвращает транзакцию по ее уникальному идентификатору (id).
 * @param {Array} transactions Массив транзакций
 * @param {number | string} id Идентификационный номер конкретной транзакции
 * @returns Обьект транзакции
 */
export function findTransactionById(transactions, id)
{
    return id > 0 && id <= transactions.length ? transactions[id-1] : "Incorrect ID!";
}

/**
 * Возвращает новый массив, содержащий только описания транзакций
 * @param {Array} transactions Массив транзакций
 * @returns {Array} Массив описаний транзакций
 */
export function mapTransactionDescriptions(transactions)
{
    /*
    let arrayOfTransactions = [];

    for(let i = 0; i < transactions.length; i++)
    {
        arrayOfTransactions.push(transactions[i].transaction_description);
    }

    return arrayOfTransactions;
    */

    return transactions.map(transaction => transaction.transaction_description);
}
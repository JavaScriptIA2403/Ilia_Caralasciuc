import transactions from "./transactions.js";

import { 
    getUniqueTransactionTypes, 
    calculateTotalAmount, 
    calculateTotalAmountByDate, 
    getTransactionByType,
    getTransactionsInDateRange,
    getTransactionsByMerchant,
    calculateAverageTransactionAmount,
    getTransactionsByAmountRange,
    calculateTotalDebitAmount,
    findMostTransactionsMonth,
    findMostDebitTransactionMonth,
    mostTransactionTypes,
    getTransactionsBeforeDate,
    findTransactionById,
    mapTransactionDescriptions
 } from "./functions.js";


if(transactions.length > 0)
{
    // 1
    console.log(transactions);
    let UniqueTransactions = getUniqueTransactionTypes(transactions);
    console.log(UniqueTransactions);

    //2
    console.log(calculateTotalAmount(transactions));

    //3
    console.log(calculateTotalAmountByDate(transactions, undefined, undefined, 1));

    //4
    console.log(getTransactionByType(transactions, "credit"));

    //5
    console.log(getTransactionsInDateRange(transactions, "2019-02-31", "2019-01-01"));

    //6
    console.log(getTransactionsByMerchant(transactions, "SuperMart"));

    //7
    console.log(calculateAverageTransactionAmount(transactions));

    //8
    console.log(getTransactionsByAmountRange(transactions, 40, "50"));

    //9
    console.log(calculateTotalDebitAmount(transactions));

    //10
    console.log(findMostTransactionsMonth(transactions));

    //11
    console.log(findMostDebitTransactionMonth(transactions));

    //12
    console.log(mostTransactionTypes(transactions));

    //13
    console.log(getTransactionsBeforeDate(transactions, "2019-04-30"));

    //14
    console.log(findTransactionById(transactions, 24));

    //15
    console.log(mapTransactionDescriptions(transactions));
}
else
{
    console.log("Некоторые операции нельзя провести с пустым массивом. Пожалуйста, заполните массив хоть одной транзакцией!");
}

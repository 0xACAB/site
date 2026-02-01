const LogachevBig = [
    { original: 3.09, real: 3.09, result: 'lose', betSumRUR: 2500 },
    { original: 1.6, real: 1.6, result: 'win', betSumRUR: 0 },
    { original: 1.77, real: 1.77, result: 'win', betSumRUR: 250 },
    { original: 1.77, real: 1.77, result: 'win', betSumRUR: 2500 },
    { original: 1.78, real: 1.78, result: 'lose', betSumRUR: 2500 },
    { original: 1.6, real: 1.6, result: 'lose', betSumRUR: 2500 },
    { original: 3.6, real: 3.6, result: 'lose', betSumRUR: 1570 },
    { original: 3.5, real: 3.5, result: 'lose', betSumRUR: 1000 },
    { original: 1.81, real: 1.81, result: 'lose', betSumRUR: 2500 }, //по ошибке другое событие пробил
    { original: 3.0, real: 3.0, result: 'lose', betSumRUR: 5000 }, //1
    { original: 2.9, real: 2.9, result: 'lose', betSumRUR: 5000 }, //2
    { original: 4.5, real: 4.5, result: 'lose', betSumRUR: 9000 }, //3
    { original: 6.0, real: 6.0, result: 'lose', betSumRUR: 1000 }, //4
    { original: 8.5, real: 3.5, result: 'lose', betSumRUR: 500 } //5
    // - [1,2,3,4,5] - с одного события поставил слишком крупно. Флет на баскет был 2500. Поставил зачем-то 20500.
    //Снижаю флет до 2000
];
export default LogachevBig;

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
    { original: 2.9, real: 2.9, result: 'lose', betSumRUR: 20500 },
    // Флет на баскет был 2500. Поставил зачем-то 20500.
    //03.02.2026
    //Снижаю флет до 2000
    { original: 6.0, real: 6.0, result: 'lose', betSumRUR: 500 }, //по ошибке поставил на подходящий кеф, но не по линии, а в лайве
    { original: 5.5, real: 5.5, result: 'lose', betSumRUR: 50 },
    { original: 3.8, real: 3.8, result: 'lose', betSumRUR: 20180 }
    //C одного события поставил ОПЯТЬ слишком крупно. Не соблюдая флет.
    //20180 - проиграл. не дофига ли? Больше чем в 10 раз больше чем хотел, лудос.
    //Куда-то полез без кефа добирать. По непроверенному сигналу. Еще и без кф. 5000 вообще в тильте залил
    //Флет 1000 теперь без оправданий
];
export default LogachevBig;

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
    { original: 3.8, real: 3.8, result: 'lose', betSumRUR: 20180 },
    //C одного события поставил ОПЯТЬ слишком крупно. Не соблюдая флет.
    //20180 - проиграл. не дофига ли? Больше чем в 10 раз больше чем хотел, лудос.
    //Куда-то полез без кефа добирать. По непроверенному сигналу. Еще и без кф. 5000 вообще в тильте залил
    //Флет 1000 теперь без оправданий.
    { original: 1.27, real: 1.27, result: 'lose', betSumRUR: 1000 },
    //вот красивое подтверждение, что снижение ставки оправдано
    { original: 1.81, real: 1.81, result: 'lose', betSumRUR: 100 },
    { original: 1.65, real: 1.65, result: 'win', betSumRUR: 100 },
    { original: 8.5, real: 8.5, result: 'lose', betSumRUR: 1000 },
    { original: 5.5, real: 5.5, result: 'win', betSumRUR: 1000 },
    { original: 3.5, real: 3.5, result: 'lose', betSumRUR: 10000 },
    //сам себя в говно втер, рассказал себе о какой-то силе с кефами Руслана. Они также могут перестать работать просто
    //разобрался что ошибся с тем с какого он прыгнул на проходной
    //флет 1000 пока не отыграешь как и говорил,
    { original: 1.26, real: 1.26, result: 'lose', betSumRUR: 5000 }, //вообще лудканул на доту
    { original: 4.1, real: 4.1, result: 'lose', betSumRUR: 50 },
    { original: 4.7, real: 4.7, result: 'lose', betSumRUR: 1000 },
    //хотел добирать в лайве, но дисциплина зарешала. А ошибка в том что в туре был только 1 высокий кф
    { original: 7.55, real: 7.55, result: 'win', betSumRUR: 50 },
    { original: 5.5, real: 5.5, result: 'lose', betSumRUR: 50 },
    { original: 2.75, real: 2.75, result: 'lose', betSumRUR: 50 },
    { original: 5.4, real: 5.4, result: 'lose', betSumRUR: 1000 },
    { original: 6.5, real: 6.5, result: 'lose', betSumRUR: 1000 },
    { original: 1.96, real: 1.96, result: 'lose', betSumRUR: 1050 },
    { original: 10.5, real: 10.5, result: 'lose', betSumRUR: 50 },
    { original: 2.45, real: 2.45, result: 'lose', betSumRUR: 7000 }, //Полез после уже забитого поставил тб1.5(прогноз был же что забьют только 1)
    { original: 2.3, real: 2.3, result: 'lose', betSumRUR: 500 }, //Куда-то полез без видео. Мог он слететь же.
    { original: 2.8, real: 2.8, result: 'win', betSumRUR: 500 }, //Опять полез куда-то полез без видео. Но повезло
    { original: 2.43, real: 2.43, result: 'lose', betSumRUR: 500 },
    { original: 2.0, real: 2.0, result: 'lose', betSumRUR: 5000 }, //поставил на прогноз клаудио тб 5.5 вместо тб 5
    { original: 8.0, real: 8.0, result: 'lose', betSumRUR: 500 },
    { original: 1.75, real: 1.75, result: 'lose', betSumRUR: 1000 }, //опять куда-то полез еще такой суммой на женский футбол
    { original: 1.57, real: 1.57, result: 'lose', betSumRUR: 1000 }, //додумал опять какую-то фигню в лайве связанную с чужим прогнозом
    { original: 2.4, real: 2.63, result: 'lose', betSumRUR: 5000 }, //поставил на прогноз клаудио тб 3.5 вместо тб 3.
    // НА ОДНИ И ТЕ ЖЕ ГРАБЛИ. ДОСТАЛ УЖЕ. НОВЫЕ НАЙДИ ГРАБЛИ СЕБЕ
    { original: 2.05, real: 2.05, result: 'win', betSumRUR: 2100 }, //поставил на прогноз клаудио, но с лучшим тоталом
    { original: 1.85, real: 1.85, result: 'win', betSumRUR: 500 },
    { original: 1.39, real: 1.39, result: 'lose', betSumRUR: 13300 },
    //МАТЧ СВЕРХУ: Снова куда-то полез не по прогнозу клаудио еще и почти 3 флета грузанул.
    //1 РАЗ ТОЛЬКО МОЖНО В ЛАЙВЕ ДОБИРАТЬ ЕСЛИ СУПЕР УВЕРЕН! И ТО НА 500р
    //СЛИШКОМ ПОВЕРИЛ В КАППЕРА
    { original: 1.9, real: 1.9, result: 'lose', betSumRUR: 1000 }, //Полез ставить на рекламный неверифицированный канал. Еще и много так
    { original: 2.0, real: 2.0, result: 'lose', betSumRUR: 4000 }, //Полез отыгрываться по рекламному неверифицированному канал. Еще и много так
    { original: 1.44, real: 1.44, result: 'win', betSumRUR: 10000 }, //Два быстрых гола забили при прогнозе на ТМ. Лудканул
    { original: 100, real: 100, result: 'lose', betSumRUR: 100 }, //Куда-то полез думая что уже проиграю основкую хоть кешбек будет метлкий
    { original: 1.34, real: 1.34, result: 'win', betSumRUR: 10000 }, //быстрый гол забили при прогнозе на ТМ. Лудканул
    { original: 3.41, real: 3.41, result: 'lose', betSumRUR: 500 }, //по наркодурости куда-то на баскет зарядил,
    { original: 4.4, real: 4.4, result: 'lose', betSumRUR: 500 }, //по старой дурости куда-то на WNBA баскет зарядил
    { original: 1.84, real: 1.84, result: 'lose', betSumRUR: 10000 }, //Расстроился из-за лудки в казике. Бахнул на баскет еще по лудке. СТОП ЛУДКЕ!
    { original: 1.23, real: 1.23, result: 'win', betSumRUR: 10000 }, //СТОП ЛУДКЕ!
    { original: 1.5, real: 1.5, result: 'lose', betSumRUR: 33000 } //СТОП ЛУДКЕ!
];
export default LogachevBig;

'use client';
import './styles.css';
import { VictoryChart, VictoryAxis, VictoryLine, VictoryTheme, VictoryPie, VictoryScatter } from 'victory';
import { useState, useEffect } from 'react';

const originalData = [
    { type: 'bet', value: 60, result: 27.88, coeffs: [1.9, 1.9] },
    { type: 'bet', value: 100, result: -100, coeffs: [1.9, 1.9] },
    { type: 'bet', value: 100, result: 125, coeffs: [1.9, 1.9] },
    { type: 'bet', value: 100, result: -100, coeffs: [1.9, 1.9] },
    { type: 'bet', value: 100, result: 215, coeffs: [1.9, 1.9] },
    { type: 'bet', value: 100, result: -100, coeffs: [1.9, 1.9] },
    { type: 'bet', value: 100, result: 157, coeffs: [1.9, 1.9] },
    { type: 'bet', value: 100, result: -100, coeffs: [1.9, 1.9] },
    { type: 'bet', value: 100, result: 275, coeffs: [1.9, 1.9] },
    { type: 'bet', value: 100, result: 210, coeffs: [1.9, 1.9] },
    { type: 'bet', value: 150, result: -150, coeffs: [1.9, 1.9] },
    { type: 'bet', value: 500, result: -500, coeffs: [1.9, 1.9] },
    { type: 'bet', value: 500, result: 474.7, coeffs: [1.9, 1.9] },
    { type: 'bet', value: 1000, result: 1380, coeffs: [1.9, 1.9] },
    { type: 'bet', value: 1000, result: 750, coeffs: [1.9, 1.9] },
    { type: 'bet', value: 1000, result: 820, coeffs: [1.9, 1.9] },
    { type: 'bet', value: 1000, result: 870, coeffs: [1.9, 1.9] },
    { type: 'bet', value: 1000, result: -1000, coeffs: [1.9, 1.9] },
    { type: 'bet', value: 1000, result: 1850, coeffs: [1.9, 1.9] },
    { type: 'bet', value: 1000, result: -1000, coeffs: [1.9, 1.9] },
    { type: 'bet', value: 1000, result: -1000, coeffs: [1.9, 1.9] },
    { type: 'bet', value: 1000, result: -1000, coeffs: [1.9, 1.9] },
    { type: 'freeBet', value: 50, profit: 290, coeffs: [1.9, 1.9] },
    { type: 'freeBet', value: 50, profit: 138, coeffs: [1.9, 1.9] },
    { type: 'freeBet', value: 50, profit: 0, coeffs: [1.9, 1.9] },
    { type: 'freeBet', value: 50, profit: 0, coeffs: [1.9, 1.9] },
    { type: 'freeBet', value: 100, profit: 142, coeffs: [1.9, 1.9] },
    { type: 'freeBet', value: 100, profit: 135, coeffs: [1.9, 1.9] },
    { type: 'freeBet', value: 150, profit: 0, coeffs: [1.9, 1.9] },
    { type: 'freeBet', value: 200, profit: 364, coeffs: [1.9, 1.9] },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [1.9, 1.9] },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [1.9, 1.9] },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [1.9, 1.9] },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [1.9, 1.9] },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [1.9, 1.9] },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [1.9, 1.9] },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [1.9, 1.9] },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [1.9, 1.9] },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [1.9, 1.9] },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [1.9, 1.9] },
    { type: 'freeBet', value: 1000, profit: 0, coeffs: [1.9, 1.9] },
    { type: 'freeBet', value: 1000, profit: 0, coeffs: [1.9, 1.9] },
    { type: 'freeBet', value: 1000, profit: 0, coeffs: [1.9, 1.9] },
    { type: 'fork', value: 360 },
    { type: 'bet', value: 3000, result: -3000, coeffs: [1.9, 1.9] },
    { type: 'bonus', value: 300 },
    //here after creation this doc
    { type: 'bet', value: 100, result: 135, coeffs: [1.87, 1.87] },
    { type: 'bet', value: 100, result: -100, coeffs: [4.4, 2.03, 3.0] },
    { type: 'bet', value: 500, result: -500, coeffs: [1.9, 1.9] },
    { type: 'freeBet', value: 100, profit: 0, coeffs: [3.4, 3.47, 2.25] },
    { type: 'freeBet', value: 100, profit: 0, coeffs: [3.4, 3.47, 2.25] },
    { type: 'bet', value: 2000, result: 4300, coeffs: [1.9, 1.9] },
    { type: 'bet', value: 100, result: -100, coeffs: [4.2, 1.19] },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [2.25, 1.6] },
    { type: 'freeBet', value: 2000, profit: 0, coeffs: [2.08, 1.7] },
    { type: 'freeBet', value: 100, profit: 130, coeffs: [2.3, 1.62] },
    { type: 'bet', value: 1000, result: -1000, coeffs: [2.26, 3.55, 3.35] },
    { type: 'freeBet', value: 1000, profit: 0, coeffs: [1.87, 1.87] },
    { type: 'bet', value: 1000, result: 1840, coeffs: [2.85, 1.37] },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [1.95, 1.75] },
    { type: 'bet', value: 1000, result: -1000, coeffs: [1.71, 2.0] },
    { type: 'bet', value: 1000, result: -1000, coeffs: [1.63, 2.13] },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [1.9, 1.9] },
    { type: 'fork', value: 300 },
    { type: 'bet', value: 1000, result: 800, coeffs: [1.9, 1.9] },
    { type: 'freeBet', value: 1000, profit: 0, coeffs: [1.9, 1.9] },
    { type: 'bet', value: 1000, result: -1000, coeffs: [4.6, 1.18] },
    { type: 'freeBet', value: 300, profit: 0, coeffs: [2.95, 1.4] },
    { type: 'bet', value: 100, result: -100, coeffs: [3.9, 18, 1.32] },
    { type: 'bet', value: 150, result: 102, coeffs: [1.87, 1.87] },
    { type: 'bet', value: 500, result: -500, coeffs: [1.99, 1.73] },
    { type: 'freeBet', value: 500, profit: 550, coeffs: [2.1, 1.72] },
    { type: 'bet', value: 1000, result: 900, coeffs: [1.9, 1.9] },
    { type: 'bet', value: 1000, result: 980, coeffs: [1.98, 1.79] },
    { type: 'freeBet', value: 500, profit: 680, coeffs: [2.36, 1.59] },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [1.71, 2.12] },
    { type: 'bet', value: 1000, result: 710, coeffs: [1.71, 2.12] },
    { type: 'freeBet', value: 1000, profit: 860, coeffs: [1.86, 4.3, 4.0] },
    { type: 'bet', value: 500, result: 445, coeffs: [1.89, 1.89] },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [1.91, 1.9] },
    { type: 'freeBet', value: 500, profit: 605, coeffs: [2.21, 1.58] },
    { type: 'bet', value: 500, result: 455, coeffs: [1.91, 1.9] },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [2.5, 1.56] },
    { type: 'bet', value: 1000, result: -1000, coeffs: [1.9, 1.9] },
    { type: 'freeBet', value: 500, profit: 375, coeffs: [1.75, 2.04] },
    { type: 'bet', value: 500, result: -500, coeffs: [1.89, 1.91] },
    { type: 'bet', value: 1000, result: -1000, coeffs: [2.18, 4.36, 2.88] },
    { type: 'bet', value: 3000, result: -3000, coeffs: [1.94, 1.94] },
    { type: 'bet', value: 3000, result: 2820, coeffs: [1.94, 1.94] },
    //Ниже ставка где кеф был только один(3.0) на "мбаппе забьет" у олимпа
    { type: 'bet', value: 200, result: 400, coeffs: [1.9, 1.9], realCoeff: 3.0 },
    { type: 'freeBet', value: 500, profit: 465, coeffs: [1.93, 1.88] },
    { type: 'bet', value: 1500, result: -1500, coeffs: [2.06, 3.45, 3.65] },
    //Ниже фрибет Димы 3000, частью профита поделился
    { type: 'freeBet', value: 3000, profit: 2880, coeffs: [1.94, 3.48, 4.51], outPay: 880 },
    { type: 'bet', value: 1000, result: 740, coeffs: [1.74, 2.1] },
    { type: 'freeBet', value: 1000, profit: 0, coeffs: [1.71, 2.13] },
    { type: 'freeBet', value: 1000, profit: 0, coeffs: [3.95, 3.8, 1.99] },
    { type: 'bet', value: 3000, result: -3000, coeffs: [1.92, 1.88] },
    { type: 'bet', value: 3000, result: 2880, coeffs: [1.96, 1.93] },
    //Ниже ставка где кеф был только один(3.4) на "нико уильямс забьет" у олимпа
    { type: 'bet', value: 200, result: -200, coeffs: [1.9, 1.9], realCoeff: 3.4 },
    { type: 'bet', value: 500, result: 470, coeffs: [1.94, 1.87] },
    { type: 'bet', value: 1500, result: 1455, coeffs: [1.97, 1.84] },
    { type: 'bet', value: 2000, result: -2000, coeffs: [1.99, 1.81] },
    { type: 'freeBet', value: 500, profit: 480, coeffs: [1.96, 1.84] },
    { type: 'bet', value: 1500, result: 1065, coeffs: [1.71, 3.88, 4.86] },
    { type: 'freeBet', value: 200, profit: 142, coeffs: [1.71, 3.88, 4.86] },
    { type: 'freeBet', value: 750, profit: 570, coeffs: [1.76, 2.06] },
    { type: 'freeBet', value: 750, profit: 540, coeffs: [1.72, 2.12] },
    { type: 'freeBet', value: 1500, profit: 1125, coeffs: [1.75, 2.07] },
    { type: 'freeBet', value: 3000, profit: 2250, coeffs: [1.75, 2.07] },
    { type: 'freeBet', value: 500, profit: 995, coeffs: [2.99, 1.39] },
    { type: 'bet', value: 2000, result: 3420, coeffs: [2.71, 1.46] },
    { type: 'bet', value: 3000, result: 5100, coeffs: [2.7, 1.47] },
    { type: 'freeBet', value: 750, profit: 787, coeffs: [2.05, 1.76] },
    { type: 'bet', value: 500, result: -500, coeffs: [1.69, 2.09], book: 'OlimpBet' },
    { type: 'bet', value: 500, result: -500, coeffs: [1.69, 2.09], book: 'OlimpBet' },
    { type: 'bet', value: 1000, result: 800, coeffs: [1.8, 1.92], book: 'BetBoom' },
    { type: 'bet', value: 2000, result: 2000, coeffs: [2.0, 1.74], book: 'BetBoom' },
    { type: 'freeBet', value: 3000, profit: 1560, coeffs: [1.52, 2.55], book: 'BetBoom' },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [2.5, 1.46], book: 'OlimpBet' },
    { type: 'bet', value: 1000, result: 2250, coeffs: [3.25, 1.42], book: 'Lion' },
    { type: 'freeBet', value: 1000, profit: 0, coeffs: [1.5, 26.0, 2.59], book: 'Winline' },
    { type: 'bet', value: 1000, result: 2300, coeffs: [1.71, 3.3, 4.5], book: 'Lion' },
    { type: 'freeBet', value: 1000, profit: 970, coeffs: [1.97, 1.88], book: 'Lion' },
    { type: 'bet', value: 500, result: -500, coeffs: [1.86, 1.95], book: 'OlimpBet' },
    { type: 'bet', value: 2000, result: -2000, coeffs: [1.93, 1.97], book: 'BetCity' },
    //Ниже фрибет Эдика 2000, частью профита планировал поделиться, поэтому такой рассчет (2000 / 2)
    { type: 'freeBet', value: 2000, profit: 0, coeffs: [1.93, 1.97], book: 'BetCity', outPay: 0 },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [1.98, 2.87, 4.66], book: 'OlimpBet' },
    { type: 'bet', value: 100, result: 800, coeffs: [9, 4.3, 1.45], book: 'MelBet' },
    { type: 'bet', value: 3000, result: 6660, coeffs: [3.22, 1.37], book: 'OlimpBet' },
    { type: 'freeBet', value: 1500, profit: 1980, coeffs: [2.32, 1.59], book: 'OlimpBet' },
    { type: 'freeBet', value: 500, profit: 500, coeffs: [1.75, 2.0], book: 'Lion' },
    { type: 'bet', value: 1000, result: -1000, coeffs: [1.75, 2.05], book: 'FonBet' },
    { type: 'freeBet', value: 75, profit: 0, coeffs: [1.75, 2.05], book: 'FonBet' },
    { type: 'bet', value: 100, result: 133, coeffs: [2.33, 3.2, 3.3], book: 'BetCity' },
    { type: 'freeBet', value: 500, profit: 460, coeffs: [1.92, 50.0, 1.92], book: 'FonBet' },
    { type: 'freeBet', value: 500, profit: 460, coeffs: [1.92, 50.0, 1.92], book: 'FonBet' },
    //От Никиты 1000 с промиком PGL первую не на кибер бахнул, но выиграл.
    //Частью профита поделился
    { type: 'bet', value: 1000, result: 920, coeffs: [1.92, 50.0, 1.92], book: 'FonBet', outPay: 460 },
    //От Никиты 1000 с промиком PGL. Частью профита поделился
    { type: 'bet', value: 1000, result: 1750, coeffs: [2.75, 1.4], book: 'FonBet', outPay: 875 },
    //500 дали Никите на колесе
    { type: 'freeBet', value: 500, profit: 0, coeffs: [1.9, 1.9], book: 'FonBet', outPay: 0 },
    { type: 'bet', value: 1000, result: 770, coeffs: [1.77, 2.01], book: 'Marathonbet' },
    { type: 'bet', value: 500, result: -500, coeffs: [2.05, 1.72], book: 'OlimpBet' },
    { type: 'freeBet', value: 1000, profit: 0, coeffs: [1.92, 50.0, 1.92], book: 'Marathonbet' },
    { type: 'bet', value: 1500, result: 990, coeffs: [1.66, 2.15], book: 'Lion' },
    { type: 'freeBet', value: 200, profit: 0, coeffs: [1.62, 2.3], book: 'FonBet' },
    { type: 'freeBet', value: 200, profit: 0, coeffs: [1.62, 2.3], book: 'FonBet' },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [3.0, 1.39], book: 'Lion' },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [2.79, 1.44], book: 'Winline' },
    { type: 'bet', value: 100, result: -100, coeffs: [5.0, 1.17], book: 'FonBet' },
    { type: 'bet', value: 100, result: -100, coeffs: [5.5, 1.14], book: 'LigaStavok' },
    { type: 'freeBet', value: 500, profit: 665, coeffs: [2.33, 1.54], book: 'OlimpBet' },
    { type: 'bet', value: 100, result: -100, coeffs: [3.05, 1.35], book: 'FonBet' },
    { type: 'bet', value: 900, result: 117, coeffs: [1.13, 5.09], book: 'LigaStavok' },
    { type: 'freeBet', value: 75, profit: 139, coeffs: [2.85, 1.37], book: 'FonBet' },
    { type: 'freeBet', value: 100, profit: 205, coeffs: [3.05, 1.33], book: 'LigaStavok' },
    { type: 'bet', value: 1000, result: -1000, coeffs: [2.12, 1.75], book: 'FonBet' },
    { type: 'freeBet', value: 500, profit: 725, coeffs: [2.45, 1.55], book: 'FonBet' },
    { type: 'bet', value: 1000, result: -1000, coeffs: [2.4, 1.53], book: 'FonBet' },
    { type: 'freeBet', value: 300, profit: 0, coeffs: [2.4, 1.5], book: 'FonBet' },
    //С этого момента уже пользовался подписками bet-hub
    { type: 'bet', value: 1000, result: 1130, coeffs: [2.13, 1.6], book: 'Marathonbet' },
    { type: 'freeBet', value: 1000, profit: 0, coeffs: [2.72, 1.46], book: 'Marathonbet' },
    //От Димы с фрибетом 5000 на деп 6000 бахнул, обсчитался немного поэтому минус ev вышло. Слишком много заплатил
    //outPay включено в result.
    { type: 'bet', value: 6000, result: 5220, coeffs: [1.87, 1.83], book: 'LigaStavok', outPay: 2620 },
    //Ниже фрибет Димы 5000, частью профита поделиля, поэтому такой рассчет (4000 / 1.42)
    { type: 'freeBet', value: 5000, profit: 7100, coeffs: [2.42, 3.6, 2.95], book: 'LigaStavok', outPay: 3100 },
    { type: 'bet', value: 500, result: 425, coeffs: [1.85, 1.95], book: 'OlimpBet' },
    { type: 'bet', value: 1000, result: 720, coeffs: [1.72, 2.12], book: 'FonBet' },
    { type: 'bet', value: 1000, result: -1000, coeffs: [1.4, 2.69], book: 'Marathonbet' },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [6.0, 3.85, 1.68], book: 'FonBet' },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [6.0, 3.85, 1.68], book: 'FonBet' },
    //Ниже ставка где кеф был только один(2.38) на cчет 0:3 у лиона
    { type: 'freeBet', value: 1000, profit: 0, coeffs: [1.9, 1.9], book: 'Lion' },
    { type: 'freeBet', value: 1000, profit: 680, coeffs: [1.68, 2.05], book: 'Marathonbet' },
    //Ниже у фона на кибере оказалась маржа 4.93% по кф 1.68/2.19
    { type: 'bet', value: 1000, result: -1000, coeffs: [1.68, 2.19], book: 'FonBet' },
    { type: 'bet', value: 1000, result: 1160, coeffs: [2.16, 1.71], book: 'Lion' },
    { type: 'bet', value: 500, result: -500, coeffs: [1.67, 2.13], book: 'FonBet' },
    { type: 'freeBet', value: 1000, profit: 0, coeffs: [2.12, 1.67], book: 'Lion' },
    { type: 'freeBet', value: 500, profit: 2150, coeffs: [5.3, 4.2, 1.65], book: 'FonBet' },
    { type: 'bet', value: 500, result: -500, coeffs: [1.8, 1.95], book: 'OlimpBet' },
    { type: 'bet', value: 50, result: -50, coeffs: [2.05, 1.7], book: 'Winline' },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [2.08, 1.7], book: 'OlimpBet' },
    { type: 'bet', value: 1000, result: -1000, coeffs: [1.6, 2.35], book: 'FonBet' },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [1.59, 2.36], book: 'FonBet' },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [1.59, 2.36], book: 'FonBet' },
    { type: 'bet', value: 500, result: -500, coeffs: [2.28, 1.58], book: 'OlimpBet' },
    { type: 'bet', value: 1000, result: 900, coeffs: [1.9, 1.9], book: 'Lion' },
    { type: 'freeBet', value: 500, profit: 450, coeffs: [1.9, 1.9], book: 'Lion' },
    { type: 'freeBet', value: 100, profit: 125, coeffs: [1.57, 2.25], book: 'FonBet' },
    { type: 'freeBet', value: 100, profit: 125, coeffs: [1.57, 2.25], book: 'FonBet' },
    { type: 'freeBet', value: 500, profit: 640, coeffs: [2.28, 1.63], book: 'OlimpBet' },
    { type: 'bet', value: 1000, result: -1000, coeffs: [3.15, 2.1, 3.95], book: 'FonBet' },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [2.4, 2.15, 6.0], book: 'FonBet' },
    { type: 'freeBet', value: 75, profit: 0, coeffs: [5.1, 2.1, 2.65], book: 'FonBet' },
    { type: 'freeBet', value: 250, profit: 0, coeffs: [1.2, 4.3], book: 'Lion' },
    { type: 'bet', value: 100, result: 360, coeffs: [1.2, 4.6], book: 'Lion' },
    { type: 'freeBet', value: 100, profit: 0, coeffs: [6.0, 1.11], book: 'FonBet' },
    { type: 'freeBet', value: 100, profit: 0, coeffs: [6.25, 1.1], book: 'FonBet' },
    { type: 'bet', value: 1000, result: 870, coeffs: [1.87, 1.93], book: 'FonBet' },
    { type: 'freeBet', value: 300, profit: 270, coeffs: [1.9, 1.9], book: 'FonBet' },
    { type: 'bet', value: 1000, result: -1000, coeffs: [1.75, 2.05], book: 'FonBet' },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [5.25, 1.16], book: 'FonBet' },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [5.25, 1.16], book: 'FonBet' },
    { type: 'bet', value: 500, result: -500, coeffs: [1.79, 2.08], book: 'OlimpBet' },
    { type: 'freeBet', value: 1000, profit: 890, coeffs: [1.89, 1.89], book: 'Lion' },
    { type: 'bet', value: 700, result: 364, coeffs: [2.37, 1.52], book: 'OlimpBet' },
    { type: 'bet', value: 500, result: 385, coeffs: [1.77, 2.02], book: 'OlimpBet' },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [2.04, 1.79], book: 'Lion' },
    //рассчитана возвратом. еще и фрибет за нее не дали, так как итоговый кеф=1np
    { type: 'bet', value: 1000, result: 0, coeffs: [2.08, 1.72], book: 'OlimpBet' },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [2.32, 1.59], book: 'OlimpBet' },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [2.27, 1.52], book: 'OlimpBet' },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [2.42, 1.54], book: 'OlimpBet' },
    { type: 'freeBet', value: 75, profit: 195, coeffs: [3.6, 3.45, 2.17], book: 'FonBet' },
    { type: 'bet', value: 1000, result: -1000, coeffs: [7.3, 2.6, 1.84], book: 'Lion' },
    { type: 'freeBet', value: 1000, profit: 0, coeffs: [2.9, 1.4], book: 'Lion' },
    { type: 'bet', value: 500, result: -500, coeffs: [1.4, 2.83], book: 'OlimpBet' },
    { type: 'freeBet', value: 1000, profit: 0, coeffs: [1.82, 3.42, 5.2], book: 'Lion' },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [2.43, 3.53, 2.86], book: 'OlimpBet' },
    //Ниже 3 экспресса
    { type: 'bet', value: 200, result: -200, coeffs: [1.9, 1.9], realCoeff: 3.69, book: 'OlimpBet' },
    { type: 'bet', value: 200, result: -200, coeffs: [1.9, 1.9], realCoeff: 3.74, book: 'OlimpBet' },
    { type: 'bet', value: 200, result: -200, coeffs: [1.9, 1.9], realCoeff: 3.55, book: 'OlimpBet' },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [1.6, 2.35], book: 'OlimpBet' },
    { type: 'bet', value: 500, result: 565, coeffs: [1.67, 2.13], book: 'OlimpBet' },
    { type: 'bet', value: 1000, result: -1000, coeffs: [2.33, 2.38, 3.4], book: 'Lion' },
    { type: 'bet', value: 500, result: -500, coeffs: [2.31, 3.35, 3.36], book: 'OlimpBet' },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [2.29, 3.33, 3.41], book: 'OlimpBet' },
    { type: 'freeBet', value: 1000, profit: 0, coeffs: [3.0, 1.42], book: 'Lion' },
    { type: 'bet', value: 1000, result: -1000, coeffs: [1.92, 1.87], book: 'OlimpBet' },
    { type: 'bet', value: 3000, result: 6810, coeffs: [3.11, 3.27, 2.45], book: 'Lion' },
    //рассчитали возвратом
    { type: 'bet', value: 1000, result: 0, coeffs: [1.81, 1.99], book: 'OlimpBet' },
    { type: 'bet', value: 500, result: 765, coeffs: [1.48, 2.53], book: 'OlimpBet' },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [3.38, 3.14, 2.3], book: 'OlimpBet' },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [3.38, 3.14, 2.3], book: 'OlimpBet' },
    { type: 'freeBet', value: 500, profit: 735, coeffs: [2.47, 1.47], book: 'OlimpBet' },
    { type: 'bet', value: 1000, result: 850, coeffs: [1.89, 1.85], book: 'FonBet' },
    { type: 'bet', value: 5200, result: -5200, coeffs: [1.55, 2.41], book: 'MelBet' },
    { type: 'freeBet', value: 2500, profit: 0, coeffs: [1.55, 2.41], book: 'MelBet' },
    { type: 'freeBet', value: 75, profit: 0, coeffs: [6.2, 1.9, 2.6], book: 'FonBet' },
    { type: 'freeBet', value: 300, profit: 0, coeffs: [6.2, 1.9, 2.6], book: 'FonBet' },
    { type: 'bet', value: 1000, result: -1000, coeffs: [1.8, 2.0], book: 'FonBet' },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [5.25, 1.16], book: 'FonBet' },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [6.0, 1.13], book: 'FonBet' },
    { type: 'bet', value: 1000, result: -1000, coeffs: [2.91, 2.84, 2.94], book: 'Lion' },
    { type: 'bet', value: 500, result: 920, coeffs: [2.84, 2.83, 2.91], book: 'OlimpBet' },
    { type: 'freeBet', value: 1000, profit: 0, coeffs: [1.7, 2.15], book: 'Lion' },
    { type: 'freeBet', value: 250, profit: 775, coeffs: [1.26, 4.1], book: 'Lion' },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [1.81, 1.99], book: 'OlimpBet' },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [1.13, 6.05], book: 'OlimpBet' },
    { type: 'freeBet', value: 75, profit: 0, coeffs: [1.08, 8.0], book: 'FonBet' },
    { type: 'freeBet', value: 75, profit: 60, coeffs: [1.8, 2.0], book: 'FonBet' },
    { type: 'bet', value: 125, result: 93.75, coeffs: [5.4, 3.54, 1.75], book: 'Lion' },
    { type: 'freeBet', value: 1000, profit: 0, coeffs: [1.92, 1.89], book: 'Lion' },
    { type: 'freeBet', value: 500, profit: 455, coeffs: [1.9, 1.91], book: 'OlimpBet' },
    { type: 'bet', value: 1000, result: -1000, coeffs: [1.76, 1.21, 1.38], book: 'Lion' },
    { type: 'freeBet', value: 200, profit: 190, coeffs: [1.75, 1.21, 1.95], book: 'MelBet' },
    { type: 'freeBet', value: 1000, profit: 1450, coeffs: [1.63, 2.45], book: 'Lion' },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [2.36, 1.55], book: 'OlimpBet' },
    { type: 'bet', value: 1000, result: -1000, coeffs: [1.14, 5.75], book: 'FonBet' },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [1.8, 2.0], book: 'FonBet' },
    //ниже 1 экспресс
    { type: 'bet', value: 1000, result: -1000, coeffs: [1.9, 1.9], realCoeff: 1.99, book: 'Lion' },
    { type: 'bet', value: 1000, result: 1550, coeffs: [1.65, 2.55, 9.25], book: 'Lion' },
    { type: 'freeBet', value: 1000, profit: 0, coeffs: [2.83, 1.46], book: 'Lion' },
    { type: 'bet', value: 1000, result: -1000, coeffs: [1.65, 2.0], book: 'Marathonbet' },
    { type: 'freeBet', value: 1000, profit: 0, coeffs: [1.3, 3.02], book: 'Marathonbet' },
    { type: 'freeBet', value: 100, profit: 0, coeffs: [1.11, 6.75], book: 'FonBet' },
    { type: 'freeBet', value: 100, profit: 0, coeffs: [1.16, 5.25], book: 'FonBet' },
    { type: 'bet', value: 1000, result: -1000, coeffs: [1.45, 2.63], book: 'FonBet' },
    { type: 'bet', value: 0, result: 0, coeffs: [5.25, 1.16], book: 'FonBet' },
    { type: 'bet', value: 1000, result: -1000, coeffs: [3.2, 1.3], book: 'FonBet' },
    { type: 'freeBet', value: 300, profit: 0, coeffs: [1.32, 3.4], book: 'FonBet' },
    { type: 'bet', value: 500, result: -500, coeffs: [2.53, 1.53], book: 'OlimpBet' },
    { type: 'freeBet', value: 400, profit: 0, coeffs: [2.4, 1.55], book: 'FonBet' },
    { type: 'bet', value: 1000, result: -1000, coeffs: [2.12, 1.64], book: 'Marathonbet' },
    { type: 'freeBet', value: 1000, profit: 1830, coeffs: [2.83, 1.43], book: 'Marathonbet' },
    { type: 'freeBet', value: 500, profit: 700, coeffs: [2.4, 1.45], book: 'OlimpBet' },
    { type: 'bet', value: 3000, result: -3000, coeffs: [2.56, 3.36, 2.88], book: 'Lion' },
    { type: 'freeBet', value: 1500, profit: 0, coeffs: [1.85, 1.85], book: 'FonBet' },
    { type: 'bet', value: 500, result: -500, coeffs: [2.41, 3.96, 2.65], book: 'OlimpBet' },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [1.44, 2.47], book: 'OlimpBet' },
    { type: 'bet', value: 1000, result: -1000, coeffs: [1.41, 2.58], book: 'Marathonbet' },
    { type: 'freeBet', value: 1000, profit: 0, coeffs: [3.48, 1.27], book: 'Marathonbet' },
    { type: 'bet', value: 500, result: -500, coeffs: [2.45, 1.54], book: 'OlimpBet' },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [2.47, 3.34, 2.52], book: 'OlimpBet' },
    { type: 'freeBet', value: 1000, profit: 0, coeffs: [1.72, 1.97], book: 'Lion' },
    { type: 'bet', value: 500, result: 770, coeffs: [1.45, 2.54], book: 'OlimpBet' },
    { type: 'freeBet', value: 500, profit: 585, coeffs: [2.17, 4.25, 2.75], book: 'OlimpBet' },
    { type: 'bet', value: 500, result: -500, coeffs: [2.6, 1.45], book: 'FonBet' },
    { type: 'bet', value: 500, result: -500, coeffs: [3.38, 1.24], book: 'Marathonbet' },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [2.91, 1.31], book: 'Marathonbet' },
    { type: 'freeBet', value: 1000, profit: 0, coeffs: [1.83, 1.88], book: 'Lion' },
    { type: 'bet', value: 500, result: 1200, coeffs: [3.4, 1.31], book: 'Lion' },
    { type: 'bet', value: 500, result: 450, coeffs: [1.9, 1.87], book: 'Lion' },
    { type: 'bet', value: 500, result: 485, coeffs: [1.25, 1.23, 1.97], book: 'OlimpBet' },
    { type: 'freeBet', value: 500, profit: 430, coeffs: [1.86, 1.86], book: 'OlimpBet' },
    { type: 'bet', value: 500, result: 375, coeffs: [4.71, 3.92, 1.75], book: 'OlimpBet' },
    { type: 'freeBet', value: 500, profit: 430, coeffs: [1.86, 1.86], book: 'OlimpBet' },
    { type: 'bet', value: 3000, result: 2520, coeffs: [1.86, 1.84], book: 'Lion' },
    //ниже 1 экспресс
    { type: 'bet', value: 500, result: -500, coeffs: [1.9, 1.9], realCoeff: 2.03, book: 'FonBet' },
    { type: 'freeBet', value: 500, profit: 535, coeffs: [1.67, 2.07], book: 'Lion' },
    { type: 'bet', value: 1000, result: -1000, coeffs: [2.45, 1.55], book: 'FonBet' },
    { type: 'freeBet', value: 500, profit: 650, coeffs: [2.3, 1.55], book: 'FonBet' },
    { type: 'freeBet', value: 500, profit: 650, coeffs: [2.3, 1.55], book: 'FonBet' },
    { type: 'bet', value: 1000, result: -1000, coeffs: [1.89, 1.85], book: 'FonBet' },
    { type: 'freeBet', value: 300, profit: 0, coeffs: [1.9, 1.8], book: 'FonBet' },
    { type: 'bet', value: 7000, result: -7000, coeffs: [1.9, 1.8], book: 'FonBet' }
].map((valueData) => {
    if (valueData.type === 'freeBet') {
        valueData.coeffs = valueData.coeffs.map((coef) => coef - 1);
    }
    return valueData;
});

//.filter(({ type, value }) => type === 'freeBet' && value>=500);
let summaryValue = 0;
let summaryEV = 0;
let summaryOutPays = 0;
let bets = 0;
let freeBets = 0;
let bonuses = 0;
let forks = 0;
const dataForEV = [{ x: 0, y: 0 }];
const dataForValue = [
    { x: 0, y: 0 },
    ...originalData.map(({ type, value, result, profit, coeffs, outPay }, i) => {
        if (type === 'bet') bets++;
        if (type === 'freeBet') freeBets++;
        if (type === 'bonus') bonuses++;
        if (type === 'fork') forks++;
        let margin;
        let equity;
        if (['bonus', 'fork'].includes(type)) {
            equity = 1;
        } else {
            let betEquity;
            if (coeffs.length === 2) {
                betEquity = (coeffs[0] * coeffs[1]) / (coeffs[0] + coeffs[1]);
            } else if (coeffs.length === 3) {
                betEquity =
                    (coeffs[0] * coeffs[1] * coeffs[2]) /
                    (coeffs[1] * coeffs[2] + coeffs[0] * coeffs[2] + coeffs[0] * coeffs[1]);
            } else throw 'wtf?!';

            if (type === 'bet') {
                margin = 1 - betEquity;
                equity = -margin;
            } else if (type === 'freeBet') {
                equity = betEquity;
            } else throw 'wtf?!';
        }
        let realProfit = profit;
        let realResult = result;
        let realValue = value;
        let realEquity = equity;
        if (outPay !== undefined) {
            summaryOutPays += outPay;
            if (outPay === 0) {
                if (type === 'freeBet' && profit === 0) {
                    //Не зашел фрибет, но были планы поделиться, поэтому считаю что проставил половину суммы
                    realValue = value / 2;
                }
            } else {
                if (type === 'freeBet') {
                    realValue = value / 2;
                    realProfit = profit - outPay;
                }
                if (type === 'bet') {
                    realResult = result - outPay;
                    realEquity = equity - outPay / (result + outPay);
                }
            }
        }
        const ev = realValue * realEquity;
        summaryEV += ev;
        if (type === 'freeBet') {
            summaryValue += realProfit;
        } else if (['bonus', 'fork'].includes(type)) {
            summaryValue += realValue;
        } else {
            summaryValue += realResult;
        }

        dataForEV.push({
            x: i + 1,
            y: summaryEV
        });
        return {
            x: i + 1,
            y: summaryValue
        };
    })
];
const desc = [
    { name: 'Фрибеты', value: freeBets },
    { name: 'Бонусы деньгами', value: bonuses },
    { name: 'Ставки своих денег', value: bets },
    { name: 'Вилки', value: forks }
];
export default function Main({}) {
    const [originalDataState, setOriginalData] = useState();

    useEffect(() => {
        setOriginalData(originalData);
    }, []);
    return (
        originalDataState && (
            <div className="flex flex-col w-full justify-between items-center">
                <header className="flex flex-col w-full items-center">Бонусхантинг</header>

                <main className="flex flex-col w-1/2 items-center">
                    <article className="flex flex-col items-center">
                        <div>
                            <VictoryChart theme={VictoryTheme.clean}>
                                <VictoryAxis dependentAxis />
                                <VictoryAxis />
                                {dataForValue.slice(0, -1).map((data, index) => {
                                    return (
                                        <VictoryLine
                                            key={index}
                                            data={[data, dataForValue[index + 1]]}
                                            style={{
                                                data: {
                                                    stroke: () => {
                                                        if (originalData[index].type === 'bet') {
                                                            return 'tomato';
                                                        } else if (originalData[index].type === 'freeBet') {
                                                            return '#2D7FF9';
                                                        } else if (originalData[index].type === 'bonus') {
                                                            return 'orange';
                                                        } else if (originalData[index].type === 'fork') {
                                                            return 'black';
                                                        } else {
                                                            return '#4CA515';
                                                        }
                                                    }
                                                }
                                            }}
                                            labels={({ datum }) => {
                                                return datum.x === dataForValue.length - 1
                                                    ? summaryValue.toFixed(2)
                                                    : null;
                                            }}
                                        />
                                    );
                                })}
                                <VictoryScatter
                                    data={dataForValue}
                                    size={2}
                                    style={{
                                        data: {
                                            fill: ({ datum }) => {
                                                const fullData = [{ type: undefined }, ...originalData];
                                                if (fullData[datum.x].type === 'bet') {
                                                    return 'tomato';
                                                } else if (fullData[datum.x].type === 'freeBet') {
                                                    return '#2D7FF9';
                                                } else if (fullData[datum.x].type === 'bonus') {
                                                    return 'orange';
                                                } else if (fullData[datum.x].type === 'fork') {
                                                    return 'black';
                                                } else {
                                                    return '#4CA515';
                                                }
                                            }
                                        }
                                    }}
                                />

                                <VictoryLine
                                    data={dataForEV}
                                    style={{
                                        data: {
                                            stroke: '#A36209'
                                        }
                                    }}
                                    labels={({ datum }) => {
                                        return datum.x === dataForEV.length - 1 ? summaryEV.toFixed(2) : null;
                                    }}
                                />
                                <VictoryScatter
                                    data={dataForEV}
                                    size={2}
                                    style={{
                                        data: {
                                            fill: '#A36209'
                                        }
                                    }}
                                />
                            </VictoryChart>
                            <VictoryPie
                                innerRadius={50}
                                padAngle={0}
                                data={desc.map(({ name, value }) => ({ x: `${name}: ${value}`, y: value }))}
                                colorScale={['#2D7FF9', 'orange', 'tomato', 'black']}
                                labels
                                labelIndicator
                                theme={VictoryTheme.clean}
                            />
                        </div>
                        <div>
                            <span className="tracking-tight text-border">
                                Итого ставок, фрибетов, бонусов и вилок:
                                <span className="font-bold"> {originalData.length}</span>
                            </span>
                        </div>
                        <div>
                            <span className="tracking-tight text-border">
                                Внешние выплаты помимо основного профита:
                                <span className="font-bold"> {summaryOutPays}</span>
                            </span>
                        </div>
                    </article>
                </main>
            </div>
        )
    );
}

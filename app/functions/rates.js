const gameRates = {
    singleAnk: 9.5,
    jodi: 95,
    singlePannel: 150,
    doublePannel: 290,
    triplePannel: 650,
    halfSangam: 1000,
    fullSangam: 10000,
}


export function winRates (value, game) {
    return value * gameRates[game];
}
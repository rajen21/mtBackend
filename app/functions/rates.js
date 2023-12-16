const gameRates = {
    singleAnk: 9.5,
    jodi: 95,
    singlePatti: 150,
    doublePatti: 290,
    triplePatti: 650,
    halfSangam: 1000,
    fullSangam: 10000,
}


export function winRates (value, game) {
    return value * gameRates[game];
}
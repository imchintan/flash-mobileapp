export const satoshiToFlash = (num) => {
    if (num == undefined || num === '') return;
    return parseFloat(num/10000000000).toString();
}

export const flashToUSD = (flash,usd) => {
    if (flash == undefined || flash === '') return;
    if (usd == undefined || usd === '') return;
    return (flash*usd/10000000000).toFixed(8);
}

export const flashToBTC = (flash,btc) => {
    if (flash == undefined || flash === '') return;
    if (btc == undefined || btc === '') return;
    return (flash*btc/10000000000).toFixed(8);
}

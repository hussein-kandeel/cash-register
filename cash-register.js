#!/usr/bin/env node
// The line above just for compiling the file to be standalone executable

function checkCashRegister(price, cash, cid) {
    // Money Subtractor function.
    function moneySubtractor(currency, available, need) {
        // take the verbosal value for the type of currency like: 'PENNY',
        // and how much available of it,
        // and how much needed from it.
        let amount = 0.00;
        switch (currency) {
            case "PENNY":
                while (amount < need) {
                    if (parseFloat((available - 0.01).toFixed(2)) >= 0 && parseFloat((amount + 0.01).toFixed(2)) <= need) {
                        amount = parseFloat((amount + 0.01).toFixed(2));
                        available = parseFloat((available - 0.01).toFixed(2));
                    } else {
                        break;
                    }
                }
                break;
            case "NICKEL":
                while (amount < need) {
                    if (parseFloat((available - 0.05).toFixed(2)) >= 0 && parseFloat((amount + 0.05).toFixed(2)) <= need) {
                        amount = parseFloat((amount + 0.05).toFixed(2));
                        available = parseFloat((available - 0.05).toFixed(2));
                    } else {
                        break;
                    }
                }
                break;
            case "DIME":
                while (amount < need) {
                    if (parseFloat((available - 0.1).toFixed(2)) >= 0 && parseFloat((amount + 0.1).toFixed(2)) <= need) {
                        amount = parseFloat((amount + 0.1).toFixed(2));
                        available = parseFloat((available - 0.1).toFixed(2));
                    } else {
                        break;
                    }
                }
                break;
            case "QUARTER":
                while (amount < need) {
                    if (parseFloat((available - 0.25).toFixed(2)) >= 0 && parseFloat((amount + 0.25).toFixed(2)) <= need) {
                        amount = parseFloat((amount + 0.25).toFixed(2));
                        available = parseFloat((available - 0.25).toFixed(2));
                    } else {
                        break;
                    }
                }
                break;
            case "ONE":
                while (amount < need) {
                    if ((available - 1) >= 0 && (amount + 1) <= need) {
                        amount += 1;
                        available -= 1;
                    } else {
                        break;
                    }
                }
                break;
            case "FIVE":
                while (amount < need) {
                    if ((available - 5) >= 0 && (amount + 5) <= need) {
                        amount += 5;
                        available -= 5;
                    } else {
                        break;
                    }
                }
                break;
            case "TEN":
                while (amount < need) {
                    if ((available - 10) >= 0 && (amount + 10) <= need) {
                        amount += 10;
                        available -= 10;
                    } else {
                        break;
                    }
                }
                break;
            case "TWENTY":
                while (amount < need) {
                    if ((available - 20) >= 0 && (amount + 20) <= need) {
                        amount += 20;
                        available -= 20;
                    } else {
                        break;
                    }
                }
                break;
            case "ONE HUNDRED":
                while (amount < need) {
                    if ((available - 100) >= 0 && (amount + 100) <= need) {
                        amount += 100;
                        available -= 100;
                    } else {
                        break;
                    }
                }
                break;
        }
        return amount;
    }
    // Make the result object.
    let result = {
        status: "",
        change: []
    };
    // Calculate the subtraction
    let needAmount = parseFloat((cash - price).toFixed(2));
    let chashInDrawer = 0.00;
    // Sum the chash in drawer
    let cidLen = cid.length;
    for (let i = 0; i < cidLen; i++) {
        chashInDrawer += cid[i][1];
    }
    if (chashInDrawer < needAmount) {
        result.status = "INSUFFICIENT_FUNDS";
        return result;
    } else if (chashInDrawer == needAmount) {
        result.change = cid;
        result.status = "CLOSED";
        return result;
    } else {
        // loop in the drawer from large currency to small.
        for (let i = cidLen - 1; i >= 0; i--) {
            // take the chash from every currency in the drawer as needed.
            let tempAmount = moneySubtractor(cid[i][0], cid[i][1], needAmount);
            let curren = cid[i][0];
            if (tempAmount != 0.00 && needAmount != 0){
                result.change.push([curren, tempAmount]);
                needAmount = parseFloat((needAmount - tempAmount).toFixed(2));
            }
            if (needAmount == 0) {
                break;
            }
        }
        if (needAmount > 0) {
            result.status = "INSUFFICIENT_FUNDS";
            result.change = [];
            return result;
        } else {
            result.status = "OPEN";
            return result;
        }
    }
}


console.log(`checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) should return {status: "OPEN", change: [["QUARTER", 0.5]]}.`);
console.log(`\nReturning... => `, checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
console.log(`\n \n `);

console.log(`checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) should return {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}.`);
console.log(`\nReturning... => `, checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
console.log(`\n \n `);

console.log(`checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) should return {status: "INSUFFICIENT_FUNDS", change: []}.`);
console.log(`\nReturning... => `, checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
console.log(`\n \n `);

console.log(`checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) should return {status: "INSUFFICIENT_FUNDS", change: []}.`);
console.log(`\nReturning... => `, checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
console.log(`\n \n `);

console.log(`checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) should return {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}.`);
console.log(`\nReturning... => `, checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
console.log(`\n \n `);



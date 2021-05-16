const _ = require("ramda");
const Box = require("./Box");

// Ex1: Using Box, refactor moneyToFloat to be unnested.
//
const moneyToFloat_ = (str) => parseFloat(str.replace(/\$/, ""));

const moneyToFloat = (str) =>
    Box(str).map(_.replace(/\$/, "")).fold(parseFloat);

console.log(moneyToFloat_("$123.45"), moneyToFloat("$123.45"));

// Ex2: Using Box, refactor percentToFloat to remove assignment
//
const percentToFloat_ = (str) => {
    const float = parseFloat(str.replace(/\%/, ""));
    return float * 0.01;
};

const percentToFloat = (str) =>
    Box(str)
        .map(_.replace(/\%/, ""))
        .map(parseFloat)
        .fold((num) => num * 0.01);

console.log(percentToFloat_("%123.4"), percentToFloat("%123.4"));

// Ex3: Using Box, refactor applyDiscount
// 
// PS: Here is the situation where monad can help.
const applyDiscount_ = (price, discount) => {
    const cents = moneyToFloat(price);
    const savings = percentToFloat(discount);
    return cents - cents * savings;
};

const applyDiscount = (price, discount) =>
    Box(moneyToFloat(price)).fold((cents) =>
        Box(percentToFloat(discount)).fold((savings) => cents - cents * savings)
    );

console.log(applyDiscount_("$5.00", "20%"), applyDiscount("$5.00", "20%"));

const _ = require("ramda");

const Box = require("./Box");

const nextCharForNumberString = (str) =>
    Box(str)
        .map((x) => x.trim())
        .map((trimmed) => parseInt(trimmed, 10))
        .map((number) => new Number(number + 1))
        .fold(String.fromCharCode);

const o1 = nextCharForNumberString("    64  ");
console.log(o1);

const listOfString = ["    64   ", "    65"];

const nextCharForNumberStringArray = _.map(nextCharForNumberString);
console.log(nextCharForNumberStringArray(listOfString));

const moment = require("moment");

//let date = moment();
// date.add(100, "year").subtract(9, "months");
// console.log(date.format("MMM Do YYYY"));

//12:34 pm

let someTimestamp = moment().valueOf();
console.log(someTimestamp);

var createdAt = 1234;
var date = moment(createdAt);
//console.log(date.format("HH:mm"));

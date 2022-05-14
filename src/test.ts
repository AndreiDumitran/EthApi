let minutesToAdd = 5;
let currentDate = new Date();
let futureDate = new Date(currentDate.getTime() + minutesToAdd * 60000);

console.log(futureDate);

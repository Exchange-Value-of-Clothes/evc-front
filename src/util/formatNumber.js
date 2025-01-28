function formatNumber(number){
let words = ["", "만", "억", "조"];
let numberArr = [];
let resultString = "";

number = Number(number) ? number : 0;

if(number === 0) {
return "";
}

for(let i = 0; number > 0 && i < words.length; i++) {
numberArr.push(Math.floor((number % Math.pow(10000, i + 1)) / Math.pow(10000, i)));
}

for(let i = numberArr.length - 1; i >= 0; i--) {
if(numberArr[i] > 0) {
resultString += numberArr[i] + words[i]
}
}

return resultString;
}

export default formatNumber;

const api = "https://api.exchangerate-api.com/v4/latest/USD";
  
// for selecting different controls
var search = document.querySelector(".searchBox");
var convert = document.querySelector(".convert");
var fromCurrecy = document.querySelector(".from");
var finalValue = document.querySelector(".finalValue");
var finalError = document.querySelector(".finalError");
var finalAmount = document.getElementById("finalAmount");
var error = document.getElementById("error");
var resultFrom;
var resultTo="USD";
var searchValue;
  
// Event when currency is changed
fromCurrecy.addEventListener('change', (event) => {
    resultFrom = `${event.target.value}`;
});
  
// Event when currency is changed

  
search.addEventListener('input', updateValue);
  
// function for updating value
function updateValue(e) {
    searchValue = e.target.value;
}
 
  
// when user clicks, it calls function getresults 
convert.addEventListener("click", getResults);
  
// function getresults
function getResults() {
    fetch(`${api}`)
        .then(currency => {
            return currency.json();
        }).then(displayResults);
}
  
// display results after convertion
function displayResults(currency) {
    let fromRate = currency.rates[resultFrom];
    let toRate = currency.rates[resultTo];
    let check = parseFloat(searchValue);
    
    finalValue.innerHTML = ((toRate / fromRate) * searchValue).toFixed(2);
    if(check==searchValue){
        finalAmount.style.display = "block";
        finalError.innerHTML=`Success Message`;
        error.style.display="block";
        finalError.style.color="green";
        setTimeout(()=>{
            error.style.display="none";
        },5000);
    }    
    else{
        finalError.innerHTML=`Failure Message`;
        finalError.style.color="red";
        finalAmount.style.display = "block";
        error.style.display="block";
        setTimeout(()=>{
            error.style.display="none";
        },5000);
    }
}
  
// when user click on reset button
function clearVal() {    
    window.location.reload();
    document.getElementsByClassName("finalValue").innerHTML = "";
};
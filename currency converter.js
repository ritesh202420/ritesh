const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("from button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg =  document.querySelector(".msg");

for (let select of dropdowns) {
  for (let CurrCode in CountryList) {
    let newOption = document.createElement("option");
    newOption.innerText = CurrCode;
    newOption.value = CurrCode;

    if (select.name === "from" && CurrCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && CurrCode === "INR") {
      newOption.selected = "selected";
    }

    select.append(newOption); 
  }
  select.addEventListener("change",(evt)=>{
    updateFlag(evt.target);
  })
}
const updateFlag = (element)=>{
    let CurrCode = element.value;
    let countrycode = CountryList[CurrCode];
    let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
     let img =element.parentElement.querySelector("img");
     img.src = newSrc;

};
btn.addEventListener("click",async(evt)=>{
    evt.parentDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    console.log(amtVal);
    if(amtVal === "" || amtVal <1){
        amtVal = 1;
        amount.value = "1"
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.Curr.value.toLowerCase()]
    console.log(rate)
    let finalAmount = amtVal*rate
    msg.innerText=`${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
})

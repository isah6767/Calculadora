const result = document.querySelector(".result")
const buttons = document.querySelectorAll(".buttons button")
let currentNumber = ""
let firstOperand = null
let operator = null
let restart = false

function updateResult(originClear = false){
result.innerText = originClear ? 0: currentNumber.replace(".",",")
}

function addDigit(digit){
    if(digit == "," && (currentNumber.includes(",") || !currentNumber))
        return;
    if(restart){
        currentNumber = digit
        restart = false
    } else{
        currentNumber += digit
    }

updateResult()

}

function setOperador(newOperator){
if(currentNumber){
    calculate()

    firstOperand = parseFloat(currentNumber.replace(",", "."))
    currentNumber = ""
}
operator = newOperator
}
function calculate() {
    if (operator == null || firstOperand == null) return;
    let secondOperand = parseFloat(currentNumber.replace(",", "."));
    let resultadovalue;

    switch (operator) {
        case "+":
            resultadovalue = firstOperand + secondOperand;
            break;
        case "-":
            resultadovalue = firstOperand - secondOperand;
            break;
        case "x":
            resultadovalue = firstOperand * secondOperand;
            break;
        case "÷":
            resultadovalue = firstOperand / secondOperand;
            break;
        default:
            return;
    }
    if (resultadovalue.toString().split(".")[1]?.length > 5) {
        currentNumber = parseFloat(resultadovalue.toFixed(5)).toString();
    } else {
        currentNumber = resultadovalue.toString()
    }
operator = null
firstOperand = null
restart = true
updateResult()

}

buttons.forEach((button) => {
    button.addEventListener("click", () =>{
    const buttonText = button.innerText
     if(/^[0-9,]+$/.test(buttonText)){
                addDigit(buttonText)
     } else if(["+", "-", "x","÷"].includes(buttonText)){
                setOperador(buttonText)
    } else if(buttonText == "="){
                calculate()
            }
    
        });
        
    });

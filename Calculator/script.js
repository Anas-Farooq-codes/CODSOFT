

// Select Elements
const inputElement = document.querySelector(".input");
const outputOperationElement = document.querySelector(".operation .value");
const outputResultElement = document.querySelector(".result .value");

// Some Constants
const OPERATORS = ["+", "-", "*", "/"];
const POWER = "POWER(",
  FACTORIAL = "FACTORIAL";
let data = {
  operation: [],
  formula: [],
};

// CALCULATOR BUTTONS
let calculator_buttons = [
  {
    name: "rad",
    symbol: "Rad",
    formula: false,
    type: "key",
  },
  {
    name: "deg",
    symbol: "Deg",
    formula: false,
    type: "key",
  },
  {
    name: "square-root",
    symbol: "√",
    formula: "Math.sqrt",
    type: "math_function",
  },
  {
    name: "square",
    symbol: "x²",
    formula: POWER,
    type: "math_function",
  },
  {
    name: "open-parenthesis",
    symbol: "(",
    formula: "(",
    type: "number",
  },
  {
    name: "close-parenthesis",
    symbol: ")",
    formula: ")",
    type: "number",
  },
  {
    name: "clear",
    symbol: "C",
    formula: false,
    type: "key",
  },
  {
    name: "delete",
    symbol: "⌫",
    formula: false,
    type: "key",
  },
  {
    name: "pi",
    symbol: "π",
    formula: "Math.PI",
    type: "number",
  },
  {
    name: "cos",
    symbol: "cos",
    formula: "trigo(Math.cos,",
    type: "trigo_function",
  },
  {
    name: "sin",
    symbol: "sin",
    formula: "trigo(Math.sin,",
    type: "trigo_function",
  },
  {
    name: "tan",
    symbol: "tan",
    formula: "trigo(Math.tan,",
    type: "trigo_function",
  },
  {
    name: "7",
    symbol: 7,
    formula: 7,
    type: "number",
  },
  {
    name: "8",
    symbol: 8,
    formula: 8,
    type: "number",
  },
  {
    name: "9",
    symbol: 9,
    formula: 9,
    type: "number",
  },
  {
    name: "division",
    symbol: "÷",
    formula: "/",
    type: "operator",
  },
  {
    name: "e",
    symbol: "e",
    formula: "Math.E",
    type: "number",
  },
  {
    name: "acos",
    symbol: "acos",
    formula: "inv_trigo(Math.acos,",
    type: "trigo_function",
  },
  {
    name: "asin",
    symbol: "asin",
    formula: "inv_trigo(Math.asin,",
    type: "trigo_function",
  },
  {
    name: "atan",
    symbol: "atan",
    formula: "inv_trigo(Math.atan,",
    type: "trigo_function",
  },
  {
    name: "4",
    symbol: 4,
    formula: 4,
    type: "number",
  },
  {
    name: "5",
    symbol: 5,
    formula: 5,
    type: "number",
  },
  {
    name: "6",
    symbol: 6,
    formula: 6,
    type: "number",
  },
  {
    name: "multiplication",
    symbol: "×",
    formula: "*",
    type: "operator",
  },
  {
    name: "factorial",
    symbol: "×!",
    formula: FACTORIAL,
    type: "math_function",
  },
  {
    name: "exp",
    symbol: "exp",
    formula: "Math.exp",
    type: "math_function",
  },
  {
    name: "ln",
    symbol: "ln",
    formula: "Math.log",
    type: "math_function",
  },
  {
    name: "log",
    symbol: "log",
    formula: "Math.log10",
    type: "math_function",
  },
  {
    name: "1",
    symbol: 1,
    formula: 1,
    type: "number",
  },
  {
    name: "2",
    symbol: 2,
    formula: 2,
    type: "number",
  },
  {
    name: "3",
    symbol: 3,
    formula: 3,
    type: "number",
  },
  {
    name: "subtraction",
    symbol: "–",
    formula: "-",
    type: "operator",
  },
  {
    name: "power",
    symbol: "x<span>y</span>",
    formula: POWER,
    type: "math_function",
  },
  {
    name: "ANS",
    symbol: "ANS",
    formula: "ans",
    type: "number",
  },
  {
    name: "percent",
    symbol: "%",
    formula: "/100",
    type: "number",
  },
  {
    name: "comma",
    symbol: ".",
    formula: ".",
    type: "number",
  },
  {
    name: "0",
    symbol: 0,
    formula: 0,
    type: "number",
  },
  {
    name: "calculate",
    symbol: "=",
    formula: "=",
    type: "calculate",
  },
  {
    name: "addition",
    symbol: "+",
    formula: "+",
    type: "operator",
  },
];


function createCalculatorButtons() {
  const buttons_per_row = 8;
  let added_buttons = 0;

  calculator_buttons.forEach((button) => {
    if (added_buttons % buttons_per_row == 0) {
      inputElement.innerHTML += `<div class="row"></div>`;
    }
    const row = document.querySelector(".row:last-child");
    row.innerHTML += `<button id="${button.name}">
        ${button.symbol}
        </button>`;

    added_buttons++;
  });
}
createCalculatorButtons();


// RAD AND DEG BUTTON

let radian = true;

const radianBtn = document.getElementById("rad")
const DegreeBtn = document.getElementById("deg")

radianBtn.classList.add("active-angle")

function angleToggler(){
    radianBtn.classList.toggle("active-angle");
    DegreeBtn.classList.toggle("active-angle");
}




// EVENT LISTENER

inputElement.addEventListener("click", (event) => {
  const targetButton = event.target;

  calculator_buttons.forEach((button) => {
    if (button.name == targetButton.id) calculator(button);
  });
});

// CALCULATOR
function calculator(button) {
  if (button.type == "operator") {
    data.operation.push(button.symbol);
    data.formula.push(button.formula);
  } else if (button.type == "number") {
    data.operation.push(button.symbol);
    data.formula.push(button.formula);
  } else if (button.type == "trigo_function") {
    data.operation.push(button.symbol + "(");
    data.formula.push(button.formula);
  } else if (button.type == "math_function") {
    let symbol, formula;
    if (button.name == "factorial") {
      symbol = "!";
      formula = button.formula;
      data.operation.push(symbol);
      data.formula.push(formula);
    } else if (button.name == "power") {
      symbol = "^(";
      formula = button.formula;
      data.operation.push(symbol);
      data.formula.push(formula);
    } else if (button.name == "square") {
      symbol = "^(";
      formula = button.formula;
      data.operation.push(symbol);
      data.formula.push(formula);
      data.operation.push("2)");
      data.formula.push("2)");
    } else {
      symbol = button.symbol + "(";
      formula = button.formula + "(";
      data.operation.push(symbol);
      data.formula.push(formula);
    }
  } else if (button.type == "key") {
    if (button.name == "clear") {
      data.operation = [];
      data.formula = [];
      updateOutputResult(0);
    } else if (button.name == "delete") {
      data.operation.pop();
      data.formula.pop();
    } else if (button.name == "rad") {
      radian = true;
      angleToggler();
    } else if (button.name == "deg") {
      radian = false;
      angleToggler();
    }
  } else if (button.type == "calculate") {
    let formula_str = data.formula.join("");

    // Fix multiplication of consecutive numbers in parentheses
    formula_str = formula_str.replace(/\)\(/g, ")*(");

  
    // FIX POWER AND FACTORIAL Error
// Search for power and factorial functions 

    let powerSearchResult = search(data.formula, POWER);
    let factorialSearchResult = search(data.formula, FACTORIAL);
    console.log(data.formula, powerSearchResult, factorialSearchResult);

// GET POWER BASE And Replace with the right formula

const bases = powerBaseGetter(data.formula, powerSearchResult);


bases.forEach(base => {
  let toReplace = base + POWER;
  let Replacement = "Math.pow(" + base + ",";

  formula_str = formula_str.replace(toReplace, Replacement)
})

// GET Factorial Number And Replace with the right formula

const NUMBERS = factorialNumberGetter(data.formula, factorialSearchResult)
NUMBERS.forEach( factorial => {
  formula_str = formula_str.replace(factorial.toReplace, factorial.Replacement)
})
// CALCULATE

    let result;

    try{
      result = eval(formula_str)
    }catch (error) {
      if (error instanceof SyntaxError){
        result = 'Syntax Error!'
        updateOutputResult(result);
        return;
      }
    }

    // Result Storage 

    ans = result;
    data.operation = [ result ];
    data.formula = [ result ];

    updateOutputResult(result);
    return;
  }

  updateOutputInformation(data.operation.join(""));
}

// factorial Number getter 

function factorialNumberGetter(formula,factorialSearchResult){
 let numbers = []; //Save all number in the same array 
 let factorialSequence = 0;

factorialSearchResult.forEach( factorial_index =>{
 let number = []; //current factorial number 

 let next_index = factorial_index + 1;
 let next_input = formula[next_index];

 if ( next_input == FACTORIAL) {
  factorialSequence += 1;
  return
 }


// IF THERE WAS A FACTORIAL SEQUENCE WE NEED TO GET THE INDEX OF VERY FIRST FACTORIAL FUNCTION 
 let firstFactorialIndex = factorial_index - factorialSequence;

//  THEN TO GET THE NUMBER RIGHT BEFORE IT 

let previousIndex = firstFactorialIndex -1;
let parenthesisCount = 0;

while (previousIndex >= 0){
  
  if( formula[previousIndex] == "(") parenthesisCount--;
  if( formula[previousIndex] == ")") parenthesisCount++;

  let isOperator = false;      
  OPERATORS.forEach( OPERATOR => {
   if (formula[previousIndex] == OPERATOR ) isOperator = true;
  });


  if( isOperator && parenthesisCount == 0) break;

  number.unshift( formula [previousIndex]);
  previousIndex--;
}

let number_str = number.join("");
const factorial = "factorial(", closeParenthesis = ")"

let times = factorialSequence + 1;

let toReplace = number_str + FACTORIAL.repeat(times);
let Replacement = factorial.repeat(times) + number_str + closeParenthesis.repeat(times);

numbers.push({
  toReplace : toReplace,
  Replacement : Replacement
})

// RESET FACTORIAL SEQUENCE  

factorialSequence = 0;
})

return numbers;
}
  



// POWER BASE GETTER 

function powerBaseGetter(formula, powerSearchResult){
    let powerBases = []; // Save all bases in the same array 

powerSearchResult.forEach(power_index => {
  let base = []  //current base

  let parenthesisCount = 0;

  let previousIndex = power_index - 1;

  while (previousIndex >= 0){
  
     if( formula[previousIndex] == "(") parenthesisCount--;
     if( formula[previousIndex] == ")") parenthesisCount++;

     let isOperator = false;      
     OPERATORS.forEach( OPERATOR => {
      if (formula[previousIndex] == OPERATOR ) isOperator = true;
     });

     let isPower = formula[previousIndex] == POWER;

     if( (isOperator && parenthesisCount == 0) || isPower) break;

     base.unshift( formula [previousIndex]);
     previousIndex--;
  }
  powerBases.push( base.join(""));
})

return powerBases;

}

// Search an array 

function search( array, keyword) {

let searchResult = [];

array.forEach( (element, index) => {
  if( element == keyword ) searchResult.push(index);
})

return searchResult

}

// UPDATE OUTPUT

function updateOutputInformation(operation) {
  outputOperationElement.innerHTML = operation;
}
function updateOutputResult(result) {
  outputResultElement.innerHTML = result;
}

// FACTORIAL FUNCTION 

function factorial (number) {
    if (number %1 !=0 ) return gamma(number + 1);
    if ( number === 0  || number === 1 ) return 1;

    let result = 1;
    for ( let i=1; i <= number; i++) {
        result *=i;
        if(result === Infinity) return Infinity
    }
    return result;
}

// GAMMA FUNCTION
function gamma(n) {
  // accurate to about 15 decimal places

  var g = 7,
    p = [
      0.99999999999980993, 676.5203681218851, -1259.1392167224028,
      771.32342877765313, -176.61502916214059, 12.507343278686905,
      -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7,
    ];
  if (n < 0.5) {
    return Math.PI / Math.sin(n * Math.PI) / gamma(1 - n);
  } else {
    n--;
    var x = p[0];
    for (var i = 1; i < g + 2; i++) {
      x += p[i] / (n + i);
    }
    var t = n + g + 0.5;
    return Math.sqrt(2 * Math.PI) * Math.pow(t, n + 0.5) * Math.exp(-t) * x;
  }
}



// TRIGNOMETRIC Functions

function trigo(callback, angle) {
  if (!radian) {
      angle = angle * Math.PI / 180;
  }

  // Handle special cases for sine, cosine, and tangent
  if (callback === Math.sin && (angle === 0 || angle === Math.PI || angle === 2 * Math.PI)) {
      return 0;
  } else if (callback === Math.cos && (angle === Math.PI / 2 || angle === (3 * Math.PI) / 2)) {
      return 0;
  } else if (callback === Math.tan && (angle === Math.PI || angle === 0 || angle === 2 * Math.PI)) {
      return 0;
  }

  return callback(angle);
}

function inv_trigo(callback, value) {
  // Handle special cases for sine and cosine
  if (callback === Math.asin && value === 1) {
      return 90;
  } else if (callback === Math.acos && value === 1) {
      return 0;
  } else if (callback === Math.acos && value === -1) {
      return 180;
  } else if (callback === Math.asin && value === -1) {
      return -90;
  }

  let angle = callback(value);

  if (!radian) {
      angle = angle * 180 / Math.PI;
  }

  return angle;
}

let operators = ["+", "-", "*"];
const startBtn = document.getElementById("start-btn");
const question = document.getElementById("question");
const controls = document.querySelector(".controls-container");
const result = document.getElementById("result");
const submitBtn = document.getElementById("submit-btn");
const errorMessage = document.getElementById("error-msg");
let answerValue;
let operatorQuestion;
let score = 0;


const randomValue = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const questionGenerator = () => {
  
  let [num1, num2] = [randomValue(1, 20), randomValue(1, 20)];

  
  let randomOperator = operators[Math.floor(Math.random() * operators.length)];

  if (randomOperator == "-" && num2 > num1) {
    [num1, num2] = [num2, num1];
  }

  
  let solution = eval(`${num1}${randomOperator}${num2}`);

  
  let randomVar = randomValue(1, 5);

  if (randomVar == 1) {
    answerValue = num1;
    question.innerHTML = `<input type="number" id="inputValue" placeholder="?"\> ${randomOperator} ${num2} = ${solution}`;
  } else if (randomVar == 2) {
    answerValue = num2;
    question.innerHTML = `${num1} ${randomOperator}<input type="number" id="inputValue" placeholder="?"\> = ${solution}`;
  } else if (randomVar == 3) {
    answerValue = randomOperator;
    operatorQuestion = true;
    question.innerHTML = `${num1} <input type="text" id="inputValue" placeholder="?"\> ${num2} = ${solution}`;
  } else {
    answerValue = solution;
    question.innerHTML = `${num1} ${randomOperator} ${num2} = <input type="number" id="inputValue" placeholder="?"\>`;
  }
};



// Attach a single submit handler (avoids adding multiple listeners)
submitBtn.addEventListener("click", () => {
  errorMessage.classList.add("hide");
  const inputEl = document.getElementById("inputValue");
  if (!inputEl) {
    errorMessage.classList.remove("hide");
    errorMessage.innerHTML = "පිළිතුර ලබා දී තහවුරු කරන්න​​";
    return;
  }
  const userInput = inputEl.value;
  if (userInput === null || userInput === undefined || String(userInput).trim() === "") {
    errorMessage.classList.remove("hide");
    errorMessage.innerHTML = "පිළිතුර ලබා දී තහවුරු කරන්න​​";
    return;
  }

  if (operatorQuestion) {
    if (userInput === answerValue) {
      // correct operator answer: award 1 point
      score += 1;
      updateScoreDisplay();
      stopGame(`නියමයි!! <span>උත්තරය</span> හරි`);
    } else if (!operators.includes(userInput)) {
      errorMessage.classList.remove("hide");
      errorMessage.innerHTML = "පිළිතුර නැවත පරීක්ෂා කරන්න​";
    } else {
      stopGame(`අපොයි!! <span>වැරදියි​</span> නේද උත්තරය​?`);
    }
  } else {
    // numeric comparison: use loose equality to accept string numbers
    if (userInput == answerValue) {
      // correct numeric answer: award 1 point
      score += 1;
      updateScoreDisplay();
      stopGame(`නියමයි!! <span>උත්තරය</span> හරි`);
    } else {
      stopGame(`අපොයි!! <span>වැරදියි​</span> නේද උත්තරය​?`);
    }
  }
});


startBtn.addEventListener("click", () => {
  operatorQuestion = false;
  answerValue = "";
  errorMessage.innerHTML = "";
  errorMessage.classList.add("hide");
  

  controls.classList.add("hide");
  startBtn.classList.add("hide");
  questionGenerator();
});


const stopGame = (resultText) => {
  result.innerHTML = resultText;
  startBtn.innerText = "ඉදිරියට​";
  controls.classList.remove("hide");
  startBtn.classList.remove("hide");
};

function updateScoreDisplay() {
  const el = document.getElementById("score");
  if (!el) return;
  el.textContent = `Points: ${score}`;
}

// init score display
updateScoreDisplay();

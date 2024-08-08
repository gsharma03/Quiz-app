
let questions;

const questionElement = document.getElementById("question");

const ansBtn = document.getElementById("ansBtn");

const nextBtn = document.getElementById("nextBtn");

let currentQuestionIndex = 0;
let score = 0;

async function startQuiz() {
  const data = await fetch("https://quizapi.io/api/v1/questions?apiKey=vpW4zdI1T4LrxzXJZP2r2zmyGngQAieI1Y05yK9S&difficulty=Easy&category=code&limit=5")
  questions = await data.json();
  console.log(questions);
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerText = `${questionNo}. ${currQuestion.question}`;

  for(key in currQuestion.answers){
    if(currQuestion.answers[key] != null){
      const button = document.createElement("button");
      button.innerText = currQuestion.answers[key];
      button.classList.add("btn");
      ansBtn.appendChild(button);
      correctKey = `${key}_correct`;
      console.log(correctKey);
      button.dataset.correct = currQuestion.correct_answers[correctKey];
      button.addEventListener("click", selectAnswer)
    }
  }

}

function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
  }
  else{
    selectedBtn.classList.add("incorrect");
  }
  Array.from(ansBtn.children).forEach(button => {
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextBtn.style.display = "block";
}

function resetState() {
  nextBtn.style.display = "none";
  while (ansBtn.firstChild) {
    ansBtn.removeChild(ansBtn.firstChild);
  }
}

function showScore(){
  resetState();
  questionElement.innerHTML = `YOUR SCORED <span>${score}</span> OUT OF ${questions.length}`;
  nextBtn.innerHTML = "Try Again";
  nextBtn.style.display = "block";
}

function handleNextBtn(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }
  else{
    showScore();
  }
}

nextBtn.addEventListener("click", (e) => {
  if(currentQuestionIndex < questions.length){
    handleNextBtn();
  }
  else{
    startQuiz();
  }
})


startQuiz();
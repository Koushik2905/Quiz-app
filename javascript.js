const questions =[
    {
        questions: "who is first captain for India to win world cup?",
        answers:[
            {text: "Kapil Dev", correct: true},
            {text: "Rohit sharma", correct: false},
            {text: "Virat kohli", correct: false},
            {text: "Ms Dhoni", correct: false},
        ]
    },
    {
            questions: "which team is the winner of 3rd world cup?",
            answers:[
                {text: "West Indies", correct: false},
                {text: "Australia", correct: false},
                {text: "India", correct: true},
                {text: "Afganisthan", correct: false},
            ]
    },
    {
        
            questions: "who is the coolest captain in cricket?",
            answers:[
                {text: "Anil Kumble", correct: false},
                {text: "Ms Dhoni", correct: true},
                {text: "Virat kohli", correct: false},
                {text: "Jos Buttler", correct: false},
            ]
        
    },
    {
        questions: "which team has won world cup in their own country?",
        answers:[
            {text: "Australia", correct: false},
            {text: "West Indies", correct: false},
            {text: "NewZealand", correct: false},
            {text: "India", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score=0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.questions;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer);

    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);

    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const  isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = 'You scored ${score} out of ${questions.length}';
    nextButton.innerHTML = "Play again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});
startQuiz();
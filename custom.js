document.addEventListener('DOMContentLoaded', () => {
    nextButton.classList.add('hide');
});

const audio = document.getElementById("my_audio");
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const quizAppElement = document.getElementById('quiz-app');
const resultsElement = document.createElement('div');
resultsElement.setAttribute('id', 'results');
resultsElement.classList.add('results', 'hide');
quizAppElement.appendChild(resultsElement);

let shuffledQuestions;
let score = 0;

startButton.addEventListener('click', startGame);

nextButton.addEventListener('click', () => {
    setNextQuestion();
});

function startGame() {    
    // Audio       
    audio.play();

    startButton.classList.add('hide');
    shuffledQuestions = [...questions].sort(() => Math.random() - .5);
    score = 0; // Reset score
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    const nextQuestion = shuffledQuestions.pop();  // Use pop to get and remove the last question
    if (nextQuestion) {
        showQuestion(nextQuestion);
    } else {
        concludeQuiz();
    }
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('button');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    if (correct) {
        score++;
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
        button.disabled = true;
    });

    if (shuffledQuestions.length > 0) {
        nextButton.classList.remove('hide');
    } else {
        concludeQuiz();
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function concludeQuiz() {
    questionContainerElement.classList.add('hide');
    nextButton.classList.add('hide');
    resultsElement.classList.remove('hide');
        
    resultsElement.innerHTML = `
        <div class="resultdeclare">
        <h2>Quiz Completed!</h2>
        <p>Your score: ${score} out of ${questions.length}</p>
        <button class="button" onclick="restartQuiz()">Restart Quiz</button>
        <div>
    `;
        // List all questions with only the correct answers
        const correctAnswersList = questions.map(question => {
            const correctAnswers = question.answers
                .filter(answer => answer.correct) // Filter out only correct answers
                .map(answer => `${answer.text}`) // Map to HTML list items
                .join(''); // Join all list items into a single string
            
            if (correctAnswers) {
                return `<h3>${question.question}</h3><p>Correct Ans: ${correctAnswers}`;
            } else {
                return ''; // If no correct answers, return an empty string
            }
        }).filter(questionHtml => questionHtml) // Remove empty strings
        .join(''); // Join all question HTML into a single string
    
        // Append the correct answers to the results element
        resultsElement.innerHTML += `
            <div class="correctans">
            <h3 style='color:#76cb3f'>All the Questions with its Answers:</h3>            
            ${correctAnswersList}
            </div>
        `;
    // Audio       
    audio.pause();
}

function restartQuiz() {
    resultsElement.classList.add('hide');
    shuffledQuestions = [...questions].sort(() => Math.random() - .5);
    score = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
        // Audio       
        audio.play();
}

// Array of questions involving operators and data types
const questions = [
    {
        question: "What is the result of 5 + '5'?",
        answers: [
            { text: "10", correct: false },
            { text: "'55'", correct: true },
            { text: "NaN", correct: false },
            { text: "undefined", correct: false }
        ]
    },
    {
        question: "What is the result of 10 % 3?",
        answers: [
            { text: "0", correct: false },
            { text: "3", correct: false },
            { text: "1", correct: true },
            { text: "10", correct: false }
        ]
    },
    {
        question: "What does the expression typeof ({} + []) return?",
        answers: [
            { text: "'object'", correct: false },
            { text: "'array'", correct: false },
            { text: "'string'", correct: true },
            { text: "'undefined'", correct: false }
        ]
    },
    {
        question: "What happens when you use '++' on a number?",
        answers: [
            { text: "Increases the number by 1", correct: true },
            { text: "Decreases the number by 1", correct: false },
            { text: "Multiplies the number by 2", correct: false },
            { text: "Divides the number by 2", correct: false }
        ]
    },
    {
        question: "What is the result of the following operation: 10 += 2 * 3?",
        answers: [
            { text: "16", correct: true },
            { text: "20", correct: false },
            { text: "18", correct: false },
            { text: "12", correct: false }
        ]
    },
    {
        question: "What does the 'typeof' operator return for an array?",
        answers: [
            { text: "'array'", correct: false },
            { text: "'object'", correct: true },
            { text: "'function'", correct: false },
            { text: "'string'", correct: false }
        ]
    },
    {
        question: "What is the result of 'true' + 1?",
        answers: [
            { text: "'true1'", correct: false },
            { text: "NaN", correct: false },
            { text: "2", correct: true },
            { text: "'true'", correct: false }
        ]
    },
    {
        question: "What does the expression false + 5 evaluate to?",
        answers: [
            { text: "false5", correct: false },
            { text: "5", correct: true },
            { text: "NaN", correct: false },
            { text: "undefined", correct: false }
        ]
    }
];

// Push
questions.push({
    question: "What is the result of 'null + 1'?",
    answers: [
        { text: "null", correct: false },
        { text: "1", correct: true },
        { text: "NaN", correct: false },
        { text: "unndefined", correct: false }
    ]
});

// Splice
questions.splice(8,0,{
    question: "What is the result of '5' - 2?",
    answers: [
        { text: "7", correct: true },
        { text: "3", correct: false },
        { text: "NaN", correct: false },
        { text: "52", correct: false }
    ]
});


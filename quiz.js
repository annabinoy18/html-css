const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');

const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions, currentQuestionIndex;
let quizScore = 0;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
    quizScore = 0;
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
    }
    if (correct) {
        quizScore++;
    }
    document.getElementById('right-answer').innerText = quizScore;
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

const questions = [
    {
        question: 'The motto of NSS?',
        answers: [
            { text: 'Unity & Discipline', correct: false },
            { text: 'Empower you and youth', correct: false },
            { text: 'Not me,but you', correct: true },
            { text: 'The best job is often the toughest', correct: false }
        ]
    },
    {
        question: 'Which of the following is a type of operating system?',
        answers: [
            { text: 'Compiler', correct: false },
            { text: 'Spreadsheet', correct: false },
            { text: 'Windows', correct: true },
            { text: 'Database', correct: false }
        ]
    },
    {
        question: 'Which programming language is most commonly used for scripting in Unity game development?',
        answers: [
            { text: 'C++', correct: false },
            { text: 'C#', correct: true },
            { text: 'JavaScript', correct: false },
            { text: 'Python', correct: false },
        ]   
    },
    {
        question: 'What does GUI stand for?',
        answers: [
            { text: 'General User Interface', correct: false },
            { text: 'Guided User Integration', correct: false },
            { text: 'Generic User Interface', correct: false },
            { text: 'Graphical User Interface', correct: true },
        ]   
    },
    {
        question: 'What is the sum of the interior angles of a triangle?',
        answers: [
            { text: '180 degree', correct: true },
            { text: '90 degree', correct: false },
            { text: '360 degree', correct: false },
            { text: '270 degree', correct: false },
        ]   
    }
];

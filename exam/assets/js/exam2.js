const NavTabs = document.querySelector('#nav-tabs');
const questionContainer = document.querySelector('#question-container');
const questionNavigation = document.querySelector('.question-navigation');
let QuestionType = '';
let questionsByType = {};
let currentQuestionIndex = 0;
let currentQuestions = [];
let userAnswers = {}; 
let score = 0; // To track the score
// Track visited questions
let visitedQuestions = {};
// Function to load questions based on exam type
function loadQuestions(eType) {
    let questions = [];
    if (eType === 'basic') {
        questions = basicExam;
    } else if (eType === 'accounts') {
        questions = accountsExam;
    } else if (eType === 'coding') {
        questions = codingExam;
    }

    questions.forEach(question => {
        let groupQuest = question.type;
        if (!questionsByType[groupQuest]) {
            questionsByType[groupQuest] = [];
        }
        questionsByType[groupQuest].push(question);
    });

    createTypeButtons(questionsByType);
    initializeExam();
    startTimer();
}

// Function to create buttons for each question type
function createTypeButtons(questionTypes) {
    NavTabs.innerHTML = '';
    const typesArray = Object.keys(questionTypes);
    let currentActiveButton = null;

    typesArray.forEach((type, index) => {
        const button = document.createElement('button');
        button.innerText = type;
        button.classList.add('tab');
        button.setAttribute('id', type);

        if (index === 0) {
            button.classList.add('active');
            currentActiveButton = button;
            setSubtype(type, questionTypes);
        }

        button.addEventListener('click', function () {
            if (currentActiveButton !== button) {
                currentActiveButton.classList.remove('active');
                button.classList.add('active');
                currentActiveButton = button;
                setSubtype(type, questionTypes);
            }
        });

        NavTabs.appendChild(button);
    });
}

// Function to set the current subtype
function setSubtype(subtype, questionTypes) {
    QuestionType = subtype;
    currentQuestions = questionTypes[subtype];
    currentQuestionIndex = 0;
    initializeExam();
}

// Function to initialize exam and display questions
function initializeExam() {
    generateQuestionNumbers();  // Generate question numbers in the navigation
    displayQuestion();
}

// Modified displayQuestion function to check skipped questions dynamically
function displayQuestion() {
    questionContainer.innerHTML = '';
    const question = currentQuestions[currentQuestionIndex];

    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question-block');

    const questionText = document.createElement('h3');
    questionText.innerText = `${currentQuestionIndex + 1}. ${question.question}`;
    questionDiv.appendChild(questionText);

    const optionsContainer = document.createElement('form');
    question.options.forEach(option => {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `answer-${currentQuestionIndex}`;
        input.value = option;

        // Pre-check user's previous answer if available
        if (userAnswers[QuestionType] && userAnswers[QuestionType][0] && userAnswers[QuestionType][0][currentQuestionIndex] === option) {
            input.checked = true;
        }

        input.addEventListener('change', function () {
            if (!userAnswers[QuestionType]) {
                userAnswers[QuestionType] = [{}];
            }

            // Store the user's answer
            userAnswers[QuestionType][0][currentQuestionIndex] = this.value;

            // Mark the question as answered and update the navigation
            updateQuestionNavigation();

            // Check the answer when the user selects an option
            if (checkAnswer(QuestionType, question.question, this.value)) {
                score++; // Increment score if correct
            }
        });

        label.appendChild(input);
        label.appendChild(document.createTextNode(option));
        optionsContainer.appendChild(label);
        optionsContainer.appendChild(document.createElement('br'));
    });

    questionDiv.appendChild(optionsContainer);
    questionContainer.appendChild(questionDiv);

    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('actions');

    const preButton = document.createElement('button');
    preButton.id = 'pre';
    preButton.classList.add('btn-review');
    preButton.innerText = 'Previous';

    const nextButton = document.createElement('button');
    nextButton.id = 'nex';
    nextButton.classList.add('btn-review');
    nextButton.innerText = 'Next';

    actionsDiv.appendChild(preButton);
    actionsDiv.appendChild(nextButton);
    questionContainer.appendChild(actionsDiv);

    document.getElementById('pre').addEventListener('click', function (e) {
        e.preventDefault();
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            displayQuestion();
        }
    });

    document.getElementById('nex').addEventListener('click', function (e) {
        e.preventDefault();
        if (currentQuestionIndex < currentQuestions.length - 1) {
            currentQuestionIndex++;
            displayQuestion();
        }
    });
}

// Function to generate question numbers dynamically
function generateQuestionNumbers() {
    questionNavigation.innerHTML = ''; // Clear existing question numbers

    currentQuestions.forEach((_, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question-number', 'status');
        questionDiv.textContent = index + 1; // Question number

        // Add event listener to navigate to the clicked question
        questionDiv.addEventListener('click', function () {
            currentQuestionIndex = index; // Navigate to the clicked question
            displayQuestion();
        });

        questionNavigation.appendChild(questionDiv);
    });

    updateQuestionNavigation();  // Call this to update the classes for answered/not-answered
}

// Function to update question navigation after answering or skipping questions
function updateQuestionNavigation() {
    const questionNumbers = document.querySelectorAll('.question-navigation .question-number');
    questionNumbers.forEach((questionNumber, index) => {
        if (userAnswers[QuestionType] && userAnswers[QuestionType][0] && userAnswers[QuestionType][0][index]) {
            questionNumber.classList.add('answered'); // Mark as answered if answered
            questionNumber.classList.remove('not-answered'); // Remove not-answered if answered
        } else {
            questionNumber.classList.add('not-answered'); // Mark as not-answered if no answer
        }
    });
}


// Function to check if the user's answer is correct
function checkAnswer(type, questionText, givenAnswer) {
    const questions = questionsByType[type];

    for (let i = 0; i < questions.length; i++) {
        if (questions[i].question === questionText) {
            if (questions[i].answer === givenAnswer) {
                return true;
            } else {
                return false;
            }
        }
    }
    return false;
}

// Submit button event listener
document.getElementById('SubmitButton').addEventListener('click', function () {
    ShowResult(score)
});




let countdownTimer,
    totalSeconds = 3600, // 1 hour = 3600 seconds
    remainingTime = totalSeconds; // Initialize remaining time

function startTimer() {
    countdownTimer = setInterval(updateTimer, 1000); // Run the timer every second
}

function updateTimer() {
    if (remainingTime > 0) {
        remainingTime--;

        // Calculate minutes and seconds
        let mins = Math.floor(remainingTime / 60);
        let secs = remainingTime % 60;

        // Pad the minutes and seconds with leading zeros if needed
        let formattedMins = mins < 10 ? "0" + mins : mins;
        let formattedSecs = secs < 10 ? "0" + secs : secs;

        // Display the remaining time in the ".timePlease" element
        document.querySelector('.timePlease').innerText = `${formattedMins}:${formattedSecs}`;
    } else {
        clearInterval(countdownTimer); // Stop the timer when it reaches 0
        ShowResult(score)
    }
}

// Call this function when the timer should start


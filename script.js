// script.js

// Get the button and the navbar links
const toggleButton = document.getElementById('toggleButton');
const navbarLinks = document.getElementById('navbarLinks');

// Add a click event listener to the button
toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active'); // Toggle the 'active' class
});

function showCPRTutorial() {
    const videoContainer = document.getElementById("video-container");
    const watchButton = document.getElementById("watchButton1");

    if (videoContainer.innerHTML === "") {
        // Embed the video
        videoContainer.innerHTML = `
            <iframe width="640" height="360" 
                src="https://www.youtube.com/embed/hizBdM1Ob68?si=I9PrdwacPsHT4lOR" 
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerpolicy="strict-origin-when-cross-origin" 
                allowfullscreen></iframe>`;
        watchButton.textContent = "Close"; // Change button text to "Close"
    } else {
        // Remove the video
        videoContainer.innerHTML = "";
        watchButton.textContent = "Watch"; // Change button text back to "Watch"
    }
}

function showAEDTutorial() {
    const videoContainer = document.getElementById("video2-container");
    const watchButton = document.getElementById("watchButton2");

    if (videoContainer.innerHTML === "") {
        // Embed the video
        videoContainer.innerHTML = `
            <iframe width="560" height="315" 
                src="https://www.youtube.com/embed/2VxVQ2expR0?si=ZbUIOo6SnSZrBhGR" 
                title="AED Tutorial" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen></iframe>`;
        watchButton.textContent = "Close"; // Change button text to "Close"
    } else {
        // Remove the video
        videoContainer.innerHTML = "";
        watchButton.textContent = "Watch"; // Change button text back to "Watch"
    }
}


// Handle story submission
document.getElementById("story-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form from refreshing the page

    // Get the story input
    const storyInput = document.getElementById("story-input");
    const storyText = storyInput.value.trim(); // Get and trim the user's input
    if (!storyInput) {
        console.error("The element with id 'story-input' was not found in the DOM.");
    }

    if (storyText) {
        // Create a new h4 element for the story
        const storyContainer = document.getElementById("story-container");
        const newStory = document.createElement("h4");
        newStory.textContent = storyText;

        // Append the new story to the story container
        storyContainer.appendChild(newStory);

        // Clear the input field
        storyInput.value = "";

        // Alert the user and confirm submission
        alert("Thank you for sharing your story!");
    } else {
        alert("Please write a story before submitting.");
    }
});

// quiz.js

// Quiz data
const quizData = [
    {
        question: "What is cardiac arrest?",
        options: ["A sudden loss of blood flow to the brain", "A sudden loss of heart function, breathing, and consciousness", " A blockage in the coronary artery", "A type of heart attack"],
        answer: "A sudden loss of heart function, breathing, and consciousness"
    },
    {
        question: "What is the most common cause of cardiac arrest? ",
        options: ["High blood pressure", "Diabetes", "Lung disease", "Ventricular fibrillation (abnormal heart rhythm)"],
        answer: "Ventricular fibrillation (abnormal heart rhythm)"
    },
    {
        question: "What is the survival rate for cardiac arrest if CPR and defibrillation are provided within the first few minutes?",
        options: ["80-90%", "50-70%", "20-30%", "Less than 10%"],
        answer: " 50-70%"
    },
    {
        question: "Which of the following increases the risk of cardiac arrest?",
        options: ["Regular exercise", "Smoking", "Healthy diet", "Low cholesterol"],
        answer: "Smoking"
    },
    {
        question: "What is the recommended compression-to-breath ratio for adult CPR?",
        options: ["10 compressions to 1 breath", " 20 compressions to 3 breaths", "30 compressions to 2 breaths", "5 compressions to 2 breath"],
        answer: " compressions to 2 breaths"
    },
    {
        question: "How deep should chest compressions be during CPR for an adult?",
        options: [") 1 inch (2.5 cm)", "2 inches (5 cm)", "3 inches (7.5 cm)", "4 inches (10 cm)"],
        answer: ""
    },
    {
        question: "What device is used to restore a normal heart rhythm during cardiac arrest?",
        options: ["Defibrillator", "Blood pressure monitor", "Stethoscope", "Pulse oximeter"],
        answer: "Defibrillator"
    },
    {
        question: "What is the purpose of CPR (Cardiopulmonary Resuscitation) in cardiac arrest?",
        options: ["To clear blocked airways", "To restart the heart", "To maintain blood flow to the brain and vital organs", "To reduce chest pain"],
        answer: "To maintain blood flow to the brain and vital organs"
    },
    {
        question: "What is the first step you should take if someone experiences cardiac arrest?",
        options: ["Perform chest compressions", "Give mouth-to-mouth resuscitation ", " Wait for the person to regain consciousness ", "Call emergency services"],
        answer: " all emergency services "
    },
    {
        question: "Which of the following is a symptom of cardiac arrest?",
        options: [" Nausea", "Sudden collapse and loss of consciousness", "Shortness of breath", "Chest pain"],
        answer: "Sudden collapse and loss of consciousness"
    }
];

let currentQuestionIndex = 0;
let score = 0;

// DOM Elements
const startQuizButton = document.getElementById("start-quiz");
const quizContainer = document.getElementById("quiz-container");
const questionContainer = document.getElementById("question-container");
const nextQuestionButton = document.getElementById("next-question");
const resultElement = document.getElementById("result");

// Start the quiz
startQuizButton.addEventListener("click", () => {
    startQuizButton.style.display = "none"; // Hide the start button
    quizContainer.style.display = "block"; // Show the quiz container
    loadQuestion();
});

// Load a question
function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionContainer.innerHTML = `
        <div class="question">
            <h3>${currentQuestion.question}</h3>
            <div class="options">
                ${currentQuestion.options.map(option => `
                    <label>
                        <input type="radio" name="answer" value="${option}">
                        ${option}
                    </label><br>
                `).join("")}
            </div>
        </div>
    `;
    nextQuestionButton.style.display = "block"; // Show the next button
}

// Check the answer and move to the next question
nextQuestionButton.addEventListener("click", () => {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        if (selectedOption.value === quizData[currentQuestionIndex].answer) {
            score++;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            showResult();
        }
    } else {
        alert("Please select an option!");
    }
});

// Show the final result
function showResult() {
    quizContainer.innerHTML = `
        <h2>Quiz Completed!</h2>
        <p>Your score is ${score} out of ${quizData.length}.</p>
    `;
}

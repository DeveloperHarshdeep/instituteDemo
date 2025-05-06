// Elements
const loginContainer = document.querySelector('.login-container');
const selectExamContainer = document.querySelector('.SelectExam');
const rulesContainer = document.querySelector('.rules');
const typingContainer = document.querySelector('.typing');
const proceedBtn = document.getElementById('proceedBtn');
const StartExam = document.getElementById('stexam');
const examContainer = document.querySelector('.Exam');

var ExamType; // This variable will store the selected exam type for use in other scripts
var loggedInUser = null; // This variable will store the logged-in user's data

// Login form submit event
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const rollNoInput = document.getElementById('rollNo').value.trim();
    const password    = document.getElementById('password').value.trim();
  
    const user = usersdata.find(u =>
      String(u.rollNo) === rollNoInput &&
      u.dob === password
    );
  
    if (user) {
      loggedInUser = user;
      ShowDetails();
  
      loginContainer.style.display       = 'none';
      selectExamContainer.style.display  = 'block';
    } else {
      alert('Invalid roll number or password');
    }
  });
  

// Exam Type Selecting
document.addEventListener('DOMContentLoaded', function () {
    // Get all elements needed
    const selectExamSection = document.getElementById('select-exam-section');
    const btnSelects = document.querySelectorAll('.btn-select');

    // Add event listeners to select buttons
    btnSelects.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent the default link action
            const examType = btn.getAttribute('data-exam'); // Get exam type from data attribute

            // Set the global ExamType variable based on the selection
            ExamType = examType;

            // Hide the selection section
            selectExamSection.style.display = 'none';

            // Show the relevant exam rules section based on the selected type
            rulesContainer.style.display = 'block';
        });
    });

    // Proceed Button click event (inside rules container)
    proceedBtn.addEventListener('click', function (e) {
        e.preventDefault();

        // Hide the rules container
        rulesContainer.style.display = 'none';

        // Show the typing section
        typingContainer.style.display = 'block';
        loadParagraph(ExamType);

        // Additional logic to start typing test or load typing paragraph can be added here
    });

    // Start Exam Button click event (inside typing container)
    StartExam.addEventListener('click', function (e) {
        e.preventDefault();

        // Hide the typing container
        typingContainer.style.display = 'none';
        loadQuestions(ExamType)
        // Show the exam section
        examContainer.style.display = 'block';
        // Additional logic to handle the start of the exam
    });
});

function ShowDetails() {
    document.querySelectorAll('.userName').forEach(function (e) {
        console.log(e)
        e.innerText = loggedInUser.username;
    }) // Assuming you have an element with id 'userName'
    document.querySelectorAll('.rollNumber').forEach(function (e) {
        e.innerText = loggedInUser.rollNo; // Assuming you have an element with id 'userName'
    })
    document.querySelectorAll('.userImg').forEach(function (e) {
        e.src = loggedInUser.image; // Assuming you have an element with id 'userName'
    })

}

function ShowResult(score){
    var name = document.querySelectorAll('#userName');
    var rollNo = document.querySelector('#rollNumber');
    var userScore = document.querySelector('#userScore');
    var userImage = document.querySelector('#userImage');
    document.querySelector('.result-container').style.display = 'block';
    examContainer.style.display = 'none';
    name.forEach(function(e){
    e.innerText = loggedInUser.username;

    })
    rollNo.innerText = `Roll No. ${loggedInUser.rollNo}`;
    userImage.src = loggedInUser.image;
    userScore.innerText = score;
    // console.log(score)
}


document.querySelector('.ok-button').addEventListener('click', function(){
    location.reload()
})
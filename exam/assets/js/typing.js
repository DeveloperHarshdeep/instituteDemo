const typingText = document.querySelector(".typing-text p"),
    inpField = document.querySelector(".input-field"),
    tryAgainBtn = document.querySelector(".content button"),
    timeTag = document.querySelector(".time span b"),
    mistakeTag = document.querySelector(".mistake span"),
    wpmTag = document.querySelector(".wpm span"),
    cpmTag = document.querySelector(".cpm span"),
    stexamBtn = document.getElementById("stexam"); // Assuming the button has an id of 'stexam'

let wpm = 0;
let timer,
    maxTime = 300,
    timeLeft = maxTime,
    charIndex = mistakes = isTyping = 0;



function loadParagraph(selectedExamType) {
    // Find the paragraph that matches the selected exam type
    const selectedParagraphObj = typingData.find(item => item.type === selectedExamType);

    if (selectedParagraphObj) {
        // Reset everything before loading the new paragraph
        typingText.innerHTML = "";
        selectedParagraphObj.paragraph.split("").forEach(char => {
            let span = `<span>${char}</span>`;
            typingText.innerHTML += span;
        });
        typingText.querySelectorAll("span")[0].classList.add("active");

        inpField.addEventListener("click", () => inpField.focus());
        typingText.addEventListener("click", () => inpField.focus());
    } else {
        console.error("No paragraph found for the selected exam type!");
    }
}

function initTyping() {
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];

    if (charIndex < characters.length - 1 && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }

        if (typedChar == null) { // If the user presses backspace
            if (charIndex > 0) {
                charIndex--;
                if (characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else { // If the user types a character
            if (characters[charIndex].innerText === typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }

        characters.forEach(span => span.classList.remove("active"));
        if (charIndex < characters.length) {
            characters[charIndex].classList.add("active");
        }

        wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

        wpmTag.innerText = wpm;
    } else {
        clearInterval(timer);
        inpField.value = "";
        stexamBtn.style.display = 'block'; // Show the button when the user finishes typing
    }
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;

        // Calculate minutes and seconds
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;

        // Pad with leading zeros if needed
        let formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
        let formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

        // Update the time display
        timeTag.innerText = `${formattedMinutes}:${formattedSeconds}`;

        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpmTag.innerText = wpm;
    } else {
        clearInterval(timer);
        stexamBtn.style.display = 'block'; // Show the button when time is up
    }
}



// Assuming you store the selected exam type in a variable named `selectedExamType`
// let selectedExamType = ExamType;  // Replace this with the actual selected exam type from user input
// loadParagraph(selectedExamType);  // Load the paragraph based on the selected exam type

inpField.addEventListener("input", initTyping);
// DataTypes in js 
// String = 'This is a string', `This is also a string`, "This is also a string",
// Number = 23,
// Object = { name: 'kuchhbhi', age: 12, class: '10th' },
// Array = ['as', 'sdf', 'asdf', 23, 34],
// undefined,
// Boolean (true, false), 
// null


document.addEventListener('keydown', function(e) {
    if(e.keyCode == 189 || e.keyCode == 187)   {
        // console.log(e)
        document.querySelector('#author').style.display = 'block'
    } 
    else{
        console.log(e.key, e.keyCode)
    }
})
document.addEventListener('keyup', function(e) {
    if(e.keyCode == 189 || e.keyCode == 187)   {
        // console.log(e)
        document.querySelector('#author').style.display = 'none'
    } 
    else{
        console.log(e.key, e.keyCode)
    }
})
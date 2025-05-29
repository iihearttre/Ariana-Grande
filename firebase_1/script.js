// Centralized JavaScript Management
console.log("JavaScript file successfully connected!");

// Descriptive Variable Names
let userName = "Tre";
let userAge = 16;

// Integrate Distinct Data Types
let isStudent = true;  // Boolean
let grade = 90;        // Integer
let favoriteSubject = "Math";  // String

// Implement Mathematical Operations
function calculateSum() {
    let numberOne = 12;
    let numberTwo = 8;
    let sum = numberOne + numberTwo;

    console.log(`The sum of ${numberOne} and ${numberTwo} is: ${sum}`);
    document.getElementById("result").innerText = `The sum is: ${sum}`;
}

// Create decision making with decision structures
function checkPassStatus() {
    if (grade >= 50) {
        console.log(`${userName} passed the ${favoriteSubject} exam!`);
        document.getElementById("status").innerText = `${userName} passed the exam!`;
    } else {
        console.log(`${userName} failed the ${favoriteSubject} exam.`);
        document.getElementById("status").innerText = `${userName} failed the exam.`;
    }
}

// Utilize Logical Operators for Complex Condition Evaluation
function evaluatePerformance() {
    if (grade >= 90 && isStudent) {
        console.log(`${userName} is an excellent student!`);
        document.getElementById("performance").innerText = `${userName} is an excellent student!`;
    } else if (grade >= 70 || isStudent) {
        console.log(`${userName} is doing well in school.`);
        document.getElementById("performance").innerText = `${userName} is doing well in school.`;
    } else {
        console.log(`${userName} needs improvement.`);
        document.getElementById("performance").innerText = `${userName} needs improvement.`;
    }
}

// JavaScript Output Techniques
console.log("This is a console output.");
document.write("<p>This is printed on the webpage.</p>");
document.getElementById("result").innerText = "Press the button to see a calculation!";
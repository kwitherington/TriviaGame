var points = 20;
var correct = 0;
var incorrect = 0;
var score = 0;
var questionSelector = 0;
var rightWrong = false;

var questions = [
    "What was Kendrick Lamar's first studio album?",
    "Weezy F Baby and the F is NOT for...",
    "Rap beef is part of the culture, one of these does NOT belong...?"
];

var answerArrays = [
    [
        "Good Kid M.A.A.D City",
        "Section.80",
        "Damn.",
        "To Pimp a Butterfly"
    ],
    [
        "Front Door",
        "Forensics",
        "Finisher",
        "Flaw"
    ],
    [
        "Kendrick vs J. Cole",
        "Tupac vs Biggie",
        "Jay-Z vs Nas",
        "50 Cent vs Ja Rule"
    ]
];


var correctAnswers = [
    "Section.80",
    "Flaw",
    "Kendrick vs J. Cole"
];




$(document).ready(function() {
    $("#startButton").click(displayGame);

    function displayGame() {

        $("#rightWrong").text("");
        $("#prompt").text("");
        $("#start").html("");
        $("#points").text(points);
        $("#question").text(questions[questionSelector]);
        for (i = 0; i < answerArrays[questionSelector].length; i++) {
            $("#answerSection" + i).html("");
            var answerButton = $("<button>");
            answerButton.addClass("answer");
            answerButton.id = "answer" + i;
            answerButton.attr("data-name", answerArrays[questionSelector][i]);
            answerButton.text(answerArrays[questionSelector][i]);
            $("#answerSection" + i).append(answerButton);
        }
        
    }

    $("div.row.answers").on("click", "button.answer", userSelection)

    function userSelection() {
        if ($(this).attr("data-name") == correctAnswers[questionSelector]) {
            rightWrong = true;
            correct++;
            var newScore = score += points;
            $("#score").text(newScore);
        } else {
            incorrect++ 
        }
        showResult();
        nextQuestion();
        setTimeout(displayGame, 3000);
    }

    function nextQuestion() {
        if (questionSelector == answerArrays.length - 1) {
            questionSelector = 0;
        } else {
            questionSelector++;
        }
    }

    function showResult() {
        clearGame();
        if (rightWrong == true) {
            $("#rightWrong").text("Correct");
            rightWrong = false;
        } else {
            $("#rightWrong").text("Incorrect");
            $("#prompt").text("The correct answer was: " + correctAnswers[questionSelector]);
        }
    }

    function clearGame() {
        $("#question").text("");
        for (i = 0; i < answerArrays[questionSelector].length; i++) {
            $("#answerSection" + i).html("");
        }
    }

})


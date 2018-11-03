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

    // Clears start screen, previous game scorecard, or prompt 
    // and displays a question with answer buttons
    function displayGame() {
        clearPrompt();
        $("#start").html("");
        $("#playAgainButtonSection").html("");
        $("#rightAnswers").text("");
        $("#wrongAnswers").text("");
        $("#totalScore").text("");
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

    // Grabs dynamically created answer buttons and runs right/wrong logic.
    $("div.row.answers").on("click", "button.answer", userSelection)

    // determines if the user selection was correct and adjusts points accordingly.
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
    }

    // Determines whether to show the next question or show scorecard.
    function nextQuestion() {
        if (questionSelector == answerArrays.length - 1) {
            questionSelector = 0;
            setTimeout(showScoreCard, 2500);
        } else {
            questionSelector++;
            setTimeout(displayGame, 2500);
        }
    }

    // Displays result of the question and prompt if wrong.
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

    // Shows the results from the game, creates play button, 
    // clears the prompt, and resets ints for next game.
    function showScoreCard() {
        clearPrompt();
        $("#points").text("");
        $("#score").text("");
        $("#rightAnswers").text("Correct Answers: " + correct);
        $("#wrongAnswers").text("Incorrect Answers: " + incorrect);
        $("#totalScore").text("Total Score: " + score);
        var playAgainButton = $("<button>");
        playAgainButton.addClass("playAgain");
        playAgainButton.text("Play Again?");
        $("#playAgainButtonSection").append(playAgainButton);
        correct = 0;
        incorrect = 0;
        score = 0;
    }

    // click functionality for "play again" button.
    $(document).on("click", "button.playAgain", displayGame);

    // Clears the question and answer buttons from their divs.
    function clearGame() {
        $("#question").text("");
        for (i = 0; i < answerArrays[questionSelector].length; i++) {
            $("#answerSection" + i).html("");
        }
    }

    // Clears prompt.
    function clearPrompt() {
        $("#rightWrong").text("");
        $("#prompt").text("");
    }

})


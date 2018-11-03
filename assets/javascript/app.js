var points = 20;
var correct = 0;
var incorrect = 0;
var score = 0;
var questionSelector = 0;
var rightWrong = false;
var startCount;
var gifUrl = "";

var questions = [
    "What was Kendrick Lamar's first studio album?",
    "Weezy F Baby and the F is NOT for...",
    "Rap beef is part of the culture, one of these does NOT belong...?",
    "Eminem, 50 Cent, and Kendrick were all signed by...",
    "Aftermath and Death Row Records are both spin off's of this legendary lable.",
    "One might say that Ice Cube is not a fan of..",
    "18 years.. 18 years.. and on the 18th birthday, found out it wasn't his?!",
    "Mac Miller and this rapper knew eachother in highschool",
    "Which of these rap groups had a show on Cartoon Network's Adult Swim?",
    "Everybody know, you dont mess with the white boy.. Who would that be?",
    "BONUS: Is Tupac alive?"
];

var answerArrays = [
    [
        "Good Kid M.A.A.D City", "Section.80", "Damn.", "To Pimp a Butterfly"
    ],
    [
        "Front Door", "Forensics", "Finisher", "Flaw"
    ],
    [
        "Kendrick vs J. Cole", "Tupac vs Biggie", "Jay-Z vs Nas", "50 Cent vs Ja Rule"
    ],
    [
        "Jay-Z", "Death Row", "Dr. Dre", "Young Money"
    ],
    [
        "Def Jam", "Roc-A-Fella", "Cash Money", "Ruthless Records"
    ],
    [
        "The Post Office", "The Police", "Pork Chops", "Poor Handwriting"
    ],
    [
        "Gold Digger", "Jesus Walks", "Flashing Lights", "Good Life"
    ],
    [
        "Tyler The Creator", "Skizzy Mars", "Chris Webby", "Wiz Khalifa"
    ],
    [
        "N.W.A", "Three Loco", "Odd Future", "Outkast"
    ],
    [
        "Mac Miller", "Eminem", "Aesop Rock", "Action Bronson"
    ],
    [
        "Yes", "No"
    ]
];

var correctAnswers = [
    "Section.80",
    "Flaw",
    "Kendrick vs J. Cole",
    "Dr. Dre",
    "Ruthless Records",
    "The Police",
    "Gold Digger",
    "Wiz Khalifa",
    "Odd Future",
    "Eminem",
    "Yes"
];

$(document).ready(function() {
    $("#startButton").click(displayGame);

    // Clears start screen, previous game scorecard, or prompt 
    // and displays a question with answer buttons
    function displayGame() {
        points = 20;
        clearPrompt();
        $("#start").html("");
        $("#playAgainButtonSection").html("");
        $("#rightAnswers").text("");
        $("#wrongAnswers").text("");
        $("#totalScore").text("");
        $("#gifDiv").html("");
        $("#points").text(points);
        $("#question").text(questions[questionSelector]);
        for (i = 0; i < answerArrays[questionSelector].length; i++) {
            $("#answerSection" + i).html("");
            var answerButton = $("<button>");
            answerButton.addClass("answer btn btn-outline-primary btn-lg btn-block");
            answerButton.id = "answer" + i;
            answerButton.attr("data-name", answerArrays[questionSelector][i]);
            answerButton.text(answerArrays[questionSelector][i]);
            $("#answerSection" + i).append(answerButton);
        }  
        startCountdown();
    }

    // Grabs dynamically created answer buttons and runs right/wrong logic.
    $("div.row.answers").on("click", "button.answer", userSelection)

    // determines if the user selection was correct and adjusts score accordingly.
    function userSelection() {
        stopCountdown();
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
            setTimeout(showScoreCard, 1500);
        } else {
            questionSelector++;
            setTimeout(displayGame, 1500);
        }
    }

    // Displays result of the question and prompt if wrong.
    function showResult() {
        gifCall(correctAnswers[questionSelector]);
        clearGame();
        if (rightWrong == true) {
            $("#rightWrong").text("Correct");
            var gifAnswer = $("<img>");
            gifAnswer.attr('src', gifUrl);
            gifAnswer.addClass("img-thumbnail");
            $("#gifDiv").html(gifAnswer);
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
        playAgainButton.addClass("playAgain btn btn-outline-dark btn-lg btn-block");
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

    // Set interval.
    function startCountdown() {
        startCount = setInterval(countdown, 800);
    }

    // Clear interval.
    function stopCountdown() {
        clearInterval(startCount);
    }

    // Checks for timeout and decrements points.
    function countdown() {
        if (points <= 0) {
            stopCountdown();
            points = 20;
            showResult();
            nextQuestion();
        } else {
            points--;
            $("#points").text(points);
        }
    }

    function gifCall(search) {
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + search + "&limit=1&api_key=DxWaOfGscEYwBq3DADkMyW7EuzLJJe9k";

        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
          gifUrl = response.data[0].images.original.url;
        });
    }
})


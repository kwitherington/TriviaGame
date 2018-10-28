var score = 20;

var question1Answers = [
    "Good Kid M.A.A.D City",
    "Section.80",
    "Damn.",
    "To Pimp a Butterfly"
]


$("#startButton").click(displayGame);

function displayGame() {
    $("#start").html("");
    $("#score").text(score);
    $("#question").text("What was Kendrick Lamar's first studio album?");
    for (i = 0; i < question1Answers.length; i++) {
        var answerButton = $("<button>");
        answerButton.addClass("answer");
        answerButton.id = "answer" + i;
        answerButton.text(question1Answers[i]);
        $("#answerSection" + i).append(answerButton);
    }
  }
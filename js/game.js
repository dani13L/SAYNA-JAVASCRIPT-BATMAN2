$(document).ready(function () {
    const demarrer = document.getElementById('demarer');

    demarrer.addEventListener('click', (e) => {
        e.preventDefault();
        showQuestions();
        $.ajax({
            url: 'https://batman-api.sayna.space/questions',
            datatype: 'json',
            success: function (questions) {
                console.log(questions);
                //declaration des variables locale
                let totalPoint = 0;
                let currentQuiz = 0;
                let totalQuiz = questions.length;

                $('#total-quiz').text(totalQuiz - 1);
                setForm(questions[currentQuiz].question, questions[currentQuiz].response, currentQuiz);

                //soumission de la reponse de l'utilisateur
                $('#btn-next').click(function (e) {
                    e.preventDefault();

                    let chooseResponse = isChooseResponse(questions, currentQuiz);
                    let isChoose = chooseResponse[0];
                    let userResponse = chooseResponse[1];

                    if (isChoose) {
                        $('#card-body-quizz').slideUp(1000).slideDown(1000);
                        currentQuiz++;

                        setTimeout(() => {
                            if (currentQuiz < totalQuiz) {
                                
                                setForm(questions[currentQuiz].question, questions[currentQuiz].response, currentQuiz);
                            }
                        }, 500);

                        if (currentQuiz === totalQuiz) {
                            $('#btn-next').val('voir le resultat').attr("id", "btn-resume");

                        }
                        console.log(userResponse);
                        totalPoint = userResponse === true ? (totalPoint + 1) : totalPoint;
                        userResponse = "false";
                        console.log(totalPoint);
                    }

                    else {
                        if (currentQuiz === totalQuiz) {
                            console.log(userResponse);
                            totalPoint = userResponse === true ? (totalPoint + 1) : totalPoint;
                            console.log(totalPoint);
                            if (totalPoint <= (Math.round(totalQuiz / 3))) {
                                $('#titre').text("0" + totalPoint + "/" + totalQuiz + "c'est pas tout à fait ça...");
                                $('#msg-result').text("Oula! Heuresement que le Ridder est sous verrous... Il faut que vous vous rens ")
                            } else if (totalPoint <= (Math.round(totalQuiz / 2))) {
                                $('#titre').text("0" + totalPoint + "/" + totalQuiz + "pas mal!");
                                $('#msg-result').text("Encore un peu d'entrainement avec le chevalier noir")
                            }
                            else {
                                $('#titre').text("0" + totalPoint + "/" + totalQuiz + "pas mal!");
                                $('#msg-result').text("");
                            }
                            $('#popup-result').css('display', "flex");

                            $('#btn-restart').click(function (e) {
                                e.preventDefault();
                                hideQuestion();
                                totalPoint = 0;
                                currentQuiz = 0;
                                $('#popup-result').css('display', "none");
                            })
                        }


                    }

                });

            },
            error: function () {
                console.log('impossible de se connecter');
            }
        });

    });

    //arrow top
    $('#top-arrow').click(function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    //arrow down
    $('#down-arrow').click(function () {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    })

});


function showQuestions() {
    $('#btn-resume').val('QUESTION SUIVANTE').attr("id", "btn-next");
    const question = document.getElementById('questions');
    question.style.display = 'block';
    const demarrer = document.getElementById('entete');
    demarrer.style.display = 'none';
    const btn_game = document.getElementById('btn-game');
    btn_game.style.display = 'flex';
    $('#question-suivante').show();

}

function hideQuestion() {
    $('#questions').css('display', 'none')
    $('#entete').css('display', 'block')
    $('#entete').css('display', 'block')
    $('#btn-game').css('display', 'none')

}

function setForm(question, response, nbrequiz) {
    $('#img-illustrate').attr("src", "../Assets_game/Illustrations/Batgame_" + (3 + nbrequiz) + ".png");
    $('#number-quiz').text(nbrequiz + "/");
    $('#quiz-question').empty();
    $('#quiz-question').append("<p class='question' id='question'></p>");
    $('#question').text(question);
    $(".qcm").empty();
    for (let i = 0; i < 3; i++) {
        $('#qcm').append("<label for='checkbox" + i + "'class='response' id='" + i + "'></label>");
        $('#' + i).append("<input type='checkbox' name='choix' id='checkbox" + i + "' class='check'>");
        $('#' + i).append("<label id='response" + i + "'>" + response[i].text + "</label>");
    }
    $('#card-body-quizz').append("<span id='error-message'></span>");
    $('#error-message').empty();
    console.log(question)
}

function isChooseResponse(questions, currentQuiz) {
    let notChoose = true;
    let userResponse = false;

    //controle si l'utilisateur à chisir une reponse
    if (currentQuiz < 12) {
        for (let i = 0; i < questions[currentQuiz].response.length; i++) {
            
            if ($('#checkbox' + i).is(":checked")) {
                notChoose = false;
                userResponse = questions[currentQuiz].response[i].isGood;
                console.log(questions[currentQuiz].response[i].isGood);
            }
        }

        if (notChoose) {
            $('#error-message').css("color", "red").text("choisisser une reponse! ");
            return [false, userResponse];
        } else {
            return [true, userResponse];
        }
    }
    return [false, userResponse];
}


document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.question');
    let currentCard = 1;
    let currentQ = "";
    let answers = {};
    let cont1 = $(".barContainer").clone().attr('id', 'cont1');
    let cont2 = $(".barContainer").clone().attr('id', 'cont2');
    let cont3 = $(".barContainer").clone().attr('id', 'cont3');
    let cont4 = $(".barContainer").clone().attr('id', 'cont4');
    $(".barContainer").remove();
    function submitAnswers() {
        let inter = setInterval(function () {
            $('#verdict').fadeTo("fast", Math.random());
        }, 300);
        // Ensure you have a correct 'action' attribute in your form or adjust the URL here
        const submitURL = 'https://gjd68dgy02.execute-api.eu-west-3.amazonaws.com/defualt/CarreerFinderData/result';

        fetch(submitURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(answers),
            })
            .then(response => response.json())
         .then(data => {
            sessionStorage.setItem('respond', JSON.stringify(data.answer));
            clearInterval(inter);
            $('#verdict').fadeTo("fast", 1);
            $('#verdict').animate({
                "marginLeft": "2vw",
                "marginTop": "-50vh",
                "zoom": "70%"
            }, {
                duration: 1000,
                easing: "linear",
                complete: () => {
                    document.getElementById('answerTxt').innerHTML = data.summary;
                    $('#answerSum').fadeTo("slow", 1, () => {
                        cont1.appendTo($('#answerSum'));
                        cont2.appendTo($('#answerSum'));
                        cont3.appendTo($('#answerSum'));
                        cont4.appendTo($('#answerSum'));
                        $("#cont1 .roleName").text('Data Analyst');
                        $("#cont1 .progress").html('<strong>'+(data.role_scores.DataAnalyst*100)+' %</strong>');
                        $("#cont1 label div").addClass("grower"+(data.role_scores.DataAnalyst*10));
                        $("#cont2 .roleName").text('Data Engineer');
                        $("#cont2 .progress").html('<strong>'+(data.role_scores.DataEngineer*100)+' %</strong>');
                        $("#cont2 label div").addClass("grower"+(data.role_scores.DataEngineer*10));
                        $("#cont3 .roleName").text('Data Product Manager');
                        $("#cont3 .progress").html('<strong>'+(data.role_scores.DataProductManager*100)+' %</strong>');
                        $("#cont3 label div").addClass("grower"+(data.role_scores.DataProductManager*10));
                        $("#cont4 .roleName").text('Data Scientist');
                        $("#cont4 .progress").html('<strong>'+(data.role_scores.DataScientist*100)+' %</strong>');
                        $("#cont4 label div").addClass("grower"+(data.role_scores.DataScientist*10));
                    });
                },
            })
            // Redirect to a result page; ensure '/result/' is the correct path
        })
         .catch(error => console.error('Error:', error));
    }

    document.querySelectorAll('.answer').forEach(button => {
        button.addEventListener('click', function () {
            const question = this.getAttribute('data-question');
            answers[`q${question}`] = this.getAttribute('data-value');
            if (question == currentQ) return;
            currentQ = question;
            if (currentCard < cards.length) {
                currentCard++;
            } else {
                submitAnswers(); // Call to submit all answers to the backend
            }
        });
    });
});
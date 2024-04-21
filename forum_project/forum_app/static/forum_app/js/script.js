document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.question');
    let currentCard = 1;
    let currentQ= "";
    let answers = {};

    function submitAnswers() {
       let inter = setInterval(function () {
        $('#verdict').fadeTo( "fast", Math.random() );
    }, 300);
        console.log("Réponses à envoyer :", answers);
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
                console.log(data.status)
                sessionStorage.setItem('respond', JSON.stringify(data.answer));
                clearInterval(inter);
                $('#verdict').fadeTo( "fast", 1 );
                $('#verdict').animate({
                    "marginLeft": "2vw",
                    "marginTop": "-50vh",
                    "zoom" : "70%"
                }, {
                    duration: 1000,
                    easing: "linear",
                    complete: () => {
                        document.getElementById('answerTxt').innerHTML = data.summary;
                        document.getElementById('val1').innerHTML = (data.role_scores.DataAnalyst*100)+' %';
                        document.getElementById('val2').innerHTML = (data.role_scores.DataEngineer*100)+' %';
                        document.getElementById('val3').innerHTML = (data.role_scores.DataProductManager*100)+' %';
                        document.getElementById('val4').innerHTML = (data.role_scores.DataScientist*100)+' %';
                        $('#answerSum').fadeTo( "slow", 1 );
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
            console.log("Answered : " + question);
            console.log("Value : " + this.getAttribute('data-value'))
            if(question == currentQ) return;
            currentQ = question;
            if (currentCard < cards.length) {
                currentCard++;
            } else {
                console.log("All questions answered.", answers);
                submitAnswers(); // Call to submit all answers to the backend
            }
        });
    });
});
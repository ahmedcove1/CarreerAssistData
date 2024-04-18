document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.question');
    let currentCard = 0;
    let answers = {};

    function submitAnswers() {
        console.log("Réponses à envoyer :", answers);
        // Ensure you have a correct 'action' attribute in your form or adjust the URL here
        const submitURL = '/submit_questionnaire/'

        fetch(submitURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value,
            },
            body: JSON.stringify(answers),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.status)

            sessionStorage.setItem('respond', JSON.stringify(data.answer));
            // Redirect to a result page; ensure '/result/' is the correct path
        })
        .catch(error => console.error('Error:', error));
    }

    document.querySelectorAll('.answer').forEach(button => {
        button.addEventListener('click', function() {
            const question = this.getAttribute('data-question');
            answers[`q${question}`] = this.getAttribute('data-value');
            const nextCard = currentCard + 1;
            console.log("Answered : " + question);
            console.log("Value : "+this.getAttribute('data-value'))
            if (nextCard < cards.length) {
                currentCard = nextCard;
            } else {
                console.log("All questions answered.", answers);
                submitAnswers(); // Call to submit all answers to the backend
            }
        });
    });
});



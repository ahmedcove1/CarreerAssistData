document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    let currentCard = 0;
    let answers = {};

    function updateProgressBar(questionNumber, totalQuestions) {
        const progressBar = document.getElementById('progressBar');
        const width = ((questionNumber + 1) / totalQuestions) * 100;
        progressBar.style.width = width + '%';
    }
    function showCard(index) {
        cards.forEach((card, i) => card.classList.toggle('active', i === index));
        updateProgressBar(index, cards.length); // Pass the current card index and total number of cards

    }

    function submitAnswers() {
        console.log("Réponses à envoyer :", answers);
        // Ensure you have a correct 'action' attribute in your form or adjust the URL here
        const submitURL = document.getElementById('questionnaireForm').getAttribute('action');

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
            // Assuming 'echoedData' is the correct key from your response; adjust as needed
            console.log(data.status)
            sessionStorage.setItem('respond', JSON.stringify(data.echoedData));
            // Redirect to a result page; ensure '/result/' is the correct path
            window.location.href = '/result/';
        })
        .catch(error => console.error('Error:', error));
    }

    document.querySelectorAll('.answer').forEach(button => {
        button.addEventListener('click', function() {
            const question = this.getAttribute('data-question');
            answers[`q${question}`] = this.value;
            const nextCard = currentCard + 1;
            if (nextCard < cards.length) {
                currentCard = nextCard;
                showCard(currentCard);
            } else {
                console.log("All questions answered.", answers);
                submitAnswers(); // Call to submit all answers to the backend
            }
        });
    });

    showCard(currentCard); // Initially show the first card
});



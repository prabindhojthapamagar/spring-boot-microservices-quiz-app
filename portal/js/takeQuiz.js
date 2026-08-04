let quizId;
let questions = [];

// Load Quiz
async function loadQuiz() {

    quizId = document.getElementById("quizId").value;

    const response = await fetch(`${QUIZ_API}/get/${quizId}`);

    questions = await response.json();

    let html = "";

    questions.forEach((q, index) => {

        html += `

        <div class="card">

            <h3>${index + 1}. ${q.questionTitle}</h3>

            <label>
                <input type="radio" name="q${index}" value="${q.option1}">
                ${q.option1}
            </label><br>

            <label>
                <input type="radio" name="q${index}" value="${q.option2}">
                ${q.option2}
            </label><br>

            <label>
                <input type="radio" name="q${index}" value="${q.option3}">
                ${q.option3}
            </label><br>

            <label>
                <input type="radio" name="q${index}" value="${q.option4}">
                ${q.option4}
            </label>

        </div>

        `;
    });

    document.getElementById("quizContainer").innerHTML = html;

    document.getElementById("submitBtn").style.display = "block";

}



// Submit Quiz
async function submitQuiz() {

    let responses = [];

    questions.forEach((q, index) => {

        const selectedAnswer = document.querySelector(`input[name="q${index}"]:checked`);

        responses.push({

            id: q.id,

            answer: selectedAnswer ? selectedAnswer.value : ""

        });

    });

    const response = await fetch(`${QUIZ_API}/submit/${quizId}`, {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(responses)

    });

    const score = await response.text();

    document.getElementById("score").innerHTML =
        `<h2>Your Score : ${score}</h2>`;

}
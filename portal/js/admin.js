// Add Question
async function addQuestion() {

    const question = {
        questionTitle: document.getElementById("questionTitle").value,
        option1: document.getElementById("option1").value,
        option2: document.getElementById("option2").value,
        option3: document.getElementById("option3").value,
        option4: document.getElementById("option4").value,
        rightAnswer: document.getElementById("rightAnswer").value,
        category: document.getElementById("category").value,
        difficultyLevel: document.getElementById("difficulty").value
    };

    const response = await fetch(`${QUESTION_API}/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(question)
    });

    const message = await response.text();

    alert(message);
}


// View All Questions
async function loadQuestions() {

    const response = await fetch(`${QUESTION_API}/allQuestions`);

    const questions = await response.json();

    let html = "";

    questions.forEach(q => {

        html += `
        <div class="card">

            <h3>${q.questionTitle}</h3>

            <p>A. ${q.option1}</p>
            <p>B. ${q.option2}</p>
            <p>C. ${q.option3}</p>
            <p>D. ${q.option4}</p>

            <p><b>Answer:</b> ${q.rightAnswer}</p>

            <p><b>Category:</b> ${q.category}</p>

        </div>
        `;
    });

    document.getElementById("questionList").innerHTML = html;

}



// Create Quiz
async function createQuiz() {

    const quiz = {

        categoryName: document.getElementById("quizCategory").value,

        numQuestions: parseInt(document.getElementById("numQuestions").value),

        title: document.getElementById("quizTitle").value
    };

    const response = await fetch(`${QUIZ_API}/create`, {

        method: "POST",

        headers: {

            "Content-Type": "application/json"
        },

        body: JSON.stringify(quiz)
    });

    const message = await response.text();

    alert(message);

}
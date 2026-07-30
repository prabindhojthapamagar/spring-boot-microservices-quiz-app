function loadQuestions(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {

            const container = document.getElementById("questions");
            container.innerHTML = ""; // Clear previous questions

            data.forEach(question => {

                const questionElement = document.createElement("div");
                questionElement.classList.add("card");

                questionElement.innerHTML = `
                    <div class="header">
                        <h2>${question.questionTitle}</h2>
                        <span class="category">${question.category}</span>
                    </div>

                    <div class="options">
                        <ul>
                            ${question.option1 ? `<li>${question.option1}</li>` : ""}
                            ${question.option2 ? `<li>${question.option2}</li>` : ""}
                            ${question.option3 ? `<li>${question.option3}</li>` : ""}
                            ${question.option4 ? `<li>${question.option4}</li>` : ""}
                        </ul>
                    </div>

                    <p>${question.rightAnswer}</p>
                `;

                container.appendChild(questionElement);
            });

        });
}

function searchByCategory() {

    const category = document.getElementById("categoryInput").value;

    loadQuestions(`http://localhost:8080/question/category/${category}`);
}


function addQuestion() {

    const question = {
        questionTitle: document.getElementById("title").value,
        option1: document.getElementById("option1").value,
        option2: document.getElementById("option2").value,
        option3: document.getElementById("option3").value,
        option4: document.getElementById("option4").value,
        rightAnswer: document.getElementById("answer").value,
        difficultyLevel: document.getElementById("difficulty").value,
        category: document.getElementById("category").value
    };

    fetch("http://localhost:8080/question/add", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(question)

    })
    .then(response => response.text())
    .then(data => {
        console.log("Question added:", data);
        alert("Question added successfully!");
    })
    .catch(error => {
        console.error(error);
    });

}


function getQuestionIdsForQuiz() {
    const category = document.getElementById("categoryName").value;
    const numQuestions = document.getElementById("numQuestions").value;

    fetch(`http://localhost:8080/question/generate?categoryName=${category}&numQuestions=${numQuestions}`)
        .then(response => response.json())
        .then(data => 
            console.log("Question IDs for quiz:", data)
        )
}
const btnAddNewCardWindow = document.querySelector(".btn--new-card");
const btnClose = document.querySelector(".btn--close");
const btnPrev = document.querySelector(".btn--prev");
const btnNext = document.querySelector(".btn--next");
const btnClear = document.querySelector(".btn--clear");
const btnAddCard = document.querySelector(".btn--add");
const addNewCardWindow = document.querySelector(".add-new-card-window");
const questionEl = document.querySelector(".question");
const answerEl = document.querySelector(".answer");
const cardsContainer = document.querySelector(".cards-container");
const index = document.querySelector(".index");

//variables
let currentCard = 0;
let data = [];
//utilities functions
const createNewCard = function (question, answer) {
	const card = document.createElement("div");
	card.classList.add("card");
	card.innerHTML = `
        <div class="inner-card">
            <div class="inner-card--front">
                <p>${question}</p>
            </div>
            <div class="inner-card--back">
                <p>${answer}</p>
            </div>
        </div>
    `;
	cardsContainer.appendChild(card);
	data.push({ question: question, answer: answer });
};

const resetTextAreas = function () {
	questionEl.value = "";
	answerEl.value = "";
};
//always show the first card when adding new cards
const showCurrentCard = function () {
	const cards = document.querySelectorAll(".card");
	cards.forEach((card) => card.classList.remove("active"));
	cards[currentCard].classList.add("active");
};
const updateIndex = function () {
	const cards = document.querySelectorAll(".card");
	const total = cards.length;
	index.innerText = `${currentCard + 1}/${total}`;
};
//events listener
btnAddNewCardWindow.addEventListener("click", function () {
	addNewCardWindow.classList.add("show");
});

btnClose.addEventListener("click", function () {
	addNewCardWindow.classList.remove("show");
});

btnAddCard.addEventListener("click", function () {
	const question = questionEl.value;
	const answer = answerEl.value;
	createNewCard(question, answer);
	showCurrentCard();
	resetTextAreas();
	updateIndex();
	addNewCardWindow.classList.remove("show");
});

btnNext.addEventListener("click", function () {
	const cards = document.querySelectorAll(".card");
	if (currentCard >= cards.length - 1) return;
	currentCard++;
	updateIndex();
	cardsContainer.style.transform = `translateX(-${currentCard * 30}rem)`;
	cards.forEach((card) => card.classList.remove("active"));
	cards[currentCard].classList.add("active");
});

btnPrev.addEventListener("click", function () {
	const cards = document.querySelectorAll(".card");
	if (currentCard === 0) return;
	currentCard--;
	updateIndex();
	cardsContainer.style.transform = `translateX(-${currentCard * 30}rem)`;
	cards.forEach((card) => card.classList.remove("active"));
	cards[currentCard].classList.add("active");
});

cardsContainer.addEventListener("click", function (e) {
	const card = e.target.closest(".card");
	if (!card) return;
	card.classList.toggle("flip");
});

btnClear.addEventListener("click", function () {
	data = [];
	cardsContainer.innerHTML = "";
	currentCard = 0;
	index.innerText = "0/0";
});

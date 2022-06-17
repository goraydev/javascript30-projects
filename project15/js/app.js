const cards = document.querySelectorAll('.card');
const form = document.querySelector('.form');
const fieldItem = document.querySelector('#item');
const fieldImg = document.querySelector('#img');
const fieldAmount = document.querySelector('#amount');

const adds = document.querySelector('.adds');
adds.style.display = 'none';

let objectFood = {
    img: '',
    food: '',
    amount: 1
}

let foods = [];

cards.forEach(card => {
    card.addEventListener('click', addItem);
})

function addItem(e) {
    const food = e.target.children[1].textContent;
    const img = e.target.children[0].currentSrc;

    fieldItem.value = food;
    fieldImg.value = img;
}

function eventListeners() {
    form.addEventListener('submit', saveFood);

    document.addEventListener('DOMContentLoaded', () => {
        foods = JSON.parse(localStorage.getItem('foods')) || [];
        createCard(foods);
    })

}

function showMessage(message) {
    const pMessage = document.createElement('p');
    pMessage.textContent = message;
    pMessage.classList.add('message');

    const getMessage = document.querySelector('.message');
    if (getMessage !== null) {
        getMessage.remove();
    }

    form.appendChild(pMessage);

    setTimeout(() => {
        pMessage.remove();
    }, 1500);
}
function saveFood(e) {
    e.preventDefault();

    if (fieldItem.value !== '' && fieldAmount.value !== '') {
        showMessage('Success');

        objectFood = {
            img: fieldImg.value,
            food: fieldItem.value,
            amount: Number(fieldAmount.value),
        }


        //add all foods

        //filter the sames
        const foodSame = foods.some(card => card.food === fieldItem.value);

        if (foodSame) {
            const otherFoods = foods.map(card => {
                if (card.food === objectFood.food) {
                    card.amount++;
                    return card
                } else {
                    return card
                }
            });


            foods = [...otherFoods]
        } else {
            foods = [...foods, objectFood];
        }

        createCard(foods);

    }

    form.reset();

}

function cleanHtml() {
    while (adds.firstChild) {
        adds.removeChild(adds.firstChild);
    }
}


function createCard(foods) {

    adds.style.display = 'flex';
    cleanHtml();
    foods.forEach(element => {

        const { amount, food, img } = element;
        const divCard = document.createElement('div');
        divCard.classList.add('divCard');

        const imgCard = document.createElement('img');
        imgCard.src = img;

        const foodCard = document.createElement('p');
        foodCard.textContent = food;

        const amountCard = document.createElement('p');
        amountCard.textContent = amount;

        divCard.appendChild(imgCard);
        divCard.appendChild(foodCard);
        divCard.appendChild(amountCard);
        adds.appendChild(divCard);
    });

    sincronitationStorage(foods);
}

function sincronitationStorage() {
    localStorage.setItem('foods', JSON.stringify(foods));
}


eventListeners();
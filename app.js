const URL = "https://fakestoreapi.com/products"
const containerCards = document.getElementById("container-Cards")


const getAPI = async (URL) =>{
    const response = await fetch(URL);
    const data  = await response.json();
    return data;
}

const createCards = (clothes) =>{
const card = document.createElement("div"); 
card.classList.add("Clothes");

const imgCard = document.createElement("img");
imgCard.src = clothes.image
imgCard.alt = clothes.title

const containerDescription = document.createElement("div")
containerDescription.classList.add("container-description")

const nameClothes = document.createElement("h2")
nameClothes.textContent = clothes.title

const priceClothes = document.createElement("h3")
priceClothes.textContent = clothes.price

const shoppingClothes = document.createElement("button")
shoppingClothes.textContent = "Comprar" 

card.appendChild(imgCard)
card.appendChild(containerDescription)

containerDescription.appendChild(nameClothes)
containerDescription.appendChild(priceClothes)
containerDescription.appendChild(shoppingClothes)

containerCards.appendChild(card)
}

/*
const createClothes = (clothe) => {
    const card = document.createElement('div')
    card.classList.add('card')

    const imgClothe = document.createElement('img')
    imgClothe.src = clothe.image
    imgClothe.alt = clothe.title

    const divClothe = document.createElement('div')
    divClothe.classList.add('description-card')

    const descriptionClothe = document.createElement('h5')
    descriptionClothe.textContent = clothe.title

    const priceClothe = document.createElement('h4')
    priceClothe.textContent = `$${clothe.price}`

    const buttonAddCar = document.createElement('button')
    buttonAddCar.textContent = 'Añadir al Carrito';

    card.appendChild(imgClothe)

    card.appendChild(divClothe)
    divClothe.appendChild(descriptionClothe)
    divClothe.appendChild(priceClothe)
    divClothe.appendChild(buttonAddCar)

    containerCards.appendChild(card)
}
*/

const generateAllClothes = async() =>{
    const data = await getAPI(URL)
    data.forEach(clothes => createCards(clothes));
}

window.addEventListener("DOMContentLoaded",generateAllClothes )
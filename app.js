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

const generateAllClothes = async() =>{
    const data = await getAPI(URL)
    data.forEach(clothes => createCards(clothes));
}

window.addEventListener("DOMContentLoaded",generateAllClothes )
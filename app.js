const URL = "https://fakestoreapi.com/products";
const containerCards = document.getElementById("container-Cards");
let cart = JSON.parse(localStorage.getItem("cart")) || []; // Inicializa el carrito

const getAPI = async (URL) => {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
};

const createCards = (clothes) => {
    const card = document.createElement("div");
    card.classList.add("Clothes");

    const imgCard = document.createElement("img");
    imgCard.src = clothes.image;
    imgCard.alt = clothes.title;

    const containerDescription = document.createElement("div");
    containerDescription.classList.add("container-description");

    const nameClothes = document.createElement("h2");
    nameClothes.textContent = clothes.title;

    const priceClothes = document.createElement("h3");
    priceClothes.textContent = clothes.price;

    const shoppingClothes = document.createElement("button");
    shoppingClothes.textContent = "Comprar";
    shoppingClothes.onclick = () => addToCart(clothes); // Agregar evento para añadir al carrito

    card.appendChild(imgCard);
    card.appendChild(containerDescription);
    containerDescription.appendChild(nameClothes);
    containerDescription.appendChild(priceClothes);
    containerDescription.appendChild(shoppingClothes);

    containerCards.appendChild(card);
};
const addToCart = (clothes) => {
    cart.push(clothes);
    localStorage.setItem("cart", JSON.stringify(cart)); // Guarda el carrito en localStorage
    showCartModal(); // Muestra la modal con el carrito
};

const showCartModal = () => {
    const modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = ""; // Limpia el contenido anterior
    cart.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.textContent = `${item.title} - $${item.price}`;
        
        // Botón de eliminar
        const removeButton = document.createElement("button");
        removeButton.textContent = "";
        removeButton.onclick = () => {
            cart.splice(index, 1); // Elimina el producto del carrito
            localStorage.setItem("cart", JSON.stringify(cart)); // Actualiza el localStorage
            showCartModal(); // Actualiza la modal
        };
        
        itemDiv.appendChild(removeButton);
        modalBody.appendChild(itemDiv);
    });

    document.getElementById("jsModalCarrito").style.display = "block"; // Muestra la modal
};

// Finalizar Compra
document.getElementById("finalizarCompra").addEventListener('click', () => {
    alert("Su compra ha sido exitosa");
    cart = []; // Vaciar el carrito
    localStorage.setItem("cart", JSON.stringify(cart)); // Actualizar el localStorage
    document.getElementById("jsModalCarrito").style.display = "none"; // Cerrar modal
});


// Cerrar la modal
document.querySelector('.modal__close').addEventListener('click', () => {
    document.getElementById("jsModalCarrito").style.display = "none";
});

// Cerrar la modal al hacer clic fuera de ella
window.onclick = (event) => {
    const modal = document.getElementById("jsModalCarrito");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

const generateAllClothes = async () => {
    const data = await getAPI(URL);
    data.forEach(clothes => createCards(clothes));
};

window.addEventListener("DOMContentLoaded", generateAllClothes);

const URL = "https://fakestoreapi.com/products";
const containerCards = document.getElementById("container-Cards");
const verCarrito = document.getElementById("ver-carrito");
const modalContainer = document.getElementById("modal-container");
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
    priceClothes.textContent = `$${clothes.price}`;

    const shoppingClothes = document.createElement("button");
    shoppingClothes.textContent = "Comprar";
    shoppingClothes.onclick = () => addToCart(clothes);

    card.appendChild(imgCard);
    card.appendChild(containerDescription);
    containerDescription.appendChild(nameClothes);
    containerDescription.appendChild(priceClothes);
    containerDescription.appendChild(shoppingClothes);

    containerCards.appendChild(card);
};

const addToCart = (clothes) => {
    cart.push(clothes);
    localStorage.setItem("cart", JSON.stringify(cart)); // Guarda en localStorage
    verCarrito.click(); // Abre la modal automáticamente (opcional)
};

// Crear el fondo de la modal
const modalOverlay = document.createElement("div");
modalOverlay.classList.add("modal-overlay");
document.body.appendChild(modalOverlay);

verCarrito.addEventListener("click", () => {
    modalOverlay.style.display = "block"; // Muestra el fondo oscuro
    modalContainer.innerHTML = ""; // Limpia el contenido de la modal

    const modalHeader = document.createElement("div");
    modalHeader.classList.add("modal-header");
    modalHeader.innerHTML = `<h1 class="modal-header-title">Carrito</h1>`;
    modalContainer.append(modalHeader);

    const modalButton = document.createElement("h1");
    modalButton.innerText = "X";
    modalButton.className = "modal-header-button";
    modalButton.onclick = closeModal; // Usa la función para cerrar
    modalHeader.append(modalButton);

    if (cart.length === 0) {
        const emptyMessage = document.createElement("div");
        emptyMessage.textContent = "El carrito está vacío.";
        modalContainer.append(emptyMessage);
    } else {
        cart.forEach((clothes, index) => {
            const carritoContent = document.createElement("div");
            carritoContent.classList.add("modal-card");

            const imgCard = document.createElement("img");
            imgCard.src = clothes.image;
            imgCard.alt = clothes.title;

            const containerDescription = document.createElement("div");
            containerDescription.classList.add("container-description");

            const nameClothes = document.createElement("h2");
            nameClothes.textContent = clothes.title;

            const priceClothes = document.createElement("h3");
            priceClothes.textContent = `$${clothes.price}`;

            const removeButton = document.createElement("button");
            removeButton.innerText = "🗑 Eliminar";
            removeButton.onclick = () => {
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                verCarrito.click(); // Actualiza la modal al eliminar
            };

            containerDescription.appendChild(nameClothes);
            containerDescription.appendChild(priceClothes);
            containerDescription.appendChild(removeButton);
            carritoContent.appendChild(imgCard);
            carritoContent.appendChild(containerDescription);

            modalContainer.appendChild(carritoContent);
        });

        const total = cart.reduce((acc, el) => acc + parseFloat(el.price), 0);
        const totalbuying = document.createElement("div");
        totalbuying.className = "total-content";
        totalbuying.innerHTML = `Total a pagar: $${total.toFixed(2)}`;
        modalContainer.append(totalbuying);

        // Agregar botón de Finalizar Compra
        const finishButton = document.createElement("button");
        finishButton.classList.add("finishButton");
        finishButton.innerText = "Finalizar Compra";
        finishButton.onclick = () => {
            alert("Compra realizada con éxito!");
            cart = []; // Vaciar el carrito
            localStorage.setItem("cart", JSON.stringify(cart)); // Actualizar el localStorage
            closeModal(); // Cerrar la modal
        };


        modalContainer.append(finishButton); // Asegúrate de añadir el botón al contenedor de la modal
    }
    modalContainer.classList.add("show"); // Muestra la modal
});

const closeModal = () => {
    modalOverlay.style.display = "none"; // Oculta el fondo oscuro
    modalContainer.classList.remove("show"); // Oculta la modal
};
// Cierra la modal al hacer clic en el fondo oscuro
modalOverlay.addEventListener("click", closeModal);

const generateAllClothes = async () => {
    const data = await getAPI(URL);
    data.forEach(clothes => createCards(clothes));
};

window.addEventListener("DOMContentLoaded", generateAllClothes);

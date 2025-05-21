/*заглушка*/

// Массив игр со скидками (можно заменить на динамическую загрузку)
const discountedGames = [
    {
        title: "Forza Horizon 4",
        price: "1,299 ₽",
        discount: "-50%",
        image: "Forza.jpg",
        platforms: ["PC", "Xbox"],
        oldPrice: "2,599 ₽"
    },
    {
        title: "Terraria",
        price: "300 ₽",
        discount: "-70%",
        image: "teror.png",
        platforms: ["PC", "PS4", "Xbox", "Switch"],
        oldPrice: "1,000 ₽"
    },
    {
        title: "Assassin's Creed II",
        price: "999 ₽",
        discount: "-60%",
        image: "asas.PNG",
        platforms: ["PC", "PS4", "Xbox"],
        oldPrice: "2,499 ₽"
    },
    {
        title: "Pummel Party",
        price: "499 ₽",
        discount: "-30%",
        image: "i.webp",
        platforms: ["PC"],
        oldPrice: "713 ₽"
    }
];

// Функция для отображения игр со скидкой
function renderDiscountedGames() {
    const gamesContainer = document.getElementById('discounted-games');
    gamesContainer.innerHTML = '';

    discountedGames.forEach(game => {
        const platformsHTML = game.platforms.map(platform => 
            `<span class="platform-tag">${platform}</span>`
        ).join('');

        const gameElement = document.createElement('div');
        gameElement.className = 'game-card';
        gameElement.innerHTML = `
            <div><img src="${game.image}" alt="${game.title}" class="game-image"></div>
            <div class="game-info">
                <h3 class="game-title">${game.title}</h3>
                <div class="game-platforms">
                    ${platformsHTML}
                </div>
                <div class="game-price">
                    <span class="old-price">${game.oldPrice}</span>
                    <span class="price">${game.price}</span>
                    <span class="discount">${game.discount}</span>
                    <button class="add-to-cart">В корзину</button>
                </div>
            </div>
        `;
        gamesContainer.appendChild(gameElement);
    });

    // Инициализация кнопок "В корзину"
    document.querySelectorAll('.add-to-cart').forEach((button, index) => {
        button.addEventListener('click', function() {
            const game = discountedGames[index];
            addToCart(`sale-${index}`, game.title, game.price, game.image);
        });
    });
}

// Таймер обратного отсчета
function updateSaleTimer() {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 3); // +3 дня от текущей даты

    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = endDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

        if (distance < 0) {
            clearInterval(timer);
            document.querySelector('.sale-timer').innerHTML = '<p>Распродажа завершена!</p>';
        }
    }, 1000);
}

// Функции для работы с корзиной
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(gameId, title, price, imageSrc) {
    const game = {
        id: gameId,
        title: title,
        price: price,
        image: imageSrc
    };
    
    cart.push(game);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCounter();
    showNotification(`${title} добавлен(а) в корзину!`);
}

function updateCartCounter() {
    const counter = document.querySelectorAll('.cart-count');
    counter.forEach(el => {
        el.textContent = cart.length;
    });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    renderDiscountedGames();
    updateSaleTimer();
    updateCartCounter();
});
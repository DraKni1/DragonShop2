// Фильтрация
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Удаляем активный класс у всех кнопок
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        // Добавляем текущей
        btn.classList.add('active');

        const category = btn.dataset.category;
        const items = document.querySelectorAll('.item-card');

        items.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Добавление в корзину
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const card = this.closest('.item-card');
        const title = card.querySelector('h3').textContent;
        const price = card.querySelector('.item-price').textContent;
        const imageSrc = card.querySelector('.item-img').src;
        
        // Добавляем в корзину
        addToCart(`item-${Date.now()}`, title, price, imageSrc);
        
        // Показываем уведомление (как на главной)
        showNotification(`${title} добавлен в корзину! 🛒`);
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
    });
});

function addToCart(id, title, price, image) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ id, title, price, image });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCounter();
}

// Функция для обновления счетчика корзины
function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = cart.length;
    });
}

// Инициализация
document.addEventListener('DOMContentLoaded', updateCartCounter);


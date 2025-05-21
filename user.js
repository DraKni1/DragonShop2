
// Обновление шапки (без проверки пользователя)
function updateHeader() {
    updateCartCounter(); // Оставим только обновление счётчика корзины
}

// Обновление активных ссылок
function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        // Подсветка "Главная"
        if ((link.getAttribute('href') === 'сайт.html' || 
            link.getAttribute('href') === '/сайт.html') && 
            (currentPage === 'сайт.html' || currentPage === '')) {
            link.classList.add('active');
        }
        
        // Подсветка "Магазин"
        if (link.getAttribute('href') === '#games-section') {
            if (window.location.hash === '#games-section' || 
                currentPage === 'сайт.html') {
                link.classList.add('active');
            }
        }
        
        // Подсветка "Корзина"
        if (link.getAttribute('href') === 'card.html' && 
            currentPage === 'card.html') {
            link.classList.add('active');
        }
    });
}

// Обновление счетчика корзины
function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = cart.length;
    });
}


// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    updateHeader();
    
    // Обработчик для кнопки "Магазин"
    document.querySelector('nav a[href="#games-section"]')?.addEventListener('click', function(e) {
        if (!window.location.pathname.includes('сайт.html')) {
            e.preventDefault();
            window.location.href = 'сайт.html#games-section';
        }
    });
});

function filterGamesByPlatform(platform) {
  const games = document.querySelectorAll('.game-card');
  const platformButtons = document.querySelectorAll('.platform-filter');
  const gameGrid = document.querySelector('.game-grid');
  
  // Добавляем класс для анимации
  gameGrid.classList.add('filtering');
  
  // Удаляем активный класс со всех кнопок
  platformButtons.forEach(btn => btn.classList.remove('active'));
  
  // Если выбран "Сбросить фильтр"
  if (platform === 'all') {
      games.forEach(game => {
          game.classList.remove('hidden', 'highlight');
      });
      
      // Завершаем анимацию
      setTimeout(() => {
          gameGrid.classList.remove('filtering');
      }, 400);
      return;
  }
  
  // Добавляем активный класс к выбранной кнопке
  event.target.classList.add('active');
  
  // Фильтруем игры с задержкой для анимации
  setTimeout(() => {
      games.forEach(game => {
          const platforms = game.querySelectorAll('.platform-tag');
          let hasPlatform = false;
          
          platforms.forEach(tag => {
              if (tag.textContent.includes(platform)) {
                  hasPlatform = true;
              }
          });
          
          if (hasPlatform) {
              game.classList.remove('hidden');
              game.classList.add('highlight');
          } else {
              game.classList.add('hidden');
              game.classList.remove('highlight');
          }
      });
      
      // Завершаем анимацию
      gameGrid.classList.remove('filtering');
  }, 200);
}


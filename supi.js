// Обработка FAQ
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация FAQ
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const answer = item.querySelector('.faq-answer');
            
            // Закрываем все открытые ответы
            document.querySelectorAll('.faq-item').forEach(faqItem => {
                if (faqItem !== item) {
                    faqItem.querySelector('.faq-question').classList.remove('active');
                    faqItem.querySelector('.faq-answer').style.maxHeight = null;
                }
            });
            
            // Переключаем текущий элемент
            question.classList.toggle('active');
            
            if (question.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = null;
            }
        });
    });
    
    // Обработка формы поддержки
    const supportForm = document.getElementById('supportForm');
    if (supportForm) {
        supportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Здесь можно добавить отправку формы на сервер
            alert('Ваше сообщение отправлено! Мы ответим вам в ближайшее время.');
            supportForm.reset();
        });
    }
    
    // Обработка кнопки открытия чата
    const openChatBtn = document.getElementById('open-chat');
    if (openChatBtn) {
        openChatBtn.addEventListener('click', function() {
            // Создаем модальное окно чата, если его нет
            let chatModal = document.querySelector('.chat-modal');
            
            if (!chatModal) {
                chatModal = document.createElement('div');
                chatModal.className = 'chat-modal';
                chatModal.innerHTML = `
                    <div class="chat-header">
                        <h3>Онлайн-чат поддержки</h3>
                        <button class="close-chat">×</button>
                    </div>
                    <div class="chat-body">
                        <div class="chat-message support">
                            <p>Здравствуйте! Чем мы можем вам помочь?</p>
                        </div>
                    </div>
                    <div class="chat-input">
                        <input type="text" placeholder="Введите сообщение...">
                        <button>→</button>
                    </div>
                `;
                
                document.body.appendChild(chatModal);
                
                // Обработка закрытия чата
                const closeChatBtn = chatModal.querySelector('.close-chat');
                closeChatBtn.addEventListener('click', function() {
                    chatModal.style.display = 'none';
                });
                
                // Обработка отправки сообщения
                const chatInput = chatModal.querySelector('.chat-input input');
                const chatSendBtn = chatModal.querySelector('.chat-input button');
                const chatBody = chatModal.querySelector('.chat-body');
                
                function sendMessage() {
                    const message = chatInput.value.trim();
                    if (message) {
                        // Добавляем сообщение пользователя
                        const userMessage = document.createElement('div');
                        userMessage.className = 'chat-message user';
                        userMessage.innerHTML = `<p>${message}</p>`;
                        chatBody.appendChild(userMessage);
                        
                        // Очищаем поле ввода
                        chatInput.value = '';
                        
                        // Прокручиваем вниз
                        chatBody.scrollTop = chatBody.scrollHeight;
                        
                        // Имитируем ответ поддержки
                        setTimeout(() => {
                            const supportMessage = document.createElement('div');
                            supportMessage.className = 'chat-message support';
                            supportMessage.innerHTML = `<p>Мы получили ваше сообщение. Ожидайте ответа оператора.</p>`;
                            chatBody.appendChild(supportMessage);
                            chatBody.scrollTop = chatBody.scrollHeight;
                        }, 1000);
                    }
                }
                
                chatSendBtn.addEventListener('click', sendMessage);
                chatInput.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        sendMessage();
                    }
                });
            }
            
            // Показываем чат
            chatModal.style.display = 'block';
        });
    }
    
    // Обновляем счетчик корзины
    updateCartCounter();
});

// Функция для обновления счетчика корзины
function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = cart.length;
    });
}
document.addEventListener('DOMContentLoaded', () => {

    showNotifMessage("Welcome to Kouri's Curios!");
    
    // Load products from admin(local storage)
    const itemsContainer = document.querySelector('.item-list');
    const storedItems = JSON.parse(localStorage.getItem('items')) || [];

    storedItems.forEach(items => {
        const item = document.createElement('div');
        item.classList.add('item');
        item.setAttribute('data-category', item.category);

        item.innerHTML = `
            <img src="${items.image}" alt="${items.title}">
            <h1 class="item-title">${items.title}</h1>
            <div class="item-price">
                <div class="price">${items.price}</div>
                <i class="fa-solid fa-plus add-to-basket"></i>
            </div>
        `;
        itemsContainer.appendChild(item);
    });

    // Notification method
    function showNotifMessage(message) {
        const notifMessage = $('<div></div>').addClass('notif-message').text(message);

        $('body').append(notifMessage);

        setTimeout(() => {
            notifMessage.css('opacity', '0');
            setTimeout(() => {
                notifMessage.remove();
            }, 500);
        }, 1000);
    }

    const allButton = document.querySelector('#category button[data-category="All"]');
    if (allButton) {
        allButton.classList.add('active');
    }

    // Category filter functionality
    const categoryButtons = document.querySelectorAll('#category button');
    const items = document.querySelectorAll('.item');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active'); 

            const category = button.getAttribute('data-category');
            items.forEach(item => {
                if (category === "All" || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Transaction
    const addToBasketButtons = document.querySelectorAll('.add-to-basket');
    const basketItemCount = document.querySelector('.basket-icon span');
    const basketItemsList = document.querySelector('.basket-items');
    const basketTotal = document.querySelector('.basket-total');
    const basketIcon = document.querySelector('.basket-icon');
    const sidebar = document.getElementById('sidebar');

    let basketItems = JSON.parse(localStorage.getItem('basket')) || [];
    let totalAmount = basketItems.reduce((sum, item) => sum + item.price * item.quantity, 0);


    function updateBasketUI() {
        updateBasketItemCount(basketItems.length);
        updateBasketItemList();
        updateBasketTotal();
    }

    function updateBasketItemCount(count) {
        basketItemCount.textContent = count;
    }

    function updateBasketItemList() {
        basketItemsList.innerHTML = '';
        basketItems.forEach((item, index) => {
            const basketItem = document.createElement('div');
            basketItem.classList.add('basket-item', 'individual-basket-item');
            basketItem.innerHTML = `
                <span> (${item.quantity}x) ${item.name}</span>
                <span class="basket-item-price">${(item.price * item.quantity % 1 === 0 ? item.price * item.quantity : (item.price * item.quantity).toFixed(2))} Gold
                <button class="remove-btn" data-index="${index}"><i class="fa-solid fa-times"></i></button>
                </span>
            `;
            basketItemsList.append(basketItem);
        });

        const removeButtons = document.querySelectorAll('.remove-btn');
        removeButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.dataset.index;
                removeItemFromBasket(index);
            });
        });
    }

    function removeItemFromBasket(index) {
        const removeItem = basketItems.splice(index, 1)[0];
        totalAmount -= removeItem.price * removeItem.quantity;
        updateBasketUI();
    }

    function updateBasketTotal() {
        basketTotal.textContent = `${(totalAmount % 1 === 0 ? totalAmount : totalAmount.toFixed(2))} Gold`;
        localStorage.setItem('basket', JSON.stringify(basketItems));  // Save to localStorage
    }

    //Add to basket
    addToBasketButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const item = {
                name: document.querySelectorAll('.item .item-title')[index].textContent,
                price: parseFloat(document.querySelectorAll('.price')[index].textContent.replace(' Gold', '')),
                quantity: 1,
                image: document.querySelectorAll('.item img')[index].src
            };

            const existingItem = basketItems.find(basketItem => basketItem.name === item.name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                basketItems.push(item);
            }

            showNotifMessage('Item added to basket!');

            totalAmount += item.price;
            updateBasketUI();
        });
    });

    //Buy button
    const buyButton = document.querySelector('.buy-btn');

    buyButton.addEventListener('click', () => {
        if (basketItems.length > 0) {
            showNotifMessage('Thank you for your purchase!');

            basketItems = [];
            totalAmount = 0;

            updateBasketUI();
        } else {
            showNotifMessage('Your basket is empty!');
        }
    });

    // Open and close sidebar
    basketIcon.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    const closeButton = document.querySelector('.sidebar-close');
    closeButton.addEventListener('click', () => {
        sidebar.classList.remove('open');
    });


    updateBasketUI();
});

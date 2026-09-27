$(document).ready(function() {
    displayItems();
    showNotifMessage('Welcome Admin!');

    $('#item-form').submit(function(e) {
        e.preventDefault();

        const priceValue = $('#item-price').val();

        if (priceValue.length > 6 || priceValue > 999999) {
            showNotifMessage('Price must be a maximum of 6 digits!');
            return;
        }

        const item = {
            image: $('#item-image').val(),
            title: $('#item-title').val(),
            price: `${$('#item-price').val()} Gold`,
            category: $('#item-category').val()
        };

        let items = JSON.parse(localStorage.getItem('items')) || [];
        items.push(item);
        localStorage.setItem('items', JSON.stringify(items));

        showNotifMessage('Item added to store!');
        $(this)[0].reset();
        displayItems();
    });
});

function displayItems() {
    const itemList = $('#item-list');
    const itemListContainer = $('.item-list-container');
    const items = JSON.parse(localStorage.getItem('items')) || [];

    itemList.html('');

    if (items.length === 0) {
        itemListContainer.hide();
    } else {
        itemListContainer.show();

        items.forEach(function(item, index) {
            const itemDiv = $('<div></div>');
            itemDiv.html(`
                <img src="${item.image}" alt="${item.title}" class="item-img"><br>
                <h3 class="item-title">${item.title}</h3>
                <p class="item-price">${item.price}</p>
                <p class="item-category">${item.category}</p>
                <button onclick="removeItem(${index})" class="remove-item-btn"><i class="fa-solid fa-trash"></i></button>
            `);

            itemList.append(itemDiv);
        });
    }
}

function removeItem(index) {
    let items = JSON.parse(localStorage.getItem('items')) || [];
    items.splice(index, 1);
    localStorage.setItem('items', JSON.stringify(items));
    showNotifMessage('Item removed from store!');
    displayItems();
}

function showNotifMessage(message) {
    const notifMessage = $('<div></div>');
    notifMessage.addClass('notif-message');
    notifMessage.text(message);

    $('body').append(notifMessage);

    setTimeout(function() {
        notifMessage.css('opacity', '0');
        setTimeout(function() {
            notifMessage.remove();
        }, 500);
    }, 1000);
}
$(document).ready(function() {
    $('#login-btn').click(function() {
        const email = $('#email').val().trim();
        const password = $('#password').val().trim();

        const adminEmail = "kouri@admin.com";
        const adminPassword = "iceicebaby";

        const storeEmail = "user@user.com";
        const storePassword = "user123";

        if (email === adminEmail && password === adminPassword) {
            window.location.href = "admin.html";
        } else if (email === storeEmail && password === storePassword) {
            window.location.href = "store.html";
        } else {
            showNotifMessage("Invalid email or password. Please try again.");
        }
    });
});

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
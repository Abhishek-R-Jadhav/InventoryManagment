function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    cartItems.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = '<li class="list-group-item">Your cart is empty.</li>';
        return;
    }

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        cartItems.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <strong>${item.name}</strong><br>
                    <button class="btn btn-sm btn-danger" onclick="updateQty(${item.id}, -1)">-</button>
                    <span class="mx-2">${item.quantity}</span>
                    <button class="btn btn-sm btn-success" onclick="updateQty(${item.id}, 1)">+</button>
                </div>
                <div>₹${item.price * item.quantity}</div>
            </li>
        `;
    });

    cartTotal.innerText = total;
}

function updateQty(id, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const item = cart.find(i => i.id === id);
    if (!item) return;

    item.quantity += change;
    if (item.quantity <= 0) {
        cart = cart.filter(i => i.id !== id);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

window.onload = loadCart;
function proceedToCheckout() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        Swal.fire({
            icon: "warning",
            title: "Cart is empty",
            text: "Please add items before checking out.",
        });
        return;
    }

    // Optional: Check payment method
    const paymentMethod = document.getElementById("paymentMethod").value;
    if (!paymentMethod) {
        Swal.fire({
            icon: "warning",
            title: "Select Payment Method",
            text: "Please choose a payment method before checkout.",
        });
        return;
    }

    // Clear cart and redirect
    localStorage.removeItem("cart");

    Swal.fire({
        icon: "success",
        title: "Order Placed!",
        text: "Your order has been successfully placed.",
        timer: 2000,
        showConfirmButton: false
    }).then(() => {
        window.location.href = window.location.href = "/inventoryManagment/customer/status.html";
    });
}

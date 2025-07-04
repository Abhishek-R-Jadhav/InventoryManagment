function proceedToCheckout() {
    const orderId = localStorage.getItem("orderId"); // ✅ FIX HERE
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (!cart.length) return alert("Cart is empty");

    if (orderId) {
        // If order exists, update it
        updateExistingOrder(orderId, cart);
    } else {
        // New Order flow
        const data = {
            customerName: document.getElementById("customerName").value,
            customerPhone: document.getElementById("customerPhone").value,
            paymentMethod: document.getElementById("paymentMethod").value,
            tableId: Number(document.getElementById("tableId").innerText),
            totalAmount: Number(document.getElementById("cartTotal").innerText),
            cartItems: cart.map(item => ({
                menuItemId: item.id,
                quantity: item.quantity,
                price: item.price
            }))
        };

        fetch("/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(order => {
            localStorage.setItem("orderId", order.id);
            showOrderStatus(order.status);
            setTimeout(() => location.reload(), 2000);
        })
        .catch(err => alert("Checkout failed"));
    }
}

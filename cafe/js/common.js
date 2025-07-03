
function getTableId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('tableId') || document.getElementById("tableId")?.innerText;
}

function updateCartCount(count) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = count ?? cart.reduce((sum, item) => sum + item.quantity, 0);
    const el = document.getElementById("cart-count") || document.getElementById("cartCount");
    if (el) {
        el.innerText = total;
        el.style.display = total > 0 ? "inline-block" : "none";
    }
}

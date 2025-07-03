let pendingDeleteItem = null;

function deleteItem(menuItemId, itemIndex) {
  const orderId = localStorage.getItem("orderId");
  if (!orderId) {
    alert("Order ID not found. Please place an order first.");
    return;
  }

  // Store the pending item for delete
  pendingDeleteItem = { orderId, menuItemId, itemIndex };

  // Show confirmation card
  document.getElementById("deleteConfirmCard").style.display = "block";
}

// Confirm delete
document.getElementById("btnConfirmDelete").addEventListener("click", function () {
  const { orderId, menuItemId, itemIndex } = pendingDeleteItem;
  fetch(`/api/orders/${orderId}/items/${menuItemId}`, {
    method: "DELETE",
  })
    .then(response => response.json())
    .then(data => {
      // Hide modal
      document.getElementById("deleteConfirmCard").style.display = "none";

      // Remove item from local cart
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.splice(itemIndex, 1);
      localStorage.setItem("cart", JSON.stringify(cart));

      renderCart();
      updateCartCount();

      let tableId = getTableId();
      if (tableId) checkOrderStatus(tableId);
    })
    .catch(err => {
      alert("Error deleting item");
      console.error(err);
    });
});

// Cancel delete
document.getElementById("btnCancelDelete").addEventListener("click", function () {
  document.getElementById("deleteConfirmCard").style.display = "none";
  pendingDeleteItem = null;
});

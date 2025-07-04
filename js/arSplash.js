document.addEventListener("DOMContentLoaded", function () {
    const arMenu = document.getElementById("ar-menu-container");
    const customerForm = document.getElementById("customerFormSection");
    const logoName = document.getElementById("logoName");

    arMenu.style.display = "flex";
    customerForm.style.display = "none";
    logoName.style.display = "none";

    const tableId = getTableId();
    // arSplash.js
if (!tableId) {
  // No table → show splash then form
  setTimeout(() => {
    arMenu.style.display = "none";
    customerForm.style.display = "block";
    logoName.style.display = "block";
  }, 2000);
} else {
  // Table present → show splash then check order
  setTimeout(() => {
    arMenu.style.display = "none";
    logoName.style.display = "block";
    checkOrderStatus(tableId);  // 🔥 this handles hiding form or not
  }, 2000);
}
const orderId = localStorage.getItem("orderId");
    const checkoutBtn = document.getElementById("btn-checkout");

    if (orderId && checkoutBtn) {
        checkoutBtn.innerText = "Update Order";
    }

});

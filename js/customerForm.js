document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("customerForm");
    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault();
            console.log("form submitted");

            let name = document.getElementById("customerName").value;
            let phone = document.getElementById("customerPhone").value;

            localStorage.setItem("customerName", name);
            localStorage.setItem("customerPhone", phone);

            // ✅ Correct redirection
            window.location.href = "customer/menu1.html";
        });
    }
});


function showCustomerForm() {
    document.getElementById("customerFormSection").style.display = "block";
    document.getElementById("menuSection").style.display = "none";
    document.getElementById("cartSection").style.display = "none";
    document.getElementById("orderStatusSection").style.display = "none";
    document.getElementById("footerNav").style.display="none";
}

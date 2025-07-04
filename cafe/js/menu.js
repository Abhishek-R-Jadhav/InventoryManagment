    $(window).on('load', function () {
        var $grid = $('.grid').isotope({
            itemSelector: '.all',
            percentPosition: true,
            masonry: { columnWidth: '.all' }
        });

        // Delay layout for stability
        setTimeout(() => $grid.isotope('layout'), 100);

        // Category filter
        $('.filters_menu li').click(function () {
            $('.filters_menu li').removeClass('active');
            $(this).addClass('active');

            var filterValue = $(this).attr('data-filter');
            $grid.isotope({ filter: filterValue });
        });
    });

    // Show current date
    const dateEl = document.getElementById("currentDate");
    const clockEl = document.getElementById("liveClock");

    function updateDateTime() {
      const now = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      dateEl.textContent = now.toLocaleDateString('en-IN', options);

      const time = now.toLocaleTimeString('en-IN');
      clockEl.textContent = time;
    }


document.addEventListener("DOMContentLoaded", function () {
  const arMenu = document.getElementById("ar-menu-container");
  const customerForm = document.getElementById("customerFormSection");
  const logoName = document.getElementById("logoName");

  arMenu.style.display = "flex";
  customerForm.style.display = "none";
  logoName.style.display = "none";

  const tableId = getTableId();

  if (!tableId) {
    console.warn("Table ID not found. Showing form fallback.");
    setTimeout(() => {
      arMenu.style.display = "none";
      customerForm.style.display = "block";
      logoName.style.display = "block";
    }, 2000);
    return;
  }

  // Check order status immediately
  fetch(`/api/orders/status?tableId=${tableId}`)
    .then(response => {
      if (!response.ok) throw new Error("Invalid response");
      return response.json();
    })
    .then(order => {
      console.log("Order Status:", order.status);

      if (order.status === "Completed" || order.status === "Cancel" || order.status === "No Active Order") {
        // No active order: Show customer form after AR menu splash
        setTimeout(() => {
          arMenu.style.display = "none";
          customerForm.style.display = "block";
          logoName.style.display = "block";
        }, 2000);
      } else {
        // Active order: Show status directly
        arMenu.style.display = "none";
        customerForm.style.display = "none";
        logoName.style.display = "block";
        showOrderStatus(order.status);
        document.getElementById("orderStatusSection").style.display = "block";

        if (order.orderItems) {
          const cartItems = order.orderItems.map(item => ({
            id: item.itemId,
            name: item.itemName,
            price: item.itemPrice,
            quantity: item.quantity
          }));
          localStorage.setItem("cart", JSON.stringify(cartItems));
          localStorage.setItem("orderId", order.orderId);
          renderCart();
          updateCartCount(cartItems.reduce((sum, i) => sum + i.quantity, 0));
        }
      }
    })
    .catch(error => {
      console.error("Order fetch failed:", error);
      setTimeout(() => {
        arMenu.style.display = "none";
        customerForm.style.display = "block";
        logoName.style.display = "block";
      }, 2000);
    });
    window.location.href = `/customer/scan/${getTableId()}`;
});




function getTableId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('tableId') || document.getElementById("tableId")?.value;
}


function checkOrderStatus(tableId) {
    fetch(`/api/orders/status?tableId=${tableId}`)
        .then(response => response.json())
        .then(order => {
            console.log("Fetched Order Status:", order.status);

            if (order.status === "Completed" || order.status === "Cancel" || order.status === "No Active Order") {
                localStorage.removeItem("cart");
                localStorage.removeItem("orderId");
                showCustomerForm();
            } else {
                showOrderStatus(order.status);
                document.getElementById("customerFormSection").style.display = "none";
                document.getElementById("orderStatusSection").style.display = "block";
                document.getElementById("menuSection").style.display = "none";
                document.getElementById("cartSection").style.display = "none";
                localStorage.setItem("orderId", order.orderId);
                console.log("this is showing from the checkOrderStatus ID :" +order.orderId)

                if (order.orderItems) {
                    let cartItems = order.orderItems.map(item => ({
                        id: item.itemId,
                        name: item.itemName,
                        price: item.itemPrice,
                        quantity: item.quantity
                    }));
                    localStorage.setItem("cart", JSON.stringify(cartItems));
                    renderCart();

                    let cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
                    updateCartCount(cartCount);

                    // Show "Edit your Order" button only for "Pending" or "Accepted" status
                    if (order.status === "Pending" || order.status === "Accepted") {
                        document.getElementById("btnAddMoreItems").style.display = "block";
                    } else {
                        document.getElementById("btnAddMoreItems").style.display = "none";
                    }
                }
            }
        })
        .catch(error => {
            console.error("Error fetching order status:", error);
            alert("Failed to fetch order status.");
        });
}

// Function to update cart count display
function updateCartCount(count) {
    let cartCountElement = document.getElementById("cartCount");
    if (cartCountElement) {
        cartCountElement.innerText = count; // Update cart count
        cartCountElement.style.display = count > 0 ? "inline-block" : "none"; // Hide if 0
    }
}

function showMoreItems(){
    document.getElementById("footerNav").style.display="block";
    document.getElementById("menuSection").style.display = "block";
    document.getElementById("customerDisplayName").style.display = "none";
    document.getElementById("customerFormSection").style.display = "none";
    document.getElementById("cartSection").style.display = "none";
    document.getElementById("orderStatusSection").style.display = "none";
    
}

setInterval(() => {
    let tableId = getTableId();
    if (tableId) {
        checkOrderStatus(tableId);
    }
}, 10000);

function showCustomerForm() {
    document.getElementById("customerFormSection").style.display = "block";
    document.getElementById("menuSection").style.display = "none";
    document.getElementById("cartSection").style.display = "none";
    document.getElementById("orderStatusSection").style.display = "none";
    document.getElementById("footerNav").style.display="none";
}

function showOrderStatus(status) {
    document.getElementById("orderStatusSection").style.display = "block";
    document.getElementById("orderStatusMessage").innerText = `${status}`;
    document.getElementById("customerFormSection").style.display = "none";
    document.getElementById("menuSection").style.display = "none";
    document.getElementById("cartSection").style.display = "none";
}
        
        document.getElementById("customerForm").addEventListener("submit", function(event) {
        event.preventDefault();
        console.log("form submitted");
        let name = document.getElementById("customerName").value;
        let phone = document.getElementById("customerPhone").value;
        
        localStorage.setItem("customerName", name);
        localStorage.setItem("customerPhone", phone);
        
        window.location.href = "/customer/menu1.html";
        });
        
        
        function addToCart(id, name, price) {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            let existingItem = cart.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ id, name, price, quantity: 1 });
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();
            alert(name + " added to cart!");
        }
        
        function updateCartCount() {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            let totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
            document.getElementById("cart-count").innerText = totalCount;
        }
        
        function goToCart() {
                document.getElementById("menuSection").style.display = "none";
            document.getElementById("cartSection").style.display = "block";
            renderCart();
        }
        
        function goToMenu() {
                document.getElementById("menuSection").style.display = "block";
            document.getElementById("cartSection").style.display = "none";
        }
        
        function renderCart() {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            let cartList = document.getElementById("cartItems");
            cartList.innerHTML = "";
            let total = 0;
            let orderId = localStorage.getItem("orderId");
        
            cart.forEach((item, index) => {
                total += item.price * item.quantity;
                cartList.innerHTML += `
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        ${item.name} (x${item.quantity}) - ₹${item.price * item.quantity}
                        <div>
                            <button class="btn btn-sm btn-success" onclick="changeQuantity(${index}, 1)">+</button>
                            <button class="btn btn-sm btn-danger" onclick="changeQuantity(${index}, -1)">-</button>
                            <button class="btn btn-sm btn-outline-danger" onclick="deleteItem(${item.id}, ${index})">
                                Delete
                            </button>
                        </div>
                    </li>`;
            });
        
            document.getElementById("cartTotal").innerText = total;
        }
        function proceedToCheckout() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        let orderId = localStorage.getItem("orderId");

        let orderData = {
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

        if (orderId) {
            updateExistingOrder(orderId, cart);
        } else {
            fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData)
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => {
                        throw new Error(err.message || "Server error");
                    });
                }
                return response.json();
            })
            .then(order => {
                localStorage.setItem("orderId", order.id);
                showOrderStatus(order.status);
                document.getElementById("orderStatusSection").style.display = "block";
                setTimeout(() => {
                    location.reload();
                }, 2000);
            })
            .catch(error => {
                console.error("Error placing order:", error);
                alert("Error placing order: " + error.message);
            });
        }
    }
        function saveOrderToDatabase(cart, totalAmount, customerName, paymentMethod, tableId) {
        let orderData = {
        customerName: customerName,
        paymentMethod: paymentMethod,
        totalAmount: totalAmount,
        tableId: tableId, // Use the correct table ID dynamically
        cartItems: cart.map(item => ({
            menuItemId: item.id,
            quantity: item.quantity,
            price: item.price
        }))
        };
        
        fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
        })
        .then(response => response.json())
        .then(order => {
        alert("Order placed successfully!");
        document.getElementById("order-id").value = order.id; // Store order ID for status tracking
        fetchOrderStatus(order.id); // Start checking order status
        })
        .catch(error => console.error("Error saving order:", error));
        }
        

        function generateQR(amount) {
        let upiID = "aj27122002@oksbi";  // Replace with your actual UPI ID
        let name = "Abhishek Jadhav";  // Replace with your name
        
        if (!amount || isNaN(amount) || amount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }
        
        let upiURL = `upi://pay?pa=${upiID}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR`;
        let qrImageURL = `https://quickchart.io/qr?text=${encodeURIComponent(upiURL)}&size=250`;
        
        document.getElementById("qrCode").src = qrImageURL + "&timestamp=" + new Date().getTime();
        document.getElementById("qrContainer").style.display = "block";
        }

        function changeQuantity(index, delta) {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            if (cart[index]) {
                cart[index].quantity += delta;
                if (cart[index].quantity <= 0) {
                    cart.splice(index, 1);
                }
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCartCount();
                renderCart();
            }
        }

        function addMoreItems() {
    let selectedItems = [];
    document.querySelectorAll("input[name='items']:checked").forEach((checkbox) => {
        selectedItems.push({ id: checkbox.value });
    });

    fetch(`/api/orders/${localStorage.getItem("orderId")}/add-items`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedItems),
    })
    .then(response => response.json())
    .then(data => {
        alert("Items added successfully!");
        // Update the cart with the new order items
        let tableId = getTableId();
        if(tableId){
            checkOrderStatus(tableId);
        }
        closeModal();
    })
    .catch(error => console.error("Error:", error));
}
        // This function sends the updated order to the backend for an existing order.
        function updateExistingOrder(orderId, cart) {
        let updatedItems = cart.map(item => ({
            itemId: item.id,
            quantity: item.quantity
        }));
        console.log("Updated item in order ", updatedItems, orderId);

        fetch("/api/orders/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                orderId: orderId,
                updatedItems: updatedItems
            })
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => {
                    throw new Error(err.message || "Server error");
                });
            }
            return response.json();
        })
        .then(data => {
            Swal.fire({
                title: "Order Updated!",
                text: "Your order has been updated successfully.",
                icon: "success",
                confirmButtonText: "OK"
            }).then((result) => {
                if (result.isConfirmed) {
                    setTimeout(() => {
                        location.reload();
                    }, 2000);
                }
            });
        })
        .catch(error => {
            console.error("Error updating order:", error);
            alert("Error updating order: " + error.message);
        });
    }

// Modified proceedToCheckout() function that checks if there's an existing order.
// If yes, it updates the order; if not, it creates a new order.
function proceedToCheckout() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    
    let orderId = localStorage.getItem("orderId"); // Assume this is stored when an order is first created/fetched.
    
    let orderData = {
        customerName: document.getElementById("customerName").value,
        customerPhone:  document.getElementById("customerPhone").value,
        paymentMethod:  document.getElementById("paymentMethod").value,
        tableId: Number(document.getElementById("tableId").innerText),
        totalAmount: Number(document.getElementById("cartTotal").innerText),
        cartItems: cart.map(item => ({
            menuItemId: item.id,
            quantity: item.quantity,
            price: item.price
        }))
    };

    // If orderId exists, update the existing order instead of creating a new one.
    if (orderId) {
        updateExistingOrder(orderId, cart);
        document.getElementById("btn-checkout").innerText = "Update";
    } else {
        // Create new order if no existing order is found.
        fetch("/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => {
                    throw new Error(err.message || "Server error");
                });
            }
            return response.json();
        })
        .then(order => {
            // Save the order ID for future modifications
            localStorage.setItem("orderId", order.id);
        })
        .catch(error => {
            console.error("Error placing order:", error);
            alert("Error placing order: " + error.message);
        });

        Swal.fire({
            title: "Order Placed!",
            text: "Your order has been placed successfully.",
            icon: "success",
            confirmButtonText: "OK"
        }).then((result) => {
            if (result.isConfirmed) {
                // Show order status div and refresh the page
                document.getElementById("orderStatusSection").style.display = "block";
                setTimeout(() => {
                    location.reload();
                }, 2000);
            }
        });
    }
}
function deleteItem(menuItemId, itemIndex) {
    let orderId = localStorage.getItem("orderId");
    console.log(orderId)
    if (!orderId) {
        alert("Order ID not found. Please place an order first.");
        return;
    }

    if (confirm('Are you sure you want to delete this item?')) {
        fetch(`/api/orders/${orderId}/items/${menuItemId}`, {
            method: "DELETE",
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert("Item deleted successfully!"); //Optional alert
            // Update the cart in localStorage
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.splice(itemIndex, 1); //Remove the item from the local cart
            localStorage.setItem("cart", JSON.stringify(cart));
            // Re-render the cart
            renderCart();
            updateCartCount();

            // Update the order status, so the backend cart is reflected in the front end cart.
            let tableId = getTableId();
            if(tableId){
                checkOrderStatus(tableId);
            }
        })
        .catch(error => {
            console.error("Error deleting item:", error);
            alert("Failed to delete item");
            
        });
    }
}

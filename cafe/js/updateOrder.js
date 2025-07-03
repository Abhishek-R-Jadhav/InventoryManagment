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

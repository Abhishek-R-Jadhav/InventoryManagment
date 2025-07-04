$(document).ready(function () {
    // Initialize Isotope
    var $grid = $('.grid').isotope({
      itemSelector: '.food_section',
      layoutMode: 'fitRows'
    });

    // Filter on category click
    $('.filters_menu').on('click', 'li', function () {
      var filterValue = $(this).attr('data-filter');
      $grid.isotope({ filter: filterValue });

      // Highlight the active filter
      $('.filters_menu li').removeClass('active');
      $(this).addClass('active');
    });
  });

function addToCart(id, name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("Item added to cart:", cart);
    Swal.fire({
        icon: 'success',
        title: 'Added to cart',
        showConfirmButton: false,
        timer: 800
    });
}

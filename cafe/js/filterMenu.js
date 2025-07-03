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
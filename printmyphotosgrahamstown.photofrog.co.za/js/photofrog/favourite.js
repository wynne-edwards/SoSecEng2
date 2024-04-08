
function updatePage(key, count) {
    $('#' + key).find('.favourite-exist').removeClass('hidden');
    $('#' + key).find('.favourite-not').addClass('hidden');

    if (count !== false) {
        $('.favourite-empty').addClass('hidden');
        $('.favourite-action').removeClass('hidden');
        $('.favourite-counter').html(count);
    }
}

function addFavourite(endpoint, target) {

    var button = $(target);

    if (!button.attr('data-key') || button.attr('data-key') === undefined) {
        // hack to catch clicks on the icon inside the button
        button = $(target).parent();
    }

    var key = button.attr('data-key');
    var spinner = button.find('span');

    spinner.removeClass('fa-shopping-cart').addClass('fa-circle-notch fa-spin')

    $.post(endpoint + '/ajax/favourite/add', { key: key })
        .done(function(body) {

            if (body.result !== true) {
                spinner.addClass('fa-exclamation-triangle');
                button.attr('title', 'Unexpected response');
                return false;
            }

            updatePage(key, body.count);

        }).fail(function(error) {

            spinner.addClass('fa-exclamation-triangle');

            if (error.responseJSON) {
                button.attr('title', error.responseJSON.message);
            } else {
                button.attr('title', 'Error ' + error.status);
            }
        
        }).always(function() {

            spinner.removeClass('fa-circle-notch fa-spin').addClass('fa-shopping-cart')

        });
}

$(document).ready(function() {

    var endpoint = $('body').attr('data-basepath');

    $('.favourite-add').on('click', function(e) {

        addFavourite(endpoint, e.target);

    });
});
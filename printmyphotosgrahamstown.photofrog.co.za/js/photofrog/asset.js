
function updateAssetCount(endpoint, target, params) {

    var text = target.text();

    target.text(target.text() + ' (...)');

    $.get(endpoint + '/ajax/asset/count/', params)
        .done(function(body) {

            if (body.count === undefined) {
                return false;
            }

            target.text(text + ' (' + body.count + ')');

        }).fail(function(error) {

            target.text(text + ' (!)');
        
        });
}

$(document).ready(function() {

    var endpoint = $('body').attr('data-basepath');
    var album = $('select[name="album"] option:selected');
    var container = $('form[data-container]').attr('data-container');

    $('select[name="hour"]').find('option').each(function () {

        if (this.value == '') {
            return true;
        }

        var params = {
            container: container,
            album: album.val(),
            hour: this.value,
        };

        updateAssetCount(endpoint, $(this), params);

    });

    $('select[name="album"] > option').each(function () {

        if (this.value == '') {
            return true;
        }

        var params = {
            container: container,
            album: this.value,
        };

        updateAssetCount(endpoint, $(this), params);

    });

});

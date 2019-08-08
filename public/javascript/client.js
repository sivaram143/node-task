$(function()
{   
    function prepareForm(envs) {
        var form = $.parseHTML('<div class="entry"></div>');

        envs.forEach(function (env, index) {

            var isLast = false;

            if (envs.length == (index+1))
                isLast = true;

            var key = $.parseHTML(
                '<div class="form-group">' +
                    '<label class="text-primary" >Key</label>' +
                    '<input class="form-control" type="text"  id="key'+ index +'" value="'+ env.key +'" />' +
                '</div>'
            );
            var value = $.parseHTML(
                '<div class="form-group">' +
                    '<label class="text-primary" >Value</label>' +
                    '<input class="form-control" type="text" id="value'+ index +'" value="'+ env.value +'" />' +
                '</div>'
            );

            var ticker = $.parseHTML(
                '<div class="form-group">' +
                    '<button class="btn '+ (isLast ? 'btn-add btn-primary' : 'btn-remove btn-danger') +'" type="submit">' +
                        '<span class="glyphicon glyphicon-'+ (isLast ? 'plus' : 'minus') +'"></span>' +
                    '</button>' +
                '</div> <br/>'
            );

            $(form).append(key).append(value).append(ticker);

        });

        return form;

    }

    $(document).ready(function() {
        var url = "/api/process/PROCESS1";
        $.get(url, function(data) {
            $('form').append(prepareForm(data.envs));
        });
    })
    .on('click', '.btn-add', function(e)
    {
        e.preventDefault();

        var controlForm = $('.controls form:first'),
            currentEntry = $(this).parents('.entry:first'),
            newEntry = $(currentEntry.clone()).appendTo(controlForm);

        newEntry.find('input').val('');
        controlForm.find('.entry:not(:last) .btn-add')
            .removeClass('btn-add').addClass('btn-remove')
            .removeClass('btn-success').addClass('btn-danger')
            .html('<span class="glyphicon glyphicon-minus"></span>');
    }).on('click', '.btn-remove', function(e)
    {
		$(this).parents('.entry:first').remove();

		e.preventDefault();
		return false;
    }).on('click', '.button-submit', function(e) {
        var url = "/api/process/PROCESS1";
        var data = {};

        $("input").each(function(index) {
            if ($(this).attr('id') == "key" && !($(this).text() || "").trim())
                data[$(this).text()] = "";
        });

        $.ajax({url, data});
    });
    
});

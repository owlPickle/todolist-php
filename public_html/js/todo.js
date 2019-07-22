$(document).ready(function () {

    let source = $("#todo-template").html();
    let todoTemplate = Handlebars.compile(source);

    // render DB todo
    let todoListUI = '';
    $.each(todos, function (index, todo) {
        todoListUI += todoTemplate(todo);
    });

    $('#todo-list').find('li.new').before(todoListUI);

    function addList() {
        let todoContent = $('li.new .content').text();

        if (todoContent.trim() === '') {
            alert('Please Write Something');
        } else {
            let order = $('#todo-list').find('li:not(.new)').length + 1;
            // AJAX: creat API
            $.post('todo/create.php', { content: todoContent, order: order }, function (data, textStatus, xhr) {
                let context = { id: data.id, content: todoContent, is_complete: false };
                let list = todoTemplate(context);
                $('li.new .content').closest('li').before(list);
            });
        }
        $('li.new .content').empty();
    }

    $('#todo-list')
        // edit
        .on("dblclick", '.content', function (e) {
            $(e.currentTarget).prop('contenteditable', true).focus();
        })
        // create
        .on('blur', '.content', function (e) {
            let newTodo = $(this).closest('li').is('.new');
            if (newTodo) {
                addList();
            }
            // update 
            else {
                //AJAX call
                let id = $(this).closest('li').data('id');
                let content = $(this).text();
                $.post('todo/update.php', { id: id, content: content });

                $(e.currentTarget).prop('contenteditable', false);
            }

        })
        // delete
        .on('click', '.delete', function (e) {
            let result = confirm('Do you really want to delete ?');
            if (result) {
                // AJAX call
                let id = $(this).closest('li').data('id');
                $.post('todo/delete.php', { id: id }, function (data, textStatus, xhr) {
                    $(e.currentTarget).closest('li').remove();
                });
            }
        })
        // complete
        .on('click', '.checkbox', function (e) {
            // AJAX call
            let id = $(this).closest('li').data('id');
            $.post('todo/complete.php', { id: id }, function (data, textStatus, xhr) {
                $(e.currentTarget).closest('li').toggleClass('complete');
            });
        });

    // press enter
    $('li.new .content').keyup(function (e) {
        if (e.keyCode === 13) {
            $(e.currentTarget).blur();
        }
    })

    $("#sortable").sortable({
        items: 'li:not(.new)',
        stop: function () {
            let orderArr = [];
            $('#todo-list').find('li:not(.new)').each(function (index, li) {
                orderArr.push({
                    id: $(li).data('id'),
                    order: index
                });
            });
            
            $.post('todo/sort.php', { orderArr: orderArr }) ;
        }
    });

});
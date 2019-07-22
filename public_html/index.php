<?php include('header.php') ?>
<?php include('data.php') ?>



<div class="container">

    <div id="panel">
        <h1>Todo List</h1>

        <div id="todo-list">
            <ul id="sortable">
                <li class="new">
                    <div class="checkbox"></div>
                    <div class="content" contenteditable="true"></div>
                </li>
            </ul>
        </div>

    </div>

    <script id="todo-template" type="text/x-handlebars-template">
        <li data-id="{{id}}" class="{{#if is_complete}}complete{{/if}}">
            <div class="checkbox"></div>
            <div class="content">{{content}}</div>
            <div class="actions">
                <div class="delete">x</div>
            </div>
        </li>
    </script>

</div>


<?php include('footer.php') ?>
// update todoscounter
function updateCounters() {
    var ntodos = $(".todo").length;
    var ncompleted = $(".completed").length

    $("#total-count").html(ntodos);
    $("#completed-count").html(ncompleted);
    $("#todo-count").html(ntodos - ncompleted);
}

updateCounters();

function toggleDone() {
    var checkbox = this;

    $(checkbox).parent().toggleClass("completed");

    updateCounters();
}

function submitTodo(event) {
    // stop the form from doing the default action, submitting...
    event.preventDefault();

    var title = $("#new-todo").val();

    createTodo(title);

    $("#new-todo").val(null);
    updateCounters();

    function createTodo(title) {
        var checkboxId = "todo-" + nextTodoId();

        var listItem = $("<li></li>");
        listItem.addClass("todo");

        var checkbox = $('<input>');
        checkbox.attr('type', 'checkbox');
        checkbox.attr('id', checkboxId);
        checkbox.val(1);
        checkbox.bind('change', toggleDone);

        var space = document.createTextNode(" ");

        var label = $('<label></label>');
        label.attr('for', checkboxId);
        label.html(title);

        listItem.append(checkbox);
        listItem.append(space);
        listItem.append(label);

        $("#todolist").append(listItem);

        updateCounters();
    }

    function nextTodoId() {
        return $(".todo").length + 1;
    }
}

function cleanUpDoneTodos(event) {
  event.preventDefault();
  $.when($(".completed").remove())
    .then(updateCounters);
}


// bind the onChange event to the checkbox
$("input[type=checkbox]").bind('change', toggleDone);
// bind the form to the submit event
$("form").bind('submit', submitTodo);
// delete option
$("#clean-up").bind('click', cleanUpDoneTodos);

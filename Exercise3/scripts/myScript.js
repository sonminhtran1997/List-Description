var category = "add";
var list;
var idDelete;
function setAdd() {
    category = "add";
    $('#ID').attr('readonly', false);
}
function validate() {
    if ($("#fname").val() == "") {
        alert("First Name field is required");
        return;
    }
    if ($("#lname").val() == "") {
        alert("Last Name field is required");
        return;
    }
    if (!$.isNumeric($("#ID").val())) {
        alert("ID must be number");
        return;
    }
    if ($("#description").val() == "") {
        alert("add some description");
        return;
    }
    CallAjax(category);
}
function setDelete() {
    category = "delete";
}
function setEdit(element) {
    category = "edit";
    id = element.getAttribute("id");
    $('#fname').val($("#" + id + " .fnames").text());
    $('#lname').val($("#" + id + " .lnames").text());
    $('#ID').val(id);
    $('#ID').attr('readonly', true);
    $('#description').val($("#" + id + " .descriptions").text());

}
function reset() {
    $('#fname').val("");
    $('#lname').val("");
    $('#description').val("");
    $('#ID').val("");
    setAdd();
}

function deleteOne(element) {
    idDelete = element.getAttribute("data-userID");
    CallAjax(category);
}

function updateTable(list) {
    var stuList = Object.keys(list) // get all object properties as an array
  .map(function (k) { // iterate and generate new array with custom element
      return { // generate custom array object based on the property and object and return
          ID: k, // k is property of ov=bjeck
          firstName: list[k].firstName, // get inner properties from data object using k
          lastName: list[k].lastName,
          id: list[k].id,
          description: list[k].description
      };
  })
    html = '';
    for (var i = 0; i < stuList.length; i++) {
        html += '<tr onclick="setEdit(this)" id="' + stuList[i].id + '">';
        html += '<td class="orders">' + (i + 1) + '</td>';
        html += '<td class="fnames">' + stuList[i].firstName + '</td>';
        html += '<td class="lnames">' + stuList[i].lastName + '</td>';
        html += '<td class="ids">' + stuList[i].id + '</td>';
        html += '<td class="descriptions">' + stuList[i].description + '</td>';
        html += '<td><button class="delOne" data-userID="' + stuList[i].id +'" onclick="setDelete();deleteOne(this)"></td>';
        html += '</tr>';
    }
    $("#table tbody").empty().append(html);
}

function CallAjax(category) {
    switch (category) {
        case "add":
        case "edit":
            var fname = $('#fname').val();
            var lname = $('#lname').val();
            var description = $('#description').val();
            var id = $('#ID').val();
            var data = {
                TypeFunc: category,
                FirstName: fname,
                LastName: lname,
                ID: id,
                Description: description,
            }
            break;
        case "delete":
            var data = {
                TypeFunc: category,
                ID: idDelete
            }
            break;
        default:
            break;

    }
    $.ajax({
        method: "GET",
        url: "Default.aspx",
        data: data,
        success: function (response) {
            onSuccess(response);
        }
    });


}
function onSuccess(response) {
    if (isJson(response)) {
        list = $.parseJSON(response);
        updateTable(list);
        return;
    }
    alert(response);
}
function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}


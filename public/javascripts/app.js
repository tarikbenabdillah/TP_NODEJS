var EditPopoup = $(".edit-popup")[0];
var AddUserPopoup = $(".adduser-popup")[0];
var Main = $("main")[0];
var CloseEdit = $(".close-edit")[0];
var CloseAdd = $(".close-add")[0];

CloseEdit.onclick = () => {
    EditPopoup.classList.toggle("active");
    Main.classList.toggle("filter")
}
CloseAdd.onclick = () => {
    AddUserPopoup.classList.toggle("active");
    Main.classList.toggle("filter")
}
function ValidateEmail(mail) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
        return (true)
    }
    return (false)
}

function showit(params) {
    return document.getElementById(params).classList.replace("hide","show")
}
function hideit(params) {
    return document.getElementById(params).classList.replace("show","hide")
}
function Getdata(number) {
    fetch("http://localhost:3000/users/" + number,{
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(res => res.json())
        .then(data => {
            init_Edit();
            init_delete();
            if (data.length == 0) {
                hideit("next");
            }
            else {
                showit("next");
                $("tbody").empty()
            }
            if (number == 1) {
                showit("previous")
            }
            if (number == 0) {
                hideit("previous")
            }
            data.forEach(row => {
                $("tbody").append(`<tr id="${row.id}">
       <td class="user-id" >${row.id}</td>
       <td class="user-name">${row.username}</td>
       <td class="user-email">${row.email}</td>
       <td class="user-password">${row.password}</td>
       <td class="user-role">${row.role}</td>
       <td class="user-createdAt">${row.createdAt}</td>
       <td class="user-updatedAt">${row.updatedAt}</td>
       <td class="center"> <button type="button" class="btn btn-primary edit"><i class="bi bi-pencil-fill"></i> </button> <button type="button" class="btn btn-danger remove"><i class="bi bi-trash-fill"></i> </button> </td>
      </tr>`)
            });
        })
}
function init_Edit() {
    setTimeout(() => {
        var Edits = document.querySelectorAll(".edit");
        Edits.forEach(Edit => {
            let data = Edit.parentElement.parentElement;
            let Id = Edit.parentElement.parentElement.getAttribute("id");
            Edit.onclick = () => {
                EditPopoup.classList.toggle("active");
                Main.classList.toggle("filter")
                EditPopoup.querySelector("#username").value = data.querySelector(".user-name").textContent;
                EditPopoup.querySelector("#email").value = data.querySelector(".user-email").textContent;
                EditPopoup.querySelector("#password").value = data.querySelector(".user-password").textContent;
                EditPopoup.querySelector("#role").value = data.querySelector(".user-role").textContent;
                EditPopoup.querySelector("button").onclick = () => {
                    fetch('http://localhost:3000/users/',{
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            id: Id,
                            username: EditPopoup.querySelector("#username").value,
                            email: EditPopoup.querySelector("#email").value,
                            password: EditPopoup.querySelector("#password").value,
                            role: EditPopoup.querySelector("#role").value,
                        }),
                    })

                        .then((res) => {
                            if (res.status == 200) {
                                data.querySelector(".user-name").textContent = EditPopoup.querySelector("#username").value
                                data.querySelector(".user-email").textContent = EditPopoup.querySelector("#email").value
                                data.querySelector(".user-password").textContent = EditPopoup.querySelector("#password").value
                                data.querySelector(".user-role").textContent = EditPopoup.querySelector("#role").value
                                Edit.parentElement.parentElement.classList.add("edited")
                                setTimeout(() => {
                                    Edit.parentElement.parentElement.classList.remove("edited")
                                },2000)
                            }
                            else {
                                alert("something went wrong !!!")
                                Edit.parentElement.parentElement.classList.add("prob")
                                setTimeout(() => {
                                    Edit.parentElement.parentElement.classList.remove("prob")
                                },2000)
                            }
                        })
                        .catch((error) => {
                            alert("Something went wrong check Console !! ")
                            console.log(error);
                        }
                        );
                    EditPopoup.classList.toggle("active");
                    Main.classList.toggle("filter")
                }
            }
        });

    },1000)
}
function init_delete() {
    setTimeout(() => {
        var Removes = document.querySelectorAll(".remove");
        Removes.forEach(Remove => {
            let data = Remove.parentElement.parentElement;
            let Id = Remove.parentElement.parentElement.getAttribute("id");
            Remove.onclick = () => {
                var valid = confirm("Are you sure you want to delete?");
                if (valid) {
                    fetch('http://localhost:3000/users/delete/' + Id,{
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                    })
                        .then(res => {
                            if (res.status == 200) {
                                alert("user Deleted deleted !!! ");
                                $(data).remove();
                            }
                            else {
                                alert("something went wrong !!! ")
                            }
                        })

                        .catch(err => {
                            console.log(err);
                        })
                }
                else {
                    alert("canceld")
                }
            }
        });

    },1000)
}
function AddUser(user) {
    fetch("http://localhost:3000/users/add",{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    })
        .then(res => {
            if (res.status == 200) {
                AddUserPopoup.classList.toggle("active");
                Main.classList.toggle("filter");
            }
            else {
                alert("somethig went wrong please try again !!! ")
            }
        })
}
$("#adduser").click(function () {
    AddUserPopoup.classList.toggle("active");
    Main.classList.toggle("filter")
})
$("#add-action").click(function () {
    let errors = []
    if (!$("#Newusername").val()) {
        errors.push("Username field requierd ! ")
    }
    if (!$("#Newemail").val() || !ValidateEmail($("#Newemail").val())) {
        errors.push("Enter valid email !")
    }
    if (!$("#Newrole").val()) {
        errors.push("role field requierd !")
    }
    if (!$("#Newpassword").val()) {
        errors.push("Password field requierd !")
    }

    if (errors.length == 0) {
        $(".errors").empty();
        AddUser({
            username: $("#Newusername").val(),
            email: $("#Newemail").val(),
            role: $("#Newrole").val(),
            password: $("#Newpassword").val()
        })
    }
    else {
        $(".errors").empty();
        let ul = document.createElement("ul");
        errors.forEach(error => {
            let li = document.createElement("li");
            li.textContent = error;
            ul.appendChild(li);
        })

        $(".errors").append(`
        <div class="alert alert-danger mt-3" role="alert">
        ${ul.innerHTML}
        </div>`)

    }
})
$("#next").click(function () {
    number++;
    Getdata(number)
});
$("#previous").click(function () {
    if (number > 0) {
        number--;
    }
    Getdata(number)
});


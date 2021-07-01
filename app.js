// global functions
var important = false;
var serverUrl = "https://fsdiapi.azurewebsites.net/";
var myTasks = [];

// HW variable scope on JS

function toggleImportant() {
    //  change icon if selected
    if (!important) {
        important = true;
        // chain the element together
        $("#iImportant").removeClass("far").addClass("fas");
    } else {
        important = false;
        $("#iImportant").removeClass("fas").addClass("far");
    }
}

function saveTask() {
    // read values from the controls
    let title = $("#txtTitle").val();
    let category = $("#selCategory").val();
    let description = $("#txtDescription").val();
    let location = $("#txtLocation").val();
    let dueDate = $("#selDueDate").val();
    let color = $("#selColor").val();

    let task = new Task(title, important, category, description, location, dueDate, color, 1);
    // task._id = Date.now();
    

    // myTasks.push(task);
    // displayTask(task);

    // send object to backend server

    $.ajax({
        url: serverUrl + "api/tasks/",
        type: 'POST',   // Create new Task
        data: JSON.stringify(task),
        contentType: "application/json",
        success: function (res) {
            let task = JSON.parse(res);
            myTasks.push(task);
            displayTask(task);
        },

        error: function (eDetails) {
            console.error("Error saving", eDetails);

        }

    });
    // get-retrive dont allow data

    // post-create new
    // put-part of data
    // patch- modifly entire page
    // delet- remove
    // display the task 


}

function doneTask(id) {
    
    for (let i = 0; i < myTasks.length; i++) {
        let task = myTasks[i];
        if (task._id == id) {
            task.status = 2;
            // let div=$(`#_${id}`);
            
            // div.remove();
            //display the task

            // displayTask(task);
            $.ajax({
                url: serverUrl + "api/tasks",
                type: "PUT", //Update
                data: JSON.stringify(task),
                contentType: 'application/json',
                success: function (res) {
                    // console.log("response:", res);
                    //remove the task from Pending list
                    $(`#_${id}`).remove();
                    //display the task

                    displayTask(task);
                },
                error: function (err) {
                    console.error("Error updating", err);
                }
            });
            break;
        }

    }



}

function displayTask(task) {
   
    let syntax =
        `<div class="important"  id="_${task._id}" class="task"> 
    <div class= "green description">
        <i class='important fas fa-star'></i>
            <h5> Title:${task.title}</h5>
            <h5> Category: ${task.category} </h5>
            <h5> Location: ${task.location}   <h5>
            <p> Descripton:${task.description}</p>
            <label class="due-date"> Date Due:${task.dueDate}</label>
            <label class="location">${task.location}</label>
         
            </div>`;


    let syntax2 =
        `<div class="important"    id="_${task._id}" class="task">      

    <div  class="done">
        <i class='important fas fa-star'></i>
            <h5> Title:${task.title}</h5>
            <h5> Category: ${task.category} </h5>
            <h5> Location: ${task.location}   <h5>
            <p> Descripton:${task.description}</p>
            <label class="due-date"> Date Due:${task.dueDate}</label>
            <label class="location">${task.location}</label>
           
            </div>`;

    if (task.status == 1) {
        syntax += `<button onclick="doneTask('${task._id}')" class="btn btn-sm btn-primary">Finshed</button></div>`;
        $("#pendingList").append(syntax); 
    } else if (task.status == 2) {
        syntax2 += `<button onclick="removeTask('${task._id}')" class="btn btn-sm btn-danger">Delete</button></div>`;
        $("#doneList").append(syntax2);
    }XXx
    // else if(task.status == 3) {
    //     syntax += `<button onclick="removeTask('${task._id}')" class="btn btn-sm btn-danger">Done</button></div>`;
    //     $("#doneList").append(syntax);
    }

    function removeTask (id){
        for (let i = 0; i < myTasks.length; i++) {
            let task = myTasks[i];
            if (task._id == id) {
                // $(`#_${id}`).remove();
                myTasks.splice(i,1);
                task.status=3 ;
                $.ajax({
                    url: serverUrl + "api/tasks",
                    type: "PUT", //Remove   Delete doesnt work instructor implement delete
                    data: JSON.stringify(task),
                    contentType: 'application/json',
                    success: function (res) {
                        console.log("response:", res);
                        //remove the task from Pending list
                        $(`#_${id}`).remove();
                        //display the task
    
                        // displayTask(task);
                    },
                    error: function (err) {
                        console.error("Error updating", err);
                    }
                });
                break;
            }
    
        }
        


    }



function fetchTasks() {

    $.ajax({
        url: serverUrl + "api/tasks",
        type: 'GET',
        success: function (res) {
            let data = JSON.parse(res);

            for (let i = 0; i < data.length; i++) {
                let task = data[i];
                if (task.name === "joshua") {
                    myTasks.push(task);
                    displayTask(task);
                }
            }


           
            //   console.log("server says:", task[])
        },

        error: function (err) {
            console.error("Error getting data", err);

        }
    });


}






function init() {

    // load data
    fetchTasks();

    $("#iImportant").click(toggleImportant);
    
    // hook events
    // use Jquery to select the element using the$ then .click and what function to excute.
    $("#iImportant")
    $("#btnSave").click(saveTask);
}

window.onload = init;
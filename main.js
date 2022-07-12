let input = document.querySelector('.input');
let submit = document.querySelector('.add');
let tasksDiv = document.querySelector('.tasks');

// Empty Array To Store The Tasks
let arrayOfTasks = [];

// check if theres tasks in local storage
if (localStorage.getItem('tasks')) {
    arrayOfTasks = JSON.parse(localStorage.getItem('tasks'));
}

//trigger get data from local storage 
getDataFromLocalStorage();

// add task 
submit.onclick = function () {
    if (input.value !== "") {
        //Add TAsks to Array Of Tasks
        addTaskToArray(input.value);
        // Empty The Input
        input.value = "";
    }
}


// click on task element
tasksDiv.addEventListener('click', (e) => {
    // delete button
    if (e.target.classList.contains('del')) {
        // remove task from local storage
        deleteTaskWith(e.target.parentElement.getAttribute('data-id'));

        // reomve element from page
        e.target.parentElement.remove();
    }


    if (e.target.classList.contains('task')) {
        // toggle completed for the task
        toggleStatusTaskWith(e.target.getAttribute('data-id'));

        // toggle done class
        e.target.classList.toggle('done');
    }
})

function addTaskToArray(taskText) {
    // task data 
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    };
    // Push Task To Array Of Taskes
    arrayOfTasks.push(task);
    // add tasks to tasks div
    addElementsToPageFrom(arrayOfTasks);
    // add tasks to local storage 
    addDataToLocalStorageFrom(arrayOfTasks);
}


function addElementsToPageFrom(arrayOfTasks/* <= parmeter with the same name of array */) {
    // empty tasks div
    tasksDiv.innerHTML = '';
    // looping on array of tasks
    arrayOfTasks.forEach(task => {
        // make main div
        let div = document.createElement('div');
        div.className = 'task';
        // check if task done
        // console.log(task.completed)
        if (task.completed) {
            div.className = 'task done';
        }
        div.setAttribute('data-id', task.id);
        div.appendChild(document.createTextNode(task.title));
        // make delete span
        let span = document.createElement('span');
        span.className = 'del';
        span.appendChild(document.createTextNode('Delete'));
        div.appendChild(span);
        // append main div to tasks div
        tasksDiv.appendChild(div);
    });
}

function addDataToLocalStorageFrom(arrayOfTasks) {
    window.localStorage.setItem('tasks', JSON.stringify(arrayOfTasks));

}

function getDataFromLocalStorage() {
    let data = window.localStorage.getItem('tasks');
    if (data) {
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks);
    };
};

function deleteTaskWith(taskId) {
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addDataToLocalStorageFrom(arrayOfTasks);
}

function toggleStatusTaskWith(taskId) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].completed == false ? arrayOfTasks[i].completed = true : arrayOfTasks[i].completed = false;
        }
    };
    addDataToLocalStorageFrom(arrayOfTasks);
}
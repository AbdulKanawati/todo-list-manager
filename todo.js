let tasks = []

function getTaskFromStorage(){

      let retrivedTasks = JSON.parse(localStorage.getItem("myTasks"));

      tasks = retrivedTasks ?? [];
};

function getTaskFromStorage() {
      try {
          let retrievedTasks = JSON.parse(localStorage.getItem("myTasks"));
          tasks = retrievedTasks ?? [];
      } catch (error) {
          console.error("Failed to retrieve tasks:", error);
          tasks = [];
      }
  }

function fillTasksOnThePage(){

      document.getElementById("tasks").innerHTML = "";

      let index = 0;

      for(task of tasks){
                  
            let content = `
                        <!-- TASK -->
                        <div class="task ${task.isDone? 'done' : ''}">
                              <!-- TASKS INFO -->
                              <div style="width: 70%; ">
                                    <h2>${task.title}</h2>
            
                                    <div>
                                          <span class="material-symbols-outlined">calendar_month</span>
            
                                          <span>
                                                ${task.date}
                                          </span>
                                    </div>
                              </div>
            
                        
                               <!--/ TASKS INFO /-->
            
                              <!-- TASKS ACTIONS -->
                              <div id="task-actions">
                                    <button onclick="deleteTask(${index})" class="circular" style="background-color: rgb(114, 0, 0); color: white;">
                                          <span class="material-symbols-outlined">delete</span>
                                    </button>
                                    ${task.isDone?
                                          `
                                          <button onclick="toggleTaskCompletion(${index})" class="circular" style="background-color: rgb(118, 0, 101); color: white;">
                                                <span class="material-symbols-outlined">cancel</span>
                                          </button>
                                          `
                                          
                                          : `
                                          <button onclick="toggleTaskCompletion(${index})" class="circular" style="background-color: rgb(0, 150, 30); color: white;">
                                                <span class="material-symbols-outlined">check</span>
                                           </button>
                                          `}

                                    <button onclick="editTask(${index})" class="circular" style="background-color: rgba(0, 16, 197 , 0.692); color: white;">
                                          <span class="material-symbols-outlined">edit</span>
                                    </button>
                              </div>
                              <!--/ TASKS ACTIONS /-->
            
                        </div>
                        <!--/ TASK /-->
              `
      
            document.getElementById("tasks").innerHTML += content; 
            index++;
      }
};

fillTasksOnThePage();

document.getElementById("add-btn").addEventListener("click", ()=>{

      let currentDate = new Date();
      let formattedDate = currentDate.toLocaleString();

      let taskName = prompt("Please insert the task title.");

      if(taskName === null) {
            return; // Exit the function if the user clicked "Cancel"
        }
    
        // Check if the task name is valid (not null, not empty, and not just spaces)
        if(taskName.trim() !== ""){
            let taskObj = {
                "title": taskName.trim(), // Remove unnecessary spaces
                "date": formattedDate,
                "isDone": false
            };
    
            tasks.push(taskObj);
            
            // Store and update the page only if a valid task was added
            storeTasks();
            fillTasksOnThePage();
        } else {
            alert("Task title cannot be empty!"); // Optional: Give feedback to the user
        }

});

function deleteTask(index){
      let task = tasks[index];
      let isConfirmed = confirm("Are you sure you want to delete : " + task.title +" ?");
      if(isConfirmed){
            tasks.splice(index,1);
            storeTasks();
            fillTasksOnThePage();
      }
};

function editTask(index){
      let task = tasks[index];
      let newTaskName = prompt("Please provide the new task name.",task.title);
      
      if (newTaskName === null || newTaskName.trim() === task.title) return;

      newTaskName = newTaskName.trim()

      if(newTaskName !== ""){

            
            let isConfirmed = confirm("Are you sure you want to change the task title from : " + task.title  +" to: " + newTaskName + "?");
      
            if(isConfirmed){
                  task.title = newTaskName;
                  storeTasks();
                  fillTasksOnThePage();
            }
      }else{
            alert("Task title cannot be empty!");
      }

};

function toggleTaskCompletion(index){
      let task = tasks[index];

      task.isDone = !task.isDone

      fillTasksOnThePage();
};

//===========STORAGE FUNCTIONS=========
function storeTasks() {
      try {
          let tasksString = JSON.stringify(tasks);
          localStorage.setItem("myTasks", tasksString);
      } catch (error) {
          console.error("Failed to store tasks:", error);
      }
  }

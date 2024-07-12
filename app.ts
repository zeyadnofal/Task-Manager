interface Task{
    id: number;
    text: string;
    completed: boolean;
}

class TaskManager{
    tasks: Task[] = [];
    filter: 'all' | 'completed' | 'active' = 'all';
    addTaskButton: any;
    allTasksButton: any;
    activeTasksButton: any;
    completedTasksButton: any;

    constructor(){
        this.initialize();
    }

    initialize(){
        this.addTaskButton = document.getElementById('add-task-button')!.addEventListener('click', ()=>this.addTask());
        this.allTasksButton = document.getElementById('all-tasks')!.addEventListener('click', ()=>this.setFilter('all'));
        this.completedTasksButton = document.getElementById('completed-tasks')!.addEventListener('click', ()=>this.setFilter('completed'));
        this.activeTasksButton = document.getElementById('active-tasks')!.addEventListener('click', ()=>this.setFilter('active'));
    }

    addTask(){
        const taskInput = <HTMLInputElement>document.getElementById('new-task');
        const taskText = taskInput.value.trim();
        if(taskText){
            const newTask: Task = {id: Date.now(), text: taskText, completed: false};
            this.tasks.push(newTask);
            taskInput.value = '';
            this.render();
        }
    }

    toggleTaskCompletion(id: number){
        const task = this.tasks.find(task => task.id === id);
        if(task){
            task.completed = !task.completed;
            this.render();
        }
    }

    setFilter(filter: 'all' | 'completed' | 'active'){
        this.filter = filter;
        this.render();
    }

    deleteTask(id: number){
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.render();
    }

    getFilteredTasks(){
        if(this.filter === 'active')
            return this.tasks.filter(task => !task.completed);
        else if(this.filter === 'completed')
            return this.tasks.filter(task => task.completed);
        else
            return this.tasks;
    }

    render(){
        const tasksList = document.getElementById('tasks')!;
        tasksList.innerHTML = '';
        
        this.getFilteredTasks().forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.className = task.completed ? 'completed' : '';
            taskItem.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button onClick=taskManager.toggleTaskCompletion(${task.id})>${task.completed ? 'Undo' : 'Complete'}</button>
                <button onClick=taskManager.deleteTask(${task.id})>Delete</button>
            </div>
            `;
            tasksList.appendChild(taskItem);
        })
    }
}

const taskManager = new TaskManager();
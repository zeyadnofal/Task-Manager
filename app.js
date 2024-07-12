var TaskManager = /** @class */ (function () {
    function TaskManager() {
        this.tasks = [];
        this.filter = 'all';
        this.initialize();
    }
    TaskManager.prototype.initialize = function () {
        var _this = this;
        this.addTaskButton = document.getElementById('add-task-button').addEventListener('click', function () { return _this.addTask(); });
        this.allTasksButton = document.getElementById('all-tasks').addEventListener('click', function () { return _this.setFilter('all'); });
        this.completedTasksButton = document.getElementById('completed-tasks').addEventListener('click', function () { return _this.setFilter('completed'); });
        this.activeTasksButton = document.getElementById('active-tasks').addEventListener('click', function () { return _this.setFilter('active'); });
    };
    TaskManager.prototype.addTask = function () {
        var taskInput = document.getElementById('new-task');
        var taskText = taskInput.value.trim();
        if (taskText) {
            var newTask = { id: Date.now(), text: taskText, completed: false };
            this.tasks.push(newTask);
            taskInput.value = '';
            this.render();
        }
    };
    TaskManager.prototype.toggleTaskCompletion = function (id) {
        var task = this.tasks.find(function (task) { return task.id === id; });
        if (task) {
            task.completed = !task.completed;
            this.render();
        }
    };
    TaskManager.prototype.setFilter = function (filter) {
        this.filter = filter;
        this.render();
    };
    TaskManager.prototype.deleteTask = function (id) {
        this.tasks = this.tasks.filter(function (task) { return task.id !== id; });
        this.render();
    };
    TaskManager.prototype.getFilteredTasks = function () {
        if (this.filter === 'active')
            return this.tasks.filter(function (task) { return !task.completed; });
        else if (this.filter === 'completed')
            return this.tasks.filter(function (task) { return task.completed; });
        else
            return this.tasks;
    };
    TaskManager.prototype.render = function () {
        var tasksList = document.getElementById('tasks');
        tasksList.innerHTML = '';
        this.getFilteredTasks().forEach(function (task) {
            var taskItem = document.createElement('li');
            taskItem.className = task.completed ? 'completed' : '';
            taskItem.innerHTML = "\n            <span>".concat(task.text, "</span>\n            <div>\n                <button onClick=taskManager.toggleTaskCompletion(").concat(task.id, ")>").concat(task.completed ? 'Undo' : 'Complete', "</button>\n                <button onClick=taskManager.deleteTask(").concat(task.id, ")>Delete</button>\n            </div>\n            ");
            tasksList.appendChild(taskItem);
        });
    };
    return TaskManager;
}());
var taskManager = new TaskManager();

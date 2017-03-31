//SCHEMA


//projects
//Holds the info for a specific project
// - id: (int) unique ID For project - increments by 1.
// - projectName: (string) - name of the project should probably be unqiue
// - status (bool) - 1:active    0: complete

//tasks
//holds the task info, is related back to a project through a forgein key
// - id: (int) unique ID For project - increments by 1.
// - projectId (int) forgein key - is the ID of the project that this task is a child of
// - taskName (string) name of the task
// - currentTime (int) time in seconds that has been spent on the task
// - status (bool) - 1:active    0: complete

//time
//holds the individual time enteries related back to a task for a forgein key
// - id: (int) unique ID For project - increments by 1.
// - taskId (int) forgein key - is the ID of the task that this time entery is a child of
// - timestamp (string) the date that this time entry was done on in the string format mm/dd/yyyy
// - amount (int) amount of time that was spent on this time entry in seconds


dataBase.create('timeTracker');
dataBase.newTable("timeTracker" ,"projects", "id","projectName", "status");
dataBase.newTable("timeTracker" ,"tasks", "id","projectId", "taskName", "currentTime", "status");
dataBase.newTable("timeTracker" ,"times", "id","taskId", "timestamp", "amount");
var projects = "";
var tasks = "";


//global helper functions to display on the right side ;{><}
//TODO change display time to more generalized form and put all helps in here
// Move it to its own file too.

/*
* Takes an amount of seconds and outputs them to nearest hour and minute
* @param int
* @return String Hours:Minutes:seconds
*/
function formatSeconds(timeAmount){
  var hours = 0;
  var minutes = 0;

  while(timeAmount - 3600 > 0){
    hours++;
    timeAmount = timeAmount - 3600;
  }
  while(timeAmount - 60 > 0){
    minutes++;
    timeAmount = timeAmount - 60;
  }

  return hours + " Hours " + minutes + " Minutes and " + timeAmount + " Seconds"

}

var displayTime =  {
  display: function(item) { //takes the full item to display name and such from
       var sortedTimes =  times.filter(function(time) {
         return time.taskId == item.id;
       });
       var timeContent = "<h2>" + item.taskName + "</h2>";
       for(var x = 0; x < sortedTimes.length; x++){
         var formattedTime = formatSeconds(sortedTimes[x].amount);
         timeContent += "<div>Completed: " + formattedTime + " - On: "+sortedTimes[x].timestamp+"</div>";
       }
       document.getElementById('timeEnteries').innerHTML = timeContent;
  }
};

var TaskItem = React.createClass({
  showLarge: function(item){
      // calls the global helper - best way to make non related components interact in this case?????
      displayTime.display(item);
  },
  render: function() {
    var that = this;
    var tasksItems = tasks.map(function(task){
        if(that.props.projectId == task.projectId){
          return(
          <div className="taskItem" key={task.id} onClick={()=>that.showLarge(task)}>
              <h3>{task.taskName}</h3>
              Time Spend: {task.currentTime} minutes
              <div><i className="fa fa-play" aria-hidden="true"></i> Start Tracking</div>
              <div><i className="fa fa-stop" aria-hidden="true"></i> Stop Tracking</div>
          </div>);
        }
    });
    return (
      <div className="tasksWrap">
        {tasksItems}
      </div>
    );
  }
});


var Project = React.createClass({
  getInitialState: function() {
    return {active: false};
  },
  handleClick: function(){
    if(this.state.active == false){
      this.setState({'active': true});
    }
    else {
      this.setState({'active': false});
    }
  },
  render: function() {
    if(this.state.active == true){
      return (
        <div className="tasksWrap">
          <div className="panel panel-default">
            <div className="panel-heading" onClick={this.handleClick}>{this.props.projectItem.projectName}</div>
              <div className="panel-body">
                  <TaskItem projectId={this.props.projectItem.id}></TaskItem>
              </div>
          </div>
        </div>
      );
    }
    else{
      return ( //state is not active
        <div className="tasksWrap">
          <div className="panel panel-default">
            <div className="panel-heading" onClick={this.handleClick}>{this.props.projectItem.projectName}</div>
          </div>
        </div>
      );
    }
  }
});



var TaskWrapper = React.createClass({
  render: function() {
      if(projects != "") //only present if projects are set otherwise this will break.
      {
        var project = this.props.projects.map(function(project) {
          return (
            <Project key={project.id} projectItem={project} />
          );
        });
    }
    return (
      <div className="projectWrapper">
          {project}
      </div>
    );
  }
});




var NewProject = React.createClass({
  getInitialState: function() {
     return {classToPass: ""};
  },
  openPanel: function(){
      if(this.state.classToPass == ""){
        this.setState({'classToPass': 'active'});

      }
      else {
        this.setState({'classToPass': ''});
      }
  },
  render: function() {
    return (
      <div>
          <div onClick={this.openPanel} className="newProjectWrapper">
              + Add New Project
          </div>
          <ProjectCreation active={this.state.classToPass}/>
      </div>
    );
  }
});

var ProjectCreation = React.createClass({
  render: function() {

    var active = this.props.active + " projectCreator";
    return (
      <div className={active}>
         <input type="text"/>
         <button>Add Project</button>
      </div>
    );
  }
});



//render here
ReactDOM.render(
  <TaskWrapper projects={projects} tasks={tasks} />,
  document.getElementById('tasksWrapper')
);
ReactDOM.render(
  <NewProject />,
  document.getElementById('newProject')
);

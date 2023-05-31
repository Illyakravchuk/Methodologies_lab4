class Task {
    constructor(title, description, deadline) {
      this.title = title;
      this.description = description;
      this.deadline = deadline;
      this.completed = false;
      this.completedDate = null;
    }
  }
  
  module.exports = Task;
  
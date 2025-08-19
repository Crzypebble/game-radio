const ProjectManager = {
  currentProject: {
    name: "",
    stations: []
  },

  newProject() {
    this.currentProject = { name: "", stations: [] };
    UI.updateProjectInfo();
  },

  saveProject() {
    const data = JSON.stringify(this.currentProject, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = this.currentProject.name || "radio_project.json";
    a.click();
  },

  loadProject() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = e => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = event => {
        this.currentProject = JSON.parse(event.target.result);
        UI.updateProjectInfo();
      };
      reader.readAsText(file);
    };
    input.click();
  }
};

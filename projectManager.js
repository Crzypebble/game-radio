const ProjectManager = {
  currentProject: { name: "", stations: [] },

  newProject(){
    this.currentProject = { name:"", stations:[] };
    UI.refreshAll();
  },

  saveProject(){
    // Embed full data (including mp3Data) into JSON
    const data = JSON.stringify(this.currentProject, null, 2);
    const blob = new Blob([data], {type:"application/json"});
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${this.currentProject.name || "radio_project"}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  },

  loadProject(){
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json,application/json";
    input.onchange = e => {
      const file = e.target.files?.[0];
      if(!file) return;
      const reader = new FileReader();
      reader.onload = evt => {
        try{
          const parsed = JSON.parse(evt.target.result);
          // Backward compatibility / sanity checks
          if(!parsed.stations) parsed.stations = [];
          this.currentProject = parsed;
          UI.refreshAll();
        }catch(err){
          alert("Invalid JSON file.");
          console.error(err);
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }
};

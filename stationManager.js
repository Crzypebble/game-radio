const StationManager = {
  addStation(){
    ProjectManager.currentProject.stations.push({
      name: "New Station",
      tracks: []
    });
    UI.renderStations(); // render once on add
  },

  deleteStation(index){
    ProjectManager.currentProject.stations.splice(index, 1);
    UI.renderStations();
  },

  renameStation(index, newName){
    // Update data only; DO NOT re-render here (prevents focus loss)
    ProjectManager.currentProject.stations[index].name = newName;
  }
};

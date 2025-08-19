const StationManager = {
  addStation() {
    const station = {
      name: "New Station",
      tracks: []
    };
    ProjectManager.currentProject.stations.push(station);
    UI.renderStations();
  },

  deleteStation(index) {
    ProjectManager.currentProject.stations.splice(index, 1);
    UI.renderStations();
  },

  renameStation(index, newName) {
    ProjectManager.currentProject.stations[index].name = newName;
    UI.renderStations();
  }
};

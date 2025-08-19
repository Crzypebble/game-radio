const TrackManager = {
  addTrack(stationIndex) {
    const track = {
      title: "New Track",
      assetId: "",
      mp3: "",
      url: "",
      genre: ""
    };
    ProjectManager.currentProject.stations[stationIndex].tracks.push(track);
    UI.renderStations();
  },

  deleteTrack(stationIndex, trackIndex) {
    ProjectManager.currentProject.stations[stationIndex].tracks.splice(trackIndex, 1);
    UI.renderStations();
  },

  updateTrack(stationIndex, trackIndex, key, value) {
    ProjectManager.currentProject.stations[stationIndex].tracks[trackIndex][key] = value;
  }
};

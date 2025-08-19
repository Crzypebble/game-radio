const TrackManager = {
  addTrack(stationIndex){
    ProjectManager.currentProject.stations[stationIndex].tracks.push({
      title: "",
      artist: "",
      genre: "",
      assetId: "",
      mp3Name: "",
      mp3Data: ""   // base64 Data URL for preview + persistence
    });
    UI.renderStations(); // render once on add
  },

  deleteTrack(stationIndex, trackIndex){
    ProjectManager.currentProject.stations[stationIndex].tracks.splice(trackIndex, 1);
    UI.renderStations();
  },

  updateTrack(stationIndex, trackIndex, key, value){
    ProjectManager.currentProject.stations[stationIndex].tracks[trackIndex][key] = value;
    // No re-render here to preserve focus while typing
  },

  attachMp3(stationIndex, trackIndex, file){
    if(!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      const dataURL = e.target.result; // base64
      const track = ProjectManager.currentProject.stations[stationIndex].tracks[trackIndex];
      track.mp3Data = dataURL;
      track.mp3Name = file.name || "audio";
      UI.renderStations(); // update the audio player once
    };
    reader.readAsDataURL(file);
  }
};

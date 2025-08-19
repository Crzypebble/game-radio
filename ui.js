const UI = {
  updateProjectInfo() {
    document.getElementById("project-name").textContent =
      ProjectManager.currentProject.name || "No project loaded";

    const input = document.getElementById("project-name-input");
    input.value = ProjectManager.currentProject.name;
    input.oninput = e => {
      ProjectManager.currentProject.name = e.target.value;
      document.getElementById("project-name").textContent = e.target.value;
    };

    this.renderStations();
  },

  renderStations() {
    const container = document.getElementById("station-list");
    container.innerHTML = "";

    ProjectManager.currentProject.stations.forEach((station, sIndex) => {
      const div = document.createElement("div");
      div.className = "station";

      const nameInput = document.createElement("input");
      nameInput.value = station.name;
      nameInput.oninput = e => StationManager.renameStation(sIndex, e.target.value);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete Station";
      deleteBtn.onclick = () => StationManager.deleteStation(sIndex);

      div.appendChild(nameInput);
      div.appendChild(deleteBtn);

      const trackList = document.createElement("div");
      station.tracks.forEach((track, tIndex) => {
        const trackDiv = document.createElement("div");
        trackDiv.className = "track";

        ["title", "assetId", "mp3", "url", "genre"].forEach(field => {
          const input = document.createElement("input");
          input.placeholder = field;
          input.value = track[field];
          input.oninput = e =>
            TrackManager.updateTrack(sIndex, tIndex, field, e.target.value);
          trackDiv.appendChild(input);
        });

        const delTrack = document.createElement("button");
        delTrack.textContent = "Delete Track";
        delTrack.onclick = () => TrackManager.deleteTrack(sIndex, tIndex);

        trackDiv.appendChild(delTrack);
        trackList.appendChild(trackDiv);
      });

      const addTrackBtn = document.createElement("button");
      addTrackBtn.textContent = "+ Add Track";
      addTrackBtn.onclick = () => TrackManager.addTrack(sIndex);

      div.appendChild(trackList);
      div.appendChild(addTrackBtn);
      container.appendChild(div);
    });
  }
};

window.onload = () => UI.updateProjectInfo();

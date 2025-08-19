const UI = {
  refreshAll(){
    // project name binding
    const nameInput = document.getElementById("project-name-input");
    nameInput.value = ProjectManager.currentProject.name || "";
    nameInput.oninput = (e)=>{
      ProjectManager.currentProject.name = e.target.value;
    };
    this.renderStations();
  },

  renderStations(){
    const wrap = document.getElementById("station-list");
    wrap.innerHTML = "";

    ProjectManager.currentProject.stations.forEach((station, sIndex)=>{
      const stationDiv = document.createElement("div");
      stationDiv.className = "station";

      // Title row: editable station name (no re-render on input), and actions
      const titleRow = document.createElement("div");
      titleRow.className = "station-title-row";

      const nameInput = document.createElement("input");
      nameInput.value = station.name;
      nameInput.placeholder = "Station name";
      nameInput.oninput = (e)=> StationManager.renameStation(sIndex, e.target.value);

      const addTrackBtn = document.createElement("button");
      addTrackBtn.textContent = "➕ Add Track";
      addTrackBtn.onclick = ()=> TrackManager.addTrack(sIndex);

      const delStationBtn = document.createElement("button");
      delStationBtn.textContent = "🗑 Delete Station";
      delStationBtn.onclick = ()=> StationManager.deleteStation(sIndex);

      titleRow.appendChild(nameInput);
      titleRow.appendChild(addTrackBtn);
      titleRow.appendChild(delStationBtn);

      stationDiv.appendChild(titleRow);
      stationDiv.appendChild(this._renderTrackList(station, sIndex));

      wrap.appendChild(stationDiv);
    });
  },

  _renderTrackList(station, sIndex){
    const list = document.createElement("div");

    station.tracks.forEach((track, tIndex)=>{
      const trackDiv = document.createElement("div");
      trackDiv.className = "track";

      // Inputs grid
      const grid = document.createElement("div");
      grid.className = "track-grid";

      // Title
      grid.appendChild(this._labeledInput("Title", track.title, (v)=> {
        TrackManager.updateTrack(sIndex, tIndex, "title", v);
      }));

      // Artist
      grid.appendChild(this._labeledInput("Artist", track.artist, (v)=> {
        TrackManager.updateTrack(sIndex, tIndex, "artist", v);
      }));

      // Genre
      grid.appendChild(this._labeledInput("Genre", track.genre, (v)=> {
        TrackManager.updateTrack(sIndex, tIndex, "genre", v);
      }));

      // Roblox Asset ID
      grid.appendChild(this._labeledInput("Roblox Asset ID", track.assetId, (v)=> {
        TrackManager.updateTrack(sIndex, tIndex, "assetId", v);
      }));

      // MP3 file chooser
      const mp3Box = document.createElement("div");
      const mp3Label = document.createElement("label");
      mp3Label.textContent = "MP3 File";
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "audio/*";
      fileInput.onchange = (e)=> {
        const file = e.target.files?.[0];
        TrackManager.attachMp3(sIndex, tIndex, file);
      };

      const fileNote = document.createElement("div");
      fileNote.className = "note";
      fileNote.textContent = track.mp3Name ? `Selected: ${track.mp3Name}` : "No file selected";

      mp3Box.appendChild(mp3Label);
      mp3Box.appendChild(fileInput);
      mp3Box.appendChild(fileNote);
      grid.appendChild(mp3Box);

      trackDiv.appendChild(grid);
      trackDiv.appendChild(document.createElement("hr")).className = "soft";

      // Audio preview
      const audioRow = document.createElement("div");
      audioRow.className = "audio-row";
      if(track.mp3Data){
        const audio = document.createElement("audio");
        audio.controls = true;
        audio.src = track.mp3Data;
        audioRow.appendChild(audio);
      }else{
        const missing = document.createElement("div");
        missing.className = "note";
        missing.textContent = "Preview unavailable — choose an MP3 file.";
        audioRow.appendChild(missing);
      }
      trackDiv.appendChild(audioRow);

      // Actions
      const actions = document.createElement("div");
      actions.className = "track-actions";
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "🗑 Delete Track";
      deleteBtn.onclick = ()=> TrackManager.deleteTrack(sIndex, tIndex);
      actions.appendChild(deleteBtn);

      trackDiv.appendChild(actions);

      list.appendChild(trackDiv);
    });

    return list;
  },

  _labeledInput(labelText, currentValue, onChange){
    const wrap = document.createElement("div");
    const label = document.createElement("label");
    label.textContent = labelText;
    const input = document.createElement("input");
    input.value = currentValue || "";
    input.placeholder = labelText;
    input.oninput = (e)=> onChange(e.target.value);
    wrap.appendChild(label);
    wrap.appendChild(input);
    return wrap;
  }
};

// boot
window.addEventListener("load", ()=> UI.refreshAll());

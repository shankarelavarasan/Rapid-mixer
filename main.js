function addBlock(instrumentId) {
  const row = document.querySelector(`#${instrumentId} .blocks`);
  const block = document.createElement('div');
  block.classList.add('beat-block');
  block.onclick = () => {
    block.classList.toggle('active');
  };
  row.appendChild(block);
}

function resetMixer() {
  const allBlocks = document.querySelectorAll('.blocks');
  allBlocks.forEach(row => row.innerHTML = '');
}

function playAll() {
  alert("🎧 Simulated playback: Active blocks would play beats.");
}

function exportMix() {
  alert("⬇️ Export feature coming soon with WebAudio + ffmpeg.");
}

function splitSong() {
  const fileInput = document.getElementById('fileInput');
  if (fileInput.files.length === 0) {
    alert("⚠️ Please upload a song first.");
    return;
  }
  alert("🧠 Simulating split... Instrument layers ready.");
}

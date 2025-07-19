// Wait for the DOM to be fully loaded before initializing the application
document.addEventListener('DOMContentLoaded', () => {
    // Get references to essential DOM elements
    const songUpload = document.getElementById('song-upload');
    const mixerContainer = document.getElementById('mixer-container');

    // Configuration for the mixer tracks
    const config = {
        stems: ['Drums', 'Bass', 'Piano', 'Vocal', 'FX', 'Others'],
        stem_emojis: ['🥁', '🎸', '🎹', '🎤', '🎚️', '🌀']
    };

    // Holds the application's state
    const appState = {
        audioContext: null,
        audioBuffer: null,
        sources: [],
        gainNodes: [],
        isPlaying: false
    };

    /**
     * Initializes the application by setting up event listeners.
     */
    const init = () => {
        songUpload.addEventListener('change', handleFileUpload);
    };

    /**
     * Handles the file upload event by sending the file to the backend server.
     * @param {Event} event - The file upload event object.
     */
    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('audio', file);

        try {
            const response = await fetch('http://localhost:3001/upload', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                console.log('File uploaded successfully:', data.filename);
                // Now you can use the filename to process the audio
            } else {
                console.error('File upload failed');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    /**
     * Initializes the Web Audio API with the provided audio data.
     * @param {ArrayBuffer} audioData - The audio data to decode.
     */
    const initAudio = (audioData) => {
        appState.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        appState.audioContext.decodeAudioData(audioData, (buffer) => {
            appState.audioBuffer = buffer;
            setupMixerUI();
        }, (error) => {
            console.error('Error decoding audio data:', error);
            alert('Error decoding audio file. Please try a different file.');
        });
    };

    /**
     * Sets up the mixer UI by creating and appending track elements.
     */
    const setupMixerUI = () => {
        mixerContainer.innerHTML = '';
        appState.gainNodes = [];

        config.stems.forEach((stem, index) => {
            const trackElement = createTrackElement(stem, index);
            mixerContainer.appendChild(trackElement);
        });

        const playButton = createPlayButton();
        mixerContainer.appendChild(playButton);
    };

    /**
     * Creates a single track element for the mixer.
     * @param {string} stem - The name of the instrument stem.
     * @param {number} index - The index of the stem in the configuration.
     * @returns {HTMLElement} The created track element.
     */
    const createTrackElement = (stem, index) => {
        const trackElement = document.createElement('div');
        trackElement.classList.add('track');

        const title = document.createElement('span');
        title.innerHTML = `${config.stem_emojis[index]} ${stem}`;

        const gainNode = appState.audioContext.createGain();
        appState.gainNodes.push(gainNode);

        const volumeSlider = document.createElement('input');
        volumeSlider.type = 'range';
        volumeSlider.min = 0;
        volumeSlider.max = 1;
        volumeSlider.step = 0.01;
        volumeSlider.value = 1;
        volumeSlider.oninput = (e) => {
            gainNode.gain.value = e.target.value;
        };

        trackElement.appendChild(title);
        trackElement.appendChild(volumeSlider);
        return trackElement;
    };

    /**
     * Creates the main play/stop button for the mixer.
     * @returns {HTMLButtonElement} The created play button.
     */
    const createPlayButton = () => {
        const playButton = document.createElement('button');
        playButton.textContent = '▶️ Play All';
        playButton.onclick = () => togglePlayback(playButton);
        return playButton;
    };

    /**
     * Toggles audio playback on and off.
     * @param {HTMLButtonElement} playButton - The button that controls playback.
     */
    const togglePlayback = (playButton) => {
        if (appState.isPlaying) {
            appState.sources.forEach(source => source.stop());
            appState.isPlaying = false;
            playButton.textContent = '▶️ Play All';
        } else {
            appState.sources = [];
            config.stems.forEach((_, index) => {
                const source = appState.audioContext.createBufferSource();
                source.buffer = appState.audioBuffer;
                source.connect(appState.gainNodes[index]);
                appState.gainNodes[index].connect(appState.audioContext.destination);
                source.start(0);
                appState.sources.push(source);
            });
            appState.isPlaying = true;
            playButton.textContent = '⏹️ Stop All';
        }
    };

    // Start the application
    init();
});
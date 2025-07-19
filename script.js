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
        wavesurfer: null,
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
        const uploadLabel = document.getElementById('song-upload-label');

        songUpload.addEventListener('change', handleFileUpload);

        // Add drag and drop listeners
        uploadLabel.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.stopPropagation();
            uploadLabel.classList.add('dragging');
        });

        uploadLabel.addEventListener('dragleave', (e) => {
            e.preventDefault();
            e.stopPropagation();
            uploadLabel.classList.remove('dragging');
        });

        uploadLabel.addEventListener('drop', (e) => {
            e.preventDefault();
            e.stopPropagation();
            uploadLabel.classList.remove('dragging');
            const files = e.dataTransfer.files;
            if (files.length) {
                songUpload.files = files;
                handleFileUpload({ target: songUpload });
            }
        });
    };

    /**
     * Handles the file upload event by sending the file to the backend server.
     * @param {Event} event - The file upload event object.
     */
    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Initialize WaveSurfer
        if (appState.wavesurfer) {
            appState.wavesurfer.destroy();
        }
        appState.wavesurfer = WaveSurfer.create({
            container: '#waveform',
            waveColor: 'violet',
            progressColor: 'purple',
            barWidth: 2,
            barRadius: 3,
            cursorWidth: 1,
            height: 100,
            barGap: 3
        });

        appState.wavesurfer.load(URL.createObjectURL(file));

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
                initAudio(file);
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
    const initAudio = (file) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            appState.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            appState.audioContext.decodeAudioData(e.target.result, (buffer) => {
                appState.audioBuffer = buffer;
                setupMixerUI();
            }, (error) => {
                console.error('Error decoding audio data:', error);
                alert('Error decoding audio file. Please try a different file.');
            });
        };

        reader.readAsArrayBuffer(file);
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

        const controlsContainer = document.getElementById('controls-container');
        const playButton = createPlayButton();
        controlsContainer.appendChild(playButton);
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

        const gainNode = appState.wavesurfer.backend.ac.createGain();
        appState.gainNodes.push(gainNode);

        const volumeSlider = document.createElement('input');
        volumeSlider.type = 'range';
        volumeSlider.min = 0;
        volumeSlider.max = 1;
        volumeSlider.step = 0.01;
        volumeSlider.value = 1;
        volumeSlider.oninput = (e) => {
            appState.wavesurfer.setVolume(e.target.value);
        };

        // For now, we'll just have one master volume control
        // In the future, this would be expanded for multi-track control
        if(index === 0) {
            const masterVolumeSlider = document.createElement('input');
            masterVolumeSlider.type = 'range';
            masterVolumeSlider.min = 0;
            masterVolumeSlider.max = 1;
            masterVolumeSlider.step = 0.01;
            masterVolumeSlider.value = 1;
            masterVolumeSlider.oninput = (e) => {
                appState.wavesurfer.setVolume(e.target.value);
            };

            const title = document.createElement('span');
            title.innerHTML = `🔊 Master`;

            trackElement.appendChild(title);
            trackElement.appendChild(masterVolumeSlider);
        } else {
            // Hide other tracks for now
            trackElement.style.display = 'none';
        }

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
        if (appState.wavesurfer.isPlaying()) {
            appState.wavesurfer.pause();
            playButton.textContent = '▶️ Play All';
        } else {
            appState.wavesurfer.play();
            playButton.textContent = '⏹️ Stop All';
        }
    };

    // Start the application
    init();
});
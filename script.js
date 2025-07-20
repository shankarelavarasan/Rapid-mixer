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
        player: null,
        isPlaying: false,
        effects: {
            reverb: new Tone.Reverb({ decay: 1.5, wet: 0 }).toDestination(),
            delay: new Tone.FeedbackDelay({ delayTime: '8n', feedback: 0.5, wet: 0 }).toDestination(),
            filter: new Tone.Filter({ type: 'lowpass', frequency: 20000, q: 1 }).toDestination()
        }
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
        const loadingOverlay = document.getElementById('loading-overlay');
        loadingOverlay.style.display = 'flex';

        try {
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

        const fileUrl = URL.createObjectURL(file);
        appState.wavesurfer.load(fileUrl);

        // Initialize Tone.js Player
        if (appState.player) {
            appState.player.dispose();
        }
        appState.player = new Tone.Player(fileUrl, () => {
            console.log('Tone.js player loaded');
            // Chain the effects: Player -> Filter -> Delay -> Reverb -> Destination
            appState.player.chain(appState.effects.filter, appState.effects.delay, appState.effects.reverb, Tone.Destination);
            setupMixerUI();
        });


        const formData = new FormData();
        formData.append('audio', file);

        try {
            const response = await fetch('http://localhost:3001/api/import/upload', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                console.log('File uploaded successfully:', data.filename);
            } else {
                console.error('File upload failed');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
        } catch (error) {
            console.error('Error processing file:', error);
            alert('Failed to load audio file. Please try a different file.');
        } finally {
            loadingOverlay.style.display = 'none';
        }
    };



    /**
     * Sets up the mixer UI by creating and appending track elements.
     */
    const setupMixerUI = () => {
        mixerContainer.innerHTML = '';

        // Master Volume
        const masterTrackElement = createTrackElement('Master', -1, 'volume');
        mixerContainer.appendChild(masterTrackElement);

        // Effects
        const reverbTrackElement = createTrackElement('Reverb', -1, 'reverb');
        mixerContainer.appendChild(reverbTrackElement);

        const delayTrackElement = createTrackElement('Delay', -1, 'delay');
        mixerContainer.appendChild(delayTrackElement);

        const filterTrackElement = createTrackElement('Filter', -1, 'filter');
        mixerContainer.appendChild(filterTrackElement);


        const controlsContainer = document.getElementById('controls-container');
        controlsContainer.innerHTML = ''; // Clear previous controls
        const playButton = createPlayButton();
        controlsContainer.appendChild(playButton);

        const exportButton = createExportButton();
        controlsContainer.appendChild(exportButton);
    };

    /**
     * Creates a single track element for the mixer.
     * @param {string} stem - The name of the instrument stem.
     * @param {number} index - The index of the stem in the configuration.
     * @returns {HTMLElement} The created track element.
     */
    const createTrackElement = (stem, index, controlType) => {
        const trackElement = document.createElement('div');
        trackElement.classList.add('track');

        const title = document.createElement('span');
        let emoji = '🔊';
        if (controlType === 'reverb') emoji = '🌌';
        if (controlType === 'delay') emoji = ' echoing_sound';
        if (controlType === 'filter') emoji = '🎚️';

        title.innerHTML = `${emoji} ${stem}`;

        const volumeSlider = document.createElement('input');
        switch (controlType) {
            case 'volume':
                volumeSlider.min = -60;
                volumeSlider.max = 6;
                volumeSlider.step = 0.1;
                volumeSlider.value = 0;
                volumeSlider.oninput = (e) => { if (appState.player) appState.player.volume.value = parseFloat(e.target.value); };
                break;
            case 'reverb':
                volumeSlider.min = 0;
                volumeSlider.max = 1;
                volumeSlider.step = 0.01;
                volumeSlider.value = 0;
                volumeSlider.oninput = (e) => { if (appState.effects.reverb) appState.effects.reverb.wet.value = parseFloat(e.target.value); };
                break;
            case 'delay':
                volumeSlider.min = 0;
                volumeSlider.max = 1;
                volumeSlider.step = 0.01;
                volumeSlider.value = 0;
                volumeSlider.oninput = (e) => { if (appState.effects.delay) appState.effects.delay.wet.value = parseFloat(e.target.value); };
                break;
            case 'filter':
                volumeSlider.min = 20;
                volumeSlider.max = 20000;
                volumeSlider.step = 10;
                volumeSlider.value = 20000;
                volumeSlider.oninput = (e) => { if (appState.effects.filter) appState.effects.filter.frequency.value = parseFloat(e.target.value); };
                break;
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
        playButton.textContent = '▶️ Play';
        playButton.onclick = async () => {
            await Tone.start();
            togglePlayback(playButton);
        };
        return playButton;
    };

    const createExportButton = () => {
        const exportButton = document.createElement('button');
        exportButton.textContent = '⬇️ Export';
        exportButton.onclick = async () => {
            if (!appState.player || !appState.player.loaded) {
                alert('Please load an audio file first.');
                return;
            }

            // Render the audio offline
            const buffer = await Tone.Offline(async () => {
                const player = new Tone.Player(appState.player.buffer).toDestination();
                player.chain(appState.effects.filter, appState.effects.delay, appState.effects.reverb, Tone.Destination);
                player.volume.value = appState.player.volume.value;
                player.start();
            }, appState.player.buffer.duration);

            // Convert the buffer to a WAV file
            const wavData = bufferToWave(buffer);
            const blob = new Blob([wavData], { type: 'audio/wav' });
            const url = URL.createObjectURL(blob);

            // Create a download link and click it
            const a = document.createElement('a');
            a.href = url;
            a.download = 'remix.wav';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        };
        return exportButton;
    };

    // Function to convert an AudioBuffer to a WAV file (from https://github.com/Tonejs/Tone.js/issues/341)
    function bufferToWave(abuffer) {
        var numOfChan = abuffer.numberOfChannels,
            length = abuffer.length * numOfChan * 2 + 44,
            buffer = new ArrayBuffer(length),
            view = new DataView(buffer),
            channels = [], i, sample,
            offset = 0,
            pos = 0;

        // write WAVE header
        setUint32(0x46464952);                         // "RIFF"
        setUint32(length - 8);                         // file length - 8
        setUint32(0x45564157);                         // "WAVE"

        setUint32(0x20746d66);                         // "fmt " chunk
        setUint32(16);                                 // length = 16
        setUint16(1);                                  // PCM (uncompressed)
        setUint16(numOfChan);
        setUint32(abuffer.sampleRate);
        setUint32(abuffer.sampleRate * 2 * numOfChan); // avg. bytes/sec
        setUint16(numOfChan * 2);
        setUint16(16);                                 // 16-bit sample

        setUint32(0x61746164);                         // "data" - chunk
        setUint32(length - pos - 4);                   // chunk length

        // write interleaved data
        for (i = 0; i < abuffer.numberOfChannels; i++)
            channels.push(abuffer.getChannelData(i));

        while (pos < length) {
            for (i = 0; i < numOfChan; i++) {             // interleave channels
                sample = Math.max(-1, Math.min(1, channels[i][offset])); // clamp
                sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0; // scale to 16-bit signed int
                view.setInt16(pos, sample, true);          // write 16-bit sample
                pos += 2;
            }
            offset++                                     // next source sample
        }

        return buffer;

        function setUint16(data) {
            view.setUint16(pos, data, true);
            pos += 2;
        }

        function setUint32(data) {
            view.setUint32(pos, data, true);
            pos += 4;
        }
    }

    const togglePlayback = (playButton) => {
        if (appState.player.state === 'started') {
            appState.player.stop();
            appState.wavesurfer.stop();
            playButton.textContent = '▶️ Play';
        } else {
            appState.player.start();
            appState.wavesurfer.play();
            playButton.textContent = '⏹️ Stop';
        }
    };

    // Start the application
    init();
});
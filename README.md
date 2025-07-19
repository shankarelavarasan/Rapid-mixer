# Rapid Mixer

A simple web-based audio mixer that allows you to upload a song and control the volume of different instrument tracks.

## How to Use

1.  Open the `index.html` file in your web browser.
2.  Click the "Upload Song" button to select an audio file from your computer.
3.  Once the song is loaded, you will see a mixer with tracks for Drums, Bass, Piano, Vocal, FX, and Others.
4.  Use the volume sliders to adjust the volume of each track.
5.  Click the "Play All" button to start and stop the music.

## Current Limitations

This version of Rapid Mixer does **not** perform real-time stem separation. Instead, it uses a placeholder approach where each track plays the full audio file. The volume sliders allow you to control the gain for each of these tracks, simulating a mixing experience.

True client-side stem separation is a complex task that typically requires server-side processing or specialized machine learning models, which are not yet widely available for in-browser use.

## Future Development

Future versions of this project may explore:

*   Integration with a server-side stem separation service.
*   Advanced audio visualizations.
*   Saving and loading mixer presets.

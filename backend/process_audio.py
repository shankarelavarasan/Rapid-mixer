import sys
from spleeter.separator import Separator

def process_audio(file_path):
    """
    Processes an audio file using Spleeter to separate it into stems.

    Args:
        file_path (str): The path to the audio file.
    """
    separator = Separator('spleeter:5stems')
    separator.separate_to_file(file_path, 'output')

if __name__ == '__main__':
    if len(sys.argv) > 1:
        audio_file = sys.argv[1]
        process_audio(audio_file)
    else:
        print("Please provide the path to the audio file.")
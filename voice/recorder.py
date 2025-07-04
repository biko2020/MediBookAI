import sounddevice as sd
import scipy.io.wavfile as wavfile

class AudioRecorder:
    def __init__(self, sample_rate=44100):
        self.sample_rate = sample_rate

    def record(self, duration=5, filename="temp.wav"):
        audio = sd.rec(int(duration * self.sample_rate), samplerate=self.sample_rate, channels=1)
        sd.wait()
        wavfile.write(filename, self.sample_rate, audio)
        return filename

class AudioPlayer {
    constructor() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.oscillators = {};
    }

    playSound(frequency) {
        if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        oscillator.type = 'sine'; // Можете изменить тип осциллятора для других звуков
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);

        oscillator.connect(this.audioContext.destination);
        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + 0.2); // Длительность звука в секундах

        this.oscillators[frequency] = oscillator;
    }

    stopSound(frequency) {
        if (!this.audioContext || !this.oscillators[frequency]) return;
        this.oscillators[frequency].stop();
        delete this.oscillators[frequency];
    }
}

export default AudioPlayer;
import React, { useState, useEffect } from 'react';
import './Piano.css';
import AudioPlayer from "../Audio/Audio";

const pianoKeys = [
    { note: 'C', keyCode: 65, frequency: 261.63, type: 'white' },
    { note: 'C#', keyCode: 87, frequency: 277.18, type: 'black' },
    { note: 'D', keyCode: 83, frequency: 293.66, type: 'white' },
    { note: 'D#', keyCode: 69, frequency: 311.13, type: 'black' },
    { note: 'E', keyCode: 68, frequency: 329.63, type: 'white' },
    { note: 'F', keyCode: 70, frequency: 349.23, type: 'white' },
    { note: 'F#', keyCode: 84, frequency: 369.99, type: 'black' },
    { note: 'G', keyCode: 71, frequency: 392.00, type: 'white' },
    { note: 'G#', keyCode: 89, frequency: 415.30, type: 'black' },
    { note: 'A', keyCode: 72, frequency: 440.00, type: 'white' },
    { note: 'A#', keyCode: 85, frequency: 466.16, type: 'black' },
    { note: 'B', keyCode: 74, frequency: 493.88, type: 'white' },
];

const audioPlayer = new AudioPlayer();

const Piano = () => {
    const [keysPressed, setKeysPressed] = useState({});
    const [soundDuration, setSoundDuration] = useState(1);   


    const handleKeyDown = (note) => {
        setKeysPressed((prevState) => ({
            ...prevState,
            [note]: true,
        }));

        audioPlayer.playSound(pianoKeys.find((key) => key.note === note).frequency, soundDuration);
    };

    const handleKeyUp = (note) => {
        setKeysPressed((prevState) => ({
            ...prevState,
            [note]: false,
        }));

        audioPlayer.stopSound(pianoKeys.find((key) => key.note === note).frequency);
    };
    const handleDurationChange = (e) => {
        setSoundDuration(parseFloat(e.target.value));
    };


    useEffect(() => {
        const handleKeyPress = (e) => {
            const keyInfo = pianoKeys.find((key) => key.keyCode === e.keyCode);
            if (keyInfo) {
                if (!keysPressed[keyInfo.note]) {
                    handleKeyDown(keyInfo.note);
                }
            }
        };

        const handleKeyRelease = (e) => {
            const keyInfo = pianoKeys.find((key) => key.keyCode === e.keyCode);
            if (keyInfo) {
                if (keysPressed[keyInfo.note]) {
                    handleKeyUp(keyInfo.note);
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        window.addEventListener('keyup', handleKeyRelease);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
            window.removeEventListener('keyup', handleKeyRelease);
        };
    }, [keysPressed, pianoKeys, handleKeyDown, handleKeyUp, audioPlayer, soundDuration]);

    return (
        <div className="piano">
            <div>
                <label htmlFor="duration">Длительность звука:</label>
                <input
                    type="number"
                    id="duration"
                    value={soundDuration}
                    min="0.1"
                    step="0.1"
                    onChange={handleDurationChange}
                />
            </div>
                {pianoKeys.map((keyInfo) => (
                    <div
                        key={keyInfo.note}
                        className={`${
                            keyInfo.type === 'white' ? 'white-key' : 'black-key'
                        } ${keysPressed[keyInfo.note] ? 'pressed' : ''}`}
                        onMouseDown={() => handleKeyDown(keyInfo.note)}
                        onMouseUp={() => handleKeyUp(keyInfo.note)}
                        tabIndex={0}
                    >
                        {keyInfo.note}
                    </div>
                ))}
        </div>
    );
};

export default Piano;
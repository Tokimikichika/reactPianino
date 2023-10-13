import React, { useState, useEffect } from 'react';
import './Piano.css'; // Импортируйте файл стилей

const Piano = () => {
    const [keysPressed, setKeysPressed] = useState({});

    const handleKeyDown = (key) => {
        // Обработчик нажатия клавиши
        setKeysPressed((prevKeys) => ({ ...prevKeys, [key]: true }));
        // Воспроизводить звук, соответствующий нажатой клавише
        playSound(key);
    };

    const handleKeyUp = (key) => {
        // Обработчик отпускания клавиши
        setKeysPressed((prevKeys) => ({ ...prevKeys, [key]: false }));
        // Остановить звук, связанный с этой клавишей
        stopSound(key);
    };

    // Определите клавиши пианино и их соответствующие частоты звука
    const pianoKeys = [
        { note: 'C', keyCode: 65, frequency: 261.63 }, // 'A' key
        { note: 'D', keyCode: 83, frequency: 293.66 }, // 'S' key
        { note: 'E', keyCode: 68, frequency: 329.63 }, // 'D' key
        { note: 'F', keyCode: 70, frequency: 349.23 }, // 'F' key
        { note: 'G', keyCode: 71, frequency: 392.00 }, // 'G' key
        { note: 'A', keyCode: 72, frequency: 440.00 }, // 'H' key
        { note: 'B', keyCode: 74, frequency: 493.88 }, // 'J' key
    ];

    // Создайте аудио контекст
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Функция для воспроизведения звука
    const playSound = (key) => {
        const keyInfo = pianoKeys.find((item) => item.note === key);
        if (keyInfo) {
            const oscillator = audioContext.createOscillator();
            oscillator.type = 'sine'; // Тип звукового сигнала (здесь синусоида)
            oscillator.frequency.setValueAtTime(keyInfo.frequency, audioContext.currentTime);
            oscillator.connect(audioContext.destination);
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.3); // Остановить звук через 0.3 секунды
        }
    };

    // Функция для остановки звука
    const stopSound = (key) => {
        // Здесь можно добавить логику для остановки звука (по желанию)
    };

    // Добавьте обработчик событий для отслеживания изменения контекста аудио
    useEffect(() => {
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
    }, [audioContext]);

    return (
        <div className="piano">
            {pianoKeys.map((keyInfo) => (
                <div
                    key={keyInfo.note}
                    className={`piano-key ${keysPressed[keyInfo.note] ? 'pressed' : ''}`}
                    onMouseDown={() => handleKeyDown(keyInfo.note)}
                    onMouseUp={() => handleKeyUp(keyInfo.note)}
                    onKeyDown={(e) => {
                        if (e.keyCode === keyInfo.keyCode) {
                            handleKeyDown(keyInfo.note);
                        }
                    }}
                    onKeyUp={(e) => {
                        if (e.keyCode === keyInfo.keyCode) {
                            handleKeyUp(keyInfo.note);
                        }
                    }}
                    tabIndex={0}
                >
                    {keyInfo.note}
                </div>
            ))}
        </div>
    );
};

export default Piano;
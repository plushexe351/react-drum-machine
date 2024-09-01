import React, { useEffect, useState, useRef } from "react";
import { Minus, Plus, Power } from "react-feather";
import kick1 from "../assets/kick1.mp3";
import crash1 from "../assets/crash.mp3";
import hiHat1 from "../assets/hihat.mp3";
import snare1 from "../assets/snare.mp3";
import heater3 from "../assets/Heater-3.mp3";
import heater1 from "../assets/Heater-1.mp3";
import heater2 from "../assets/Heater-2.mp3";
import openhihat from "../assets/Dsc_Oh.mp3";
import kickHat from "../assets/Kick_n_Hat.mp3";

const row1 = [
  { id: "kick1", key: "Q", sound: kick1 },
  { id: "hihat1", key: "W", sound: hiHat1 },
  { id: "crash1", key: "E", sound: crash1 },
];

const row2 = [
  { id: "heater1", key: "A", sound: heater1 },
  { id: "heater2", key: "S", sound: heater2 },
  { id: "heater3", key: "D", sound: heater3 },
];

const row3 = [
  { id: "kickHat", key: "Z", sound: kickHat },
  { id: "openhihat", key: "X", sound: openhihat },
  { id: "snare1", key: "C", sound: snare1 },
];

const DrumPad = () => {
  const [displayText, setDisplayText] = useState("");
  const [drumPadOn, setDrumPadOn] = useState(false);
  const audioRefs = useRef({});

  const toggleDrumPadOnOff = () => {
    setDrumPadOn((prev) => !prev);
    setDisplayText(drumPadOn);
  };

  const handlePlaySound = (id) => {
    if (drumPadOn) {
      const audio = audioRefs.current[id];
      audio.currentTime = 0;
      audio.play();
      setDisplayText(id);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      const allPads = [...row1, ...row2, ...row3];
      const pad = allPads.find(
        (pad) => pad.key.toLowerCase() === e.key.toLowerCase()
      );
      if (pad) {
        handlePlaySound(pad.id);
      } else if (e.key.toLowerCase() === "o") {
        toggleDrumPadOnOff();
      }
    };
    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [drumPadOn]);

  const renderPadRow = (pads) => (
    <div className="pad-row">
      {pads.map((pad) => (
        <div
          key={pad.id}
          className={`drum-pad ${drumPadOn ? "on" : ""}`}
          id={pad.id}
          onClick={() => handlePlaySound(pad.id)}
        >
          {pad.key}
          <audio
            ref={(el) => (audioRefs.current[pad.id] = el)}
            src={pad.sound}
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="DrumPad" id="drum-machine">
      <div className="pad-container">
        {renderPadRow(row1)}
        {renderPadRow(row2)}
        {renderPadRow(row3)}
      </div>
      <div className="control-panel">
        <div className="controls">
          <div
            className={`power ${drumPadOn ? "on" : ""}`}
            onClick={toggleDrumPadOnOff}
          >
            <Power className="icon" />
          </div>
          <div className="volume-container">
            <div className="volume-up">
              <Plus className="icon" />
            </div>
            <div className="volume-down">
              <Minus className="icon" />
            </div>
          </div>
        </div>
        <div className="screen">
          <p>{drumPadOn ? displayText || "Welcome..." : ""}</p>
        </div>
      </div>
    </div>
  );
};

export default DrumPad;

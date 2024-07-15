//video

import React, { useEffect, useRef } from "react";
import "./styles.css";

export default function App() {
  const videoEl = useRef(null);

  const attemptPlay = () => {
    videoEl &&
      videoEl.current &&
      videoEl.current.play().catch(error => {
        console.error("Error attempting to play", error);
      });
  };

  useEffect(() => {
    attemptPlay();
  }, []);

  return (
    <div className="App">
      <h1>Autoplay example</h1>
      <div>
        <video
          style={{ maxWidth: "100%", width: "800px", margin: "0 auto" }}
          playsInline
          loop
          muted
          controls
          alt="All the devices"
          src="https://stream.mux.com/6fiGM5ChLz8T66ZZiuzk1KZuIKX8zJz00/medium.mp4"
          ref={videoEl}
        />
      </div>
    </div>
  );
}

//CSS
.App {
  font-family: sans-serif;
  text-align: center;
}
<----------------------------------------------------------------------------------------------------------->

//error popper.js core para bootstrap 5 solucion de error
  npm install @popperjs/core --save

// en caso de error en node_modules por algunos paquetes digitar comando:
sudo rm -rf node_modules
luego sudo npm install

//

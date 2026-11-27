import { useState, useEffect } from "react";
import './App.css'
import Potato from './assets/Potato.png'
import PopSound from './assets/macMusic.mp3'
import Heros from "./components/Heros";
function App() {

  const [lodings, setLodings] = useState(true)

  const playMusic = () =>{
    const audio = new Audio(PopSound);

    audio.play();

    setTimeout(()=>{
      audio.pause();
      audio.currentTime = 0;
    }, 3500)
  }

  useEffect (() => {
    const timer = setTimeout(() => {
      setLodings(false); 
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  if(lodings){
    return (
      <div className="loding-screen">

        <div className="potato-animation">
          <img src={Potato} alt="Potato img" onClick={playMusic}/>
        </div>

        <p className="loding-text">ロード中</p>
      </div>
    )
  }
  return (
    <>
    <Heros />
    </>
  )
}

export default App

import React, { useState } from 'react'
import './App.css'
import { Color, Limb } from './types';




function App() {
  const [colors, setColors] = useState<Array<Color>>([]);
  const [limbs, setLimbs] = useState<Array<Limb>>([Limb.RightArm, Limb.LeftArm, Limb.RightLeg, Limb.LeftLeg]);
  const [rolled, setRolled] = useState<Color>(Color.Red);

  const addColor = (color: Color) => {
    setColors([...colors, color]);
  };

  const addLimb = (limb: Limb) => {
    setLimbs([...limbs, limb]);
  };

  const deleteColor= (color: Color) => {
    const colorIdx = colors.indexOf(color);
    const updatedColors = [...colors];
    updatedColors.splice(colorIdx,1);
    setColors(updatedColors);
  }

  const deleteLimb = (limb: Limb) => {
    const limbIdx = limbs.indexOf(limb);
    const updatedLimbs = [...limbs];
    updatedLimbs.splice(limbIdx,1);
    setLimbs(updatedLimbs);
  }

  const roll = () => {
    const color = colors[Math.floor(Math.random()*colors.length)];
    const limb  = colors[Math.floor(Math.random()*limbs.length)];
    
    setRolled(color);
  }

  return (
    <React.Fragment>
      <header>
        <h1>Wspinaczkowy Twister</h1>
      </header>
      <main>
        <section>
          <h2>{rolled}</h2>
          <button onClick={() => roll()}>Zakręć</button>
          <img src=''></img>
        </section>
      </main>
    </React.Fragment>
  )
}

export default App

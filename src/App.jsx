import { useState } from 'react'
import './App.css'
import Matriz from './components/Matriz';
import MatrizCostos from './components/MatrizCostos';

function App() {
  const [alternativas, setAlternativas] = useState(3);
  const [futuros, setFuturos] = useState(3);
  const [coeficiente, setCoeficiente] = useState(0.5);

  const [matriz, setMatriz] = useState(Array(10).fill(0).map(() => Array(10).fill(0)));

  console.log(coeficiente);

  return (<div className='container'>
    <h1>Teoría de Decisión: Incertidumbre</h1>
    <div style={{display: "flex", gap: "2rem", justifyContent: "center"}}>
      <div>
        <h3>Alternativas</h3>
        <input type="number" min={0} max={10} value={alternativas} onChange={(event) => setAlternativas(event.target.value)} />
      </div>
      <div>
        <h3>Futuros</h3>
        <input type="number" min={0} max={10} value={futuros} onChange={(event) => setFuturos(event.target.value)} />
      </div>
      <div>
        <h3>Coeficiente de Optimismo</h3>
        <input type="number" min={0} max={1} step={0.01} value={coeficiente} onChange={(event) => setCoeficiente(event.target.value)} />
      </div>
      <br />
    </div>
    <h2>Matriz de Ganancias</h2>
    <Matriz alternativas={alternativas} futuros={futuros} coeficiente={coeficiente} matriz={matriz} setMatriz={setMatriz}/>
    <h2>Matriz de Costos de Oportunidad</h2>
    <MatrizCostos alternativas={alternativas} futuros={futuros} matriz={matriz} setMatriz={setMatriz}/>

  </div>
  )
}

export default App


import './style.css';

import {FiSearch} from 'react-icons/fi';
import {useState} from 'react';
import api from "./services/api"

function App() {

  const[input, setInput] = useState('')
  const[cep, setCep] = useState({});

  async function handleSearche(){
    if(input === " "){
      alert("Preencha algum CEP")
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    }
    catch{
      alert("ops erro ao discar");
      setInput("");
    }
  }

  return (
    <div className="container">
     <h1 className="title">Buscador de CEP</h1>
    <div className="containerInput">
      <input type="text"
      placeholder="Digite o seu CEP..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
      />

    <button className="buttonSearch" onClick={handleSearche}>
      <FiSearch size={25} color="FFF"/>
    </button>
    </div>

    {Object.keys(cep).length > 0 && (
        <main className='main'>
        <h2>CEP: {cep.cep}</h2>
        <span>{cep.logradouro}</span>
        <span>{cep.bairro}</span>
        <span>{cep.localidade} - {cep.uf}</span>
        </main>
    )}
    
  
    </div>
  );//https://react-icons.github.io/react-icons/
}

export default App;

import { useState } from 'react';
import {FiSearch} from 'react-icons/fi';
import './styles.css';
import api from './services/api';
import InputMask from 'react-input-mask';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch(){
    //01310930/jason/

    if(input === ''){
      alert("Preencha o CEP!")
      return;
    }

    // Remove non-numeric characters from the input
    const numericInput = input.replace(/\D/g, '');

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("")

    }catch{
      alert("CEP INVÁLIDO!");
      setInput("")
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>

      <div className="containerInput">
      <InputMask
        mask="99999-999"
        maskChar=""
        type="text"
        placeholder="Digite o CEP..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color='#FFF'/>
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
         <main className='main'>
          <h2>CEP: {cep.cep}</h2>
  
          <span>{cep.logradouro}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
           
       </main>
      )}
     

    </div>
  );
}

export default App;

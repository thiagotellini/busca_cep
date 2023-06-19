import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import InputMask from 'react-input-mask';
import './styles.css';
import api from './services/api';

function App() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if (input === '') {
      alert('Preencha o CEP!');
      return;
    }

    const numericInput = input.replace(/\D/g, '');

    try {
      const response = await api.get(`${numericInput}/json`);
      if (response.data.erro) {
        alert('CEP INVÁLIDO!');
      } else {
        setCep(response.data);
      }
      setInput('');
    } catch {
      alert('Ocorreu um erro na consulta. Tente novamente mais tarde.');
      setInput('');
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      handleSearch();
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
          onKeyDown={handleKeyDown}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>
            {cep.localidade} - {cep.uf}
          </span>
        </main>
      )}
    </div>
  );
}

export default App;

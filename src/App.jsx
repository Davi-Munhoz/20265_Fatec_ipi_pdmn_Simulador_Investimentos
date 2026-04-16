import { useState } from 'react';
import CapturaDados from './assets/CapturaDados';
import ExibeDados from './assets/ExibeDados';
import './App.css';

const App = () => {
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState(null);
  
  const calcular = (valorInicial, aporte, taxa, periodo) => {

    if (!valorInicial || !aporte || !taxa || !periodo) {
      setErro("Preencha todos os campos para fazer a simulação.");
      setResultado(null);
      return;
    }
    
    setErro(null)

    const vi = parseFloat(valorInicial);
    const ap = parseFloat(aporte);
    const tx = parseFloat(taxa) / 100;
    const n = parseInt(periodo);

    let montante = vi * (1 + tx) ** n + ap * (((1 + tx) ** n - 1) / tx);

    const totalInvestido = vi + ap * n
    const juros = montante - totalInvestido
    const rentabilidade = (juros / totalInvestido) * 100

    const novoResultado = {
      valorFinal: montante,
      totalInvestido,
      juros,
      rentabilidade,
      numAportes: n
    }

    setResultado(novoResultado)

  }
  const limpar = () => {
    setResultado(null)
  }
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <h1>Hello, Investimentos</h1>
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-md-6 mx-auto">
          <CapturaDados onCalcular={calcular} onLimpar={limpar} />
        </div>
      </div>

      {erro && (
        <div className="alert alert-danger mt-3">
          {erro}
        </div>
      )}

      {
        resultado &&
        <div className="row mt-3">
          <div className="col-12 col-md-6 mx-auto">
            <ExibeDados resultado={resultado} />
          </div>
        </div>
      }
    </div>
  )
}

export default App;
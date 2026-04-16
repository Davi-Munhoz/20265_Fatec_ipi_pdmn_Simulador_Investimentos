import { useState } from 'react';
import CapturaDados from './assets/CapturaDados';
import ExibeDados from './assets/ExibeDados';
import './App.css';

const App = () => {
  const [resultado, setResultado] = useState(null);
  const [historico, setHistorico] = useState([]);
  const [erro, setErro] = useState(null);

  const formatarMoeda = (valor) => {
    const valorArredondado = valor.toFixed(2)
    const partes = valorArredondado.split('.')
    const inteiro = partes[0]
    const decimal = partes[1]

    let resultado = ''
    let contador = 0

    for (let i = inteiro.length - 1; i >= 0; i--) {
      resultado = inteiro[i] + resultado
      contador++
      if (contador % 3 === 0 && i !== 0) {
        resultado = '.' + resultado
      }
    }

    return 'R$ ' + resultado + ',' + decimal
  }
  
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
    setHistorico([
      { data: new Date(), valorFinal: montante },
      ...historico
    ])
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

      {
        historico.length > 0 &&
        <div className="row mt-4">
          <div className="col-12 col-md-6 mx-auto">
            <div className="d-flex justify-content-between">
              <h5>Histórico de simulações</h5>
              <span>{historico.length} simulações</span>
            </div>
            <table className="table table-bordered mt-2">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Valor final</th>
                </tr>
              </thead>
              <tbody>
                {
                  historico.map((item, index) => (
                    <tr key={index}>
                      <td>
                        {item.data.toLocaleDateString('pt-BR')}{' '}
                        {item.data.toLocaleTimeString('pt-BR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td>
                        {formatarMoeda(item.valorFinal)}
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      }
    </div>
  )
}

export default App;
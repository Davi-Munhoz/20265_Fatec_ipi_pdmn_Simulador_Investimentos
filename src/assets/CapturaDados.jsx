import { useState } from 'react';


const CapturaDados = (props) => {
    const [valorInicial, setValorInicial] = useState('');
    const [aporte, setAporte] = useState('');
    const [taxa, setTaxa] = useState('');
    const [periodo, setPeriodo] = useState('');
    
    const onTermosAlterados = (event) => {
        event.preventDefault()
        props.onCalcular(valorInicial, aporte, taxa, periodo)
    }
    const onLimparCampos = () => {
        setValorInicial('')
        setAporte('')
        setTaxa('')
        setPeriodo('')
        props.onLimpar()
    }

    return (
        <form onSubmit={onTermosAlterados} className="card p-3">

            <div className="mb-2">
                <label>Valor inicial</label>
                <input
                    type="number"
                    className="form-control"
                    value={valorInicial}
                    onChange={(e) => setValorInicial(e.target.value)}
                />
            </div>

            <div className="mb-2">
                <label>Aporte mensal</label>
                <input
                    type="number"
                    className="form-control"
                    value={aporte}
                    onChange={(e) => setAporte(e.target.value)}
                />
            </div>

            <div className="mb-2">
                <label>Taxa (%)</label>
                <input
                    type="number"
                    className="form-control"
                    value={taxa}
                    onChange={(e) => setTaxa(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label>Período (meses)</label>
                <input
                    type="number"
                    className="form-control"
                    value={periodo}
                    onChange={(e) => setPeriodo(e.target.value)}
                />
            </div>

            <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary">
                    Calcular
                </button>

                <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={onLimparCampos}
                >
                    Limpar
                </button>
            </div>

        </form>
    )
}

export default CapturaDados;
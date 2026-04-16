import React from 'react'

const ExibeDados = (props) => {

    const { resultado } = props

    if (!resultado) return null

    const formatarMoeda = (valor) => {
        const valorArredondado = valor.toFixed(2)
        const partes = valorArredondado.split('.')
        const inteiro = partes[0]
        const decimal = partes[1]

        let resultadoFormatado = ''
        let contador = 0

        for (let i = inteiro.length - 1; i >= 0; i--) {
            resultadoFormatado = inteiro[i] + resultadoFormatado
            contador++
            if (contador % 3 === 0 && i !== 0) {
                resultadoFormatado = '.' + resultadoFormatado
            }
        }

        return 'R$ ' + resultadoFormatado + ',' + decimal
    }

    return (
        <div className="card p-3 mt-3">

            <h5 className="mb-2">Valor final acumulado</h5>
            <h2 className="mb-3">{formatarMoeda(resultado.valorFinal)}</h2>

            <hr />

            <div className="row mt-2">

                <div className="col-12 col-md-6">
                    <div className="mb-2">
                        <span>Total investido</span><br />
                        <strong>{formatarMoeda(resultado.totalInvestido)}</strong>
                    </div>

                    <div className="mb-2">
                        <span>Nº de aportes</span><br />
                        <strong>{resultado.numAportes}</strong>
                    </div>
                </div>

                <div className="col-12 col-md-6">
                    <div className="mb-2">
                        <span>Juros acumulados</span><br />
                        <strong>{formatarMoeda(resultado.juros)}</strong>
                    </div>

                    <div className="mb-2">
                        <span>Rentabilidade</span><br />
                        <strong>+{resultado.rentabilidade.toFixed(2)}%</strong>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default ExibeDados

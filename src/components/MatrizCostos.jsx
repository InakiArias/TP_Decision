import './Matriz.css';

export default function MatrizCostos({ alternativas, futuros, coeficiente, matriz, setMatriz }) {
    const futurosList = [];


    for (let index = 0; index < futuros; index++) {
        futurosList.push(
            <th>F{index + 1}</th>
        )
    }

    const alternativasList = [];

    const maximos = [];

    for (let j = 0; j < futuros; j++) {
        const columna = [];

        for (let i = 0; i < alternativas; i++) {
            columna.push(matriz[i][j]);
        }

        maximos.push(Math.max(...columna));
    }

    console.log({maximos});

    const futurosList2 = [];

    const costos = Array(10).fill(0).map(() => Array(10).fill(0));

    for (let i = 0; i < alternativas; i++) {
        for (let j = 0; j < futuros; j++) {
            costos[i][j] = maximos[j] - matriz[i][j];
        }
    }


    const pesimistas = [];
    for (let i = 0; i < alternativas; i++) {
        const pesimista = Math.max(...costos[i].slice(0, alternativas));
        pesimistas.push(pesimista);
    }

    console.log(pesimistas);

    const pesimistaIndice = pesimistas.indexOf(Math.min(...pesimistas));

    for (let i = 0; i < alternativas; i++) {
        const futurosList2 = [];

        for (let j = 0; j < futuros; j++) {
            futurosList2.push(
                <td key={i + " " + j} className='costoTD'><input readOnly value={costos[i][j]} /></td>
            )
        }

        alternativasList.push(
            <tr>
                <td>A{i + 1}</td>
                {futurosList2}
                <td className={pesimistaIndice === i ? "mejorOpcion" : ""}>{pesimistas[i]}</td>
            </tr>
        )
    }

    return <table>
        <tr>
            <th>Alternativas/Futuros</th>
            {futurosList}
            <th>Pesimista</th>
        </tr>
        {alternativasList}
    </table>
}

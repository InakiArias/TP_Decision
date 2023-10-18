import { useState } from "react";

import './Matriz.css';

export default function Matriz({ alternativas, futuros, coeficiente, matriz, setMatriz }) {
    const futurosList = [];

    for (let index = 0; index < futuros; index++) {
        futurosList.push(
            <th>F{index + 1}</th>
        )
    }

    const alternativasList = [];

    const cambiarValorMatriz = (i, j, event) => {
        // if (event.target.value === "") {
        //     event.target.value = 0;
        // }

        setMatriz((matrizAnterior) => {
            matrizAnterior[i][j] = event.target.value;

            return [...matrizAnterior];
        })
    }

    const optimistas = [];
    const pesimistas = [];
    const hurwiczes = [];
    const laplaces = [];

    for (let i = 0; i < alternativas; i++) {
        const optimista = Math.max(...matriz[i].slice(0, alternativas));
        optimistas.push(optimista);

        const pesimista = Math.min(...matriz[i].slice(0, alternativas));
        pesimistas.push(pesimista);

        hurwiczes.push(optimista * coeficiente + pesimista * (1 - coeficiente));

        let suma = 0;

        for (let j = 0; j < futuros; j++) {
            suma += Number(matriz[i][j]);
        }

        laplaces.push(suma / futuros);
    }

    const optimistaIndice = optimistas.indexOf(Math.max(...optimistas));
    const pesimistaIndice = pesimistas.indexOf(Math.max(...pesimistas));
    const hurwiczIndice = hurwiczes.indexOf(Math.max(...hurwiczes));
    const laplacesIndice = laplaces.indexOf(Math.max(...laplaces));

    for (let i = 0; i < alternativas; i++) {
        const futurosList2 = [];

        for (let j = 0; j < futuros; j++) {
            futurosList2.push(
                <td key={i + " " + j}><input type="number" defaultValue={0} onChange={(event) => cambiarValorMatriz(i, j, event)} /></td>
            )
        }

        alternativasList.push(
            <tr>
                <td>A{i + 1}</td>
                {futurosList2}
                <td className={optimistaIndice === i ? "mejorOpcion" : ""}>{optimistas[i]}</td>
                <td className={pesimistaIndice === i ? "mejorOpcion" : ""}>{pesimistas[i]}</td>
                <td className={hurwiczIndice === i ? "mejorOpcion" : ""}>{hurwiczes[i].toLocaleString("en-US", { maximumFractionDigits: 6, minimumFractionDigits: 0 })}</td>
                <td className={laplacesIndice === i ? "mejorOpcion" : ""}>{laplaces[i].toLocaleString("en-US", { maximumFractionDigits: 6, minimumFractionDigits: 0 })}</td>
            </tr>
        )
    }



    return <table>
        <tr>
            <th>Alternativas/Futuros</th>
            {futurosList}
            <th>Optimista</th>
            <th>Pesimista</th>
            <th>Hurwicz</th>
            <th>Laplace</th>
        </tr>
        {alternativasList}
    </table>
}
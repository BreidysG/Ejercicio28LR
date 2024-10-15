const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let aciertos = 0;
let errores = 0;
let velocidad = 700;
let intervalId;
let letrasRojas;

document.getElementById('start-btn').addEventListener('click', iniciarEjercicio);
document.getElementById('error-btn').addEventListener('click', verificarError);

function iniciarEjercicio() {
    aciertos = 0;
    errores = 0;
    document.getElementById('aciertos').textContent = aciertos;
    document.getElementById('errores').textContent = errores;
    velocidad = parseInt(document.getElementById('velocidad').value);
    document.getElementById("grid").classList.remove("hidden");
    document.getElementById("error-btn").classList.remove("hidden");
    document.getElementById("p1").classList.remove("hidden");
    document.getElementById("p2").classList.remove("hidden");
    document.getElementById("parrafo").classList.add("hidden");
    document.getElementById("label-velocidad").classList.add("hidden");
    document.getElementById("velocidad").classList.add("hidden");
    document.getElementById("start-btn").classList.add("hidden");

    generarGrid();
    intervalId = setInterval(cambiarLetras, velocidad);
}

function generarGrid() {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';

    for (let fila = 0; fila < 5; fila++) {
        for (let columna = 0; columna < 9; columna++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if ((fila === 0 && (columna === 0 || columna === 8)) || 
                (fila === 4 && (columna === 0 || columna === 8)) ||
                (fila === 2 && (columna === 0 || columna === 8))) {
                cell.classList.add('red');
            }
            if (fila === 2 && columna === 4) {
                cell.innerHTML = `<span style="background-color:black; display:block; width:10px; height:10px; border-radius:50%;"></span>`;
            } else {
                cell.textContent = obtenerLetraAleatoria();
            }
            grid.appendChild(cell);
        }
    }
}

function obtenerLetraAleatoria() {
    return letras[Math.floor(Math.random() * letras.length)];
}

function cambiarLetras() {
    const celdas = document.querySelectorAll('.cell');
    letrasRojas = [];

    // Decidir si todas las letras rojas serán iguales
    let forzarIguales = Math.random() < 0.3; // 30% de probabilidad de que todas sean iguales
    let letraComun = obtenerLetraAleatoria();

    celdas.forEach((celda, index) => {
        if (celda.classList.contains('red')) {
            let nuevaLetra = forzarIguales ? letraComun : obtenerLetraAleatoria();
            letrasRojas.push(nuevaLetra);
            celda.textContent = nuevaLetra;
        } else if (!celda.innerHTML.includes('black')) {
            celda.textContent = obtenerLetraAleatoria();
        }
    });

    document.getElementById('error-btn').disabled = false; // El botón siempre habilitado
}

function verificarError() {
    // Incrementar el contador de errores si todas las letras rojas son iguales
    if (new Set(letrasRojas).size === 1) {
        errores++; // Se suman al contador de errores
    } else {
        aciertos++; // Se suman al contador de aciertos
    }
    // Actualizar los contadores en el DOM
    document.getElementById('aciertos').textContent = aciertos;
    document.getElementById('errores').textContent = errores;
}


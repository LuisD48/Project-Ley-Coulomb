function calcularFuerza() {
    // 1. Obtener los valores del usuario
    let q1_uC = parseFloat(document.getElementById('q1').value);
    let q2_uC = parseFloat(document.getElementById('q2').value);
    let r_cm = parseFloat(document.getElementById('r').value);

    if (isNaN(q1_uC) || isNaN(q2_uC) || isNaN(r_cm) || r_cm <= 0) {
        alert("Por favor ingresa valores numéricos válidos. La distancia debe ser mayor a 0.");
        return;
    }

    // 2. Aplicar conversiones de unidades requeridas por la fórmula
    const K = 9e9;         
    let q1 = q1_uC * 1e-6; 
    let q2 = q2_uC * 1e-6; 
    let r = r_cm * 1e-2;   

    // 3. Calcular la Magnitud de la Fuerza
    let fuerza = K * Math.abs(q1 * q2) / Math.pow(r, 2);
    
    // 4. Determinar el tipo de interacción
    let tipo = "Nula";
    if (q1 !== 0 && q2 !== 0) {
        tipo = (q1 * q2 < 0) ? "Atracción" : "Repulsión";
    }

    // 5. Imprimir los resultados validados
    document.getElementById('resultado').innerHTML = 
        `<strong>Fuerza Eléctrica (F):</strong> ${fuerza.toExponential(3)} N <br> 
         <strong>Comportamiento:</strong> Fuerza de ${tipo}`;

    // 6. Actualizar colores y aplicar animaciones
    actualizarBola('bola1', q1_uC);
    actualizarBola('bola2', q2_uC);

    let flechas = document.getElementById('flechas');
    let bola1 = document.getElementById('bola1');
    let bola2 = document.getElementById('bola2');

    // Aquí sucede la magia de la animación
    if (tipo === "Atracción") {
        flechas.innerHTML = "--> Atracción <--";
        flechas.style.color = "#198754";
        // Se acercan al centro
        bola1.style.transform = "translateX(150px)";
        bola2.style.transform = "translateX(-150px)";
        
    } else if (tipo === "Repulsión") {
        flechas.innerHTML = "<-- Repulsión -->";
        flechas.style.color = "#dc3545";
        // Se alejan del centro
        bola1.style.transform = "translateX(-1px)";
        bola2.style.transform = "translateX(1px)";
        
    } else {
        flechas.innerHTML = "Sin interacción";
        flechas.style.color = "#6c757d";
        // Regresan a su posición neutral
        bola1.style.transform = "translateX(0)";
        bola2.style.transform = "translateX(0)";
    }
}

function actualizarBola(id, carga) {
    let bola = document.getElementById(id);
    bola.className = 'charge'; 
    
    if (carga > 0) {
        bola.classList.add('positive');
        bola.innerText = '+';
    } else if (carga < 0) {
        bola.classList.add('negative');
        bola.innerText = '-';
    } else {
        bola.classList.add('neutral');
        bola.innerText = '0';
    }
}

window.onload = calcularFuerza;
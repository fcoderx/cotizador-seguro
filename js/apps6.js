
class Seguro {
    // Constructor para el seguro
    constructor(marca, anio, tipo) {
        this.marca = marca;
        this.anio = anio;
        this.tipo = tipo;
    }

    cotizarSeguro() {
        const base = 2000;
        let cantidad;
    
        switch (this.marca) {
            case '1':
                cantidad = base * 1.15;
                break; 
            case '2':
                cantidad = base * 1.05;
                break;
            case '3':
                cantidad = base * 1.35;
                break;
        }
    
        // Leer el año y reducir la cantidad por 3% por cada año haya pasado
        const diferencia = new Date().getFullYear() - this.anio;
        
        cantidad -= ((diferencia * 3) * cantidad) / 100;
    
        /* 
            Si el seguro es básico se multiplica por 30%
            Si el seguro es completo se multiplica por 50%
        */ 
       if (this.tipo === 'basico') {
           cantidad *= 1.30;
       } else {
           cantidad *= 1.50;
       }
    
       return cantidad;
    }
}


// Todo lo que mostraremos después de pedir los datos
class Interfaz {

    mostrarMensaje(mensaje, tipo) {
        const div = document.createElement('div');
    
        if (tipo === 'error') {
            div.classList.add('mensaje', 'error');
        } else {
            div.classList.add('mensaje', 'correcto');
        }
    
        div.innerHTML = `${mensaje}`;
    
        // insertBefore recibe 2 parámetros, el primero lo que quieres insertar y el segundo el elemento que quieres ponerlo antes
        formulario.insertBefore(div, document.querySelector('.form-group'));
    
        setTimeout(() => {
            document.querySelector('.mensaje').remove();
        }, 3000);
    }

    MostrarResultado (seguro,total) { 
        const resultado = document.getElementById('resultado');
        let marca;
        switch (seguro.marca) {
            case '1':
                marca = 'Americano';
                break;
            case '2':
                marca = 'Asiatico';
                break;
            case '3':
                marca = 'Europeo';
                break;
            default:
                break;
        }
        
        // Crear div
        const div = document.createElement('div');
        div.innerHTML = `
        
            <p class='header'>Tu resumen:</p> 
            <p>Marca: ${marca}</p>
            <p>Año: ${seguro.anio}</p>
            <p>Tipo: ${seguro.tipo}</p>
            <p>Total: ${total}</p>
        `;
    
        const spinner = document.querySelector('#cargando img');
        spinner.style.display = 'block';
        setTimeout(() => {
            spinner.style.display = 'none';
            resultado.appendChild(div);
        }, 3000);
    }
}

// Eventos
const formulario = document.getElementById('cotizar-seguro');

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    // Leer la marca seleccionada del select
    const marca = document.getElementById('marca');
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;

    // Leer el año seleccionado
    const anio = document.getElementById('anio');
    const yearSelect = anio.options[anio.selectedIndex].value;

    // Leer el valor de los radios button
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    
    // Intanciamos interfaz
    const interfaz = new Interfaz();

    if (marcaSeleccionada === '' || yearSelect === '' || tipo === '') {
        // Error mostrado por la interfaz
        interfaz.mostrarMensaje('Faltan datos, revise el formulario y pruebe de nuevo','error');
    } else {
        // Limpiar resultados anteriores
        const resultados = document.querySelector('#resultado div');
        if (resultados !== null) {
            resultados.remove();
        }
        // instanciar seguro y mostrar interfaz
        const seguro = new Seguro(marcaSeleccionada, yearSelect, tipo);

        // Cotizar seguro
        const cantidad = seguro.cotizarSeguro(); 

        // Mostrar seguro
        interfaz.MostrarResultado(seguro, cantidad);
        interfaz.mostrarMensaje('Cotizando...','exito');


    }
});


const max = new Date().getFullYear(),
      min = max - 20;

const selectYear = document.getElementById('anio'); 
for (let i = max; i > min; i--) {
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selectYear.appendChild(option);
}
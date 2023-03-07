const bar = document.getElementById('bar');
const line = document.getElementById('line');
const pie = document.getElementById('pie');
const doughnut = document.getElementById('doughnut');

const url = "https://ocampo-dev.wicode.com.mx/api/v1/apoyos"

document.addEventListener('DOMContentLoaded', () => {

    obtenerApoyos();

})

const obtenerApoyos = async () => {

    const response = await fetch(url); 
    const json = await response.json();

    const { data } = json; // destrutoring { code, message, data, status }

    // creando etiquetas
    const dependencias = []; // ["ciudania", "gobaranza"]
    /*
    data: {
        apoyos: [1,2,3,4]
    }
    */
    data.apoyos.forEach(element => { // ciudadania
        const isDependencia = dependencias.find(x => x === element.tipo_Dependencia);
        // isDependencia = "ciudadania" true , undefined false
        if (!isDependencia) {
            dependencias.push(element.tipo_Dependencia);
        }
    });

    console.log(dependencias);

    // datasets
    const values = [];
    dependencias.forEach(element => {// ciudadania
        const value = data.apoyos.filter(x => x.tipo_Dependencia === element).length; // array
        values.push(value)
    })

    console.log(values)

    new Chart(bar, {
        type: 'bar',
        data: {
            labels: dependencias, // ["ciudania", "gobaranza"]
            datasets: [{
                label: 'Apoyos por dependencia',
                data: values, // [1,2]
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ]
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    })

}
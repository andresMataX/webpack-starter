// Para poder exportar para su uso esta función en otros archivos, hay que agregar: export
// Así limitamos a que las cosas no exportadas, permanezcan únicamente en este archivo

// importamos un archivo CSS
import '../css/componentes.css';
// importamos imágenes
// forma 1: import '../assets/img/webpack-logo.png';
// forma 2:
import webpacklogo from '../assets/img/webpack-logo.png';

export const saludar = (nombre) => {
    console.log('Creando etiqueta h1');
    // Creamos un elemento H1 de HTML
    const h1 = document.createElement('h1');
    // Realizamos la interpolación de nombre para poder usar código JS en cadenas de texto
    h1.innerHTML = `Hola, ${nombre}`;
    document.body.append(h1);

    // img
    // const img = document.createElement('img');
    // img.src = webpacklogo;
    // document.body.append(img);
}
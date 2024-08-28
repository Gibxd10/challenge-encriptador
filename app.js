//declaramos constantes
document.addEventListener('DOMContentLoaded', function() {
    const botonEncriptar = document.querySelector('.encriptar');
    const botonDesencriptar = document.querySelector('.desencriptar');
    const textoEntrada = document.getElementById('input-text');
    const mensajeEncriptadoDiv = document.getElementById('mensaje-encriptado');
    const botonCopiar = document.getElementById('copy-button');
    const imagenRobot = document.querySelector('.imagen');

//metodo de encriptacion y desencriptacion
    const llavesEncriptacion = {
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat'
    };

    const llavesDesencriptacion = {
        'enter': 'e',
        'imes': 'i',
        'ai': 'a',
        'ober': 'o',
        'ufat': 'u'
    };

//funcion para encriptar
    function encriptarTexto(texto) {
        return texto.replace(/[eioua]/g, function(match) {
            return llavesEncriptacion[match];
        });
    }

//funcion para desencriptar
    function desencriptarTexto(texto) {
        return texto.replace(/enter|imes|ai|ober|ufat/g, function(match) {
            return llavesDesencriptacion[match];
        });
    }

    function mostrarMensaje(mensaje) {
        mensajeEncriptadoDiv.innerHTML = `<p>${mensaje}</p>`;
        botonCopiar.style.display = 'block';
        imagenRobot.classList.add('oculto');
    }

    function mostrarMensajeDefault() {
        mensajeEncriptadoDiv.innerHTML = `<h2>Ningún mensaje fue encontrado</h2>
                                          <p>Ingresa el texto que desees encriptar o desencriptar.</p>`;
        botonCopiar.style.display = 'none';
        imagenRobot.classList.remove('oculto');
    }

//validamos que solo se usen minusculas sin acentos y permitimos el espacio
    function validarEntrada(texto) {
        console.log("Validando entrada:", texto);
        var regex = /^[a-z\s]+$/;
        return regex.test(texto);
    }

//funcion botones
    botonEncriptar.addEventListener('click', function() {
        let entrada = textoEntrada.value.trim();
        console.log("Entrada para encriptar:", entrada);
        if (entrada && validarEntrada(entrada)) {
            let textoEncriptado = encriptarTexto(entrada);
            mostrarMensaje(textoEncriptado);
        } else {
            alert("El texto solo debe contener letras minúsculas sin acentos.");
            mostrarMensajeDefault();
        }
    });

    botonDesencriptar.addEventListener('click', function() {
        let entrada = textoEntrada.value.trim();
        console.log("Entrada para desencriptar:", entrada);
        if (entrada && validarEntrada(entrada)) {
            let textoDesencriptado = desencriptarTexto(entrada);
            mostrarMensaje(textoDesencriptado);
        } else {
            alert("El texto solo debe contener letras minúsculas sin acentos.");
            mostrarMensajeDefault();
        }
    });

//copiar   
    botonCopiar.addEventListener('click', function() {
        let textoEncriptado = mensajeEncriptadoDiv.innerText;
        navigator.clipboard.writeText(textoEncriptado).then(function() {
            alert('Texto copiado al portapapeles');
            textoEntrada.value = '';
            mostrarMensajeDefault();
        }).catch(function(err) {
            console.error('Error al copiar el texto: ', err);
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("contacto").addEventListener('submit', validarFormulario);
});


function validarFormulario(evento) {
    evento.preventDefault();
    let nombre = document.getElementById('nombre').value;
    if (nombre === "") {
        swal("Ups!", "No has ingresado un nombre", "error");
        return;
    }

    let email = document.getElementById('email').value;
    if (email === "" ) {
        swal("Ups!", "No has ingresado un Email", "error");
        return;
    }


    let asunto = document.getElementById('asunto').value;
    if (asunto === "") {
        swal("Ups!", "No has ingresado un Asunto", "error");
        return;
    }

    let mensaje = document.getElementById('mensaje').value;
    if (mensaje === "") {
        swal("Ups!", "No has ingresado un Mensaje", "error");
        return;
    }
    this.submit();
}

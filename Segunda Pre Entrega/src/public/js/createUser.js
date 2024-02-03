// Obtener el formulario y el elemento de respuesta
const form = document.getElementById('createUserForm');
const response = document.getElementById('response');

// Manejar el evento de envío del formulario
form.addEventListener('submit', event => {
    // Evitar el comportamiento predeterminado del formulario
    event.preventDefault();

    // Obtener los datos del formulario
    const data = new FormData(form);

    // Convertir los datos del formulario a un objeto
    const obj = {};
    data.forEach((value, key) => (obj[key] = value));

    // Configurar y enviar la solicitud Fetch
    fetch('/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
    })
    .then(response => {
        // Verificar si la respuesta del servidor es exitosa
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        // Manejar la respuesta exitosa del servidor
        response.innerHTML = data.message;
    })
    .catch(err => {
        // Manejar errores de la solicitud
        console.error(err);
    });
});

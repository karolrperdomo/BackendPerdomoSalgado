const socket = io();
const chatBox = document.getElementById('chatBox');
const chatURL = '/api/chats';
let user;

// Función para solicitar el nombre de usuario
function requestUsername() {
    return Swal.fire({
        title: "Identificate : ",
        input: "text",
        text: " Ingrese su nombre en el chat",
        inputValidator: (value) => {
            return !value && 'Nombre de usuario';
        },
        allowOutsideClick: false
    }).then(result => {
        user = result.value;
        socket.emit('authenticated', user);
    });
}

// Evento cuando se presiona Enter en el cuadro de chat
chatBox.addEventListener('keyup', handleChatBoxKeyUp);

// Función para manejar el evento cuando se presiona Enter en el cuadro de chat
function handleChatBoxKeyUp(evt) {
    if (evt.key === "Enter") {
        const message = chatBox.value.trim();
        if (message.length > 0) {
            const fyh = new Date().toLocaleString();
            socket.emit("message", { user: user, message: message, fyh: fyh });
            sendChatMessage({ user: user, message: message, fyh: fyh });
            chatBox.value = "";
        }
    }
}

// Función para enviar el mensaje del chat al servidor
function sendChatMessage(data) {
    fetch(chatURL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
      .then(data => console.log('dataFetch', data));
}

// Evento cuando un nuevo usuario se conecta al chat
socket.on('newUserConnected', handleNewUserConnected);

// Función para manejar el evento cuando un nuevo usuario se conecta al chat
function handleNewUserConnected(data) {
    if (!user) return;
    Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        title: `${data} se ha unido al chat`,
        icon: "success"
    });
}

// Evento cuando se recibe un nuevo mensaje
socket.on('newMessage', handleNewMessage);

// Función para manejar el evento cuando se recibe un nuevo mensaje
function handleNewMessage(data) {
    const messageLog = document.getElementById('messageLogs');
    const newMessage = `${data.user} ${data.fyh} dice: ${data.message}<br/>`;

    // Agregar el nuevo mensaje al log de mensajes
    messageLog.innerHTML += newMessage;
}

// Solicitar el nombre de usuario al cargar la página
requestUsername();

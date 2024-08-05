// PASO 1: Paso 1: Registrar el Service Worker

if ('serviceWorker' in navigator && 'Notification' in window) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(function(registration) {
            console.log('Service Worker registrado con éxito:', registration);
        })
        .catch(function(error) {
            console.log('Error al registrar el Service Worker:', error);
        });
}


// PASO 3: Añade el siguiente código en tu archivo principal de JavaScript para solicitar permisos de notificación

if (Notification.permission === 'default') {
    Notification.requestPermission().then(function(permission) {
        if (permission === 'granted') {
            console.log('Permiso de notificación concedido.');
        } else {
            console.log('Permiso de notificación denegado.');
        }
    });
}
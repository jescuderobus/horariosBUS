// PASO 2: Paso 2: Crear el Service Worker


self.addEventListener('push', function(event) {
    const options = {
        body: event.data ? event.data.text() : '¡Alerta! La última ocupación reportada fue hace más de una hora.',
        icon: '../images/sand-clock-svgrepo-com.png', // Cambia esto a la ruta de tu icono
        badge: '../images/sand-clock-svgrepo-com.png' // Cambia esto a la ruta de tu badge
    };

    event.waitUntil(
        self.registration.showNotification('Notificación de Alerta', options)
    );
});
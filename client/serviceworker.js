console.log('Service Worker Loaded');
self.addEventListener('push', e => {
    const data = e.data.json();
    console.log('Push notification has been received!');
    self.registration.showNotification(data.title,{
        body: 'Notification Received',
    });
});
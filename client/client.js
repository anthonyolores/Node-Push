const publicKey = 'BJq1o9fZXpsyZkEDS54m0-UTYEp0Ab4leKHfo0LmODAAitL_YBIaxLykQypltOmEc6OxJIvQwv3VNdy98yjyr6M';

//is service worker available to the browser
if('serviceWorker' in navigator){
    send().catch(err => console.log(err));
}

//register service worker
//register push
//register send push
async function send(){
    console.log('Registering service worker...');
    const register = await navigator.serviceWorker.register('/serviceworker.js', {
        scope: '/'
    });
    console.log('Service worker registered!');

    //register push
    console.log('Rgistering push...');
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey)
    });
    console.log('Push registered!');

    //send push notification
    console.log('Sending push notification...');
    await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    });
    console.log('Push notification sent!');
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
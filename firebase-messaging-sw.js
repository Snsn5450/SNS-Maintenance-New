importScripts(
  "https://www.gstatic.com/firebasejs/12.16.0/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/12.16.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyDJVPZFRkzWKJ58cyIfaiuPqdvY4cYYzvE",
  authDomain: "sns-maintenance-pwa.firebaseapp.com",
  projectId: "sns-maintenance-pwa",
  storageBucket: "sns-maintenance-pwa.firebasestorage.app",
  messagingSenderId: "683218813920",
  appId: "1:683218813920:web:a091496adb477c47502185"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {

  console.log("Background Push:", payload);

  const title =
    payload.notification?.title ||
    "🚨 NEW MAINTENANCE COMPLAINT";

  const options = {
    body:
      payload.notification?.body ||
      "नई complaint आई है। App खोलकर देखें।",

    icon: "./icon-192.png",
    badge: "./icon-192.png",

    vibrate: [500, 200, 500, 200, 500],

    requireInteraction: true,

    data: {
      url: "./"
    }
  };

  self.registration.showNotification(title, options);
});


self.addEventListener("notificationclick", (event) => {

  event.notification.close();

  event.waitUntil(

    clients.matchAll({
      type: "window",
      includeUncontrolled: true
    }).then((clientList) => {

      for (const client of clientList) {

        if ("focus" in client) {
          return client.focus();
        }
      }

      return clients.openWindow("./");
    })
  );
});

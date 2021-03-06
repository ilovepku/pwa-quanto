importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
);

// listen for interaction with push notification
self.addEventListener(
  "notificationclick",
  e => {
    const channel = new BroadcastChannel("service-worker-channel");
    if (e.action === "new") channel.postMessage("new");
    if (e.action === "pause") channel.postMessage("pause");
    channel.close();
  },
  false
);

self.addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

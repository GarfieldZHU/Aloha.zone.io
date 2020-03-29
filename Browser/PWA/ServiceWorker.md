# Service Worker 

[TOC]


### Introduction

###### Have a try

Here are sample page: [Google devleloper doc](https://developers.google.com/web/ilt/pwa/introduction-to-service-worker), [Pokemon index](https://pokedex.org/). Try them with below steps:

1. Open them in browser, then close the page.
2. Disconnect your network connection.
3. Reopen your browser, access the above pages again. 
4. 😲 Amazing, they are still accessible.
5. Compare to google.com under connectionless, we should see the "dinosaur" instead.


###### History

In [HTML standard](https://html.spec.whatwg.org/multipage/offline.html#offline), we have had a `manifest` attribute and corresponding `.appcache` manifest file for caching the resources of a web page for an offline web application.

It is still valid, but not recommended anymore. 


### Overview

###### Concept

A service worker is an event-driven [web worker](https://developer.mozilla.org/en-US/docs/Web/API/Worker) registered against an origin and a path. It takes the form of a JavaScript file that can control the web-page/site that it is associated with, intercepting and modifying navigation and resource requests, and caching resources in a very granular fashion to give you complete control over how your app behaves in certain situations (the most obvious one being when the network is not available).

Service workers enable applications to control network requests, cache those requests to improve performance, and provide offline access to cached content.

Service workers depend on two APIs to make an app work offline: [***Fetch***](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) (a standard way to retrieve content from the network) and [***Cache***](https://developer.mozilla.org/en-US/docs/Web/API/Cache) (a persistent content storage for application data). This cache is persistent and independent from the browser cache or network status.

In a word, it just likes **"a network proxy for http requests"**  +  **"caches for resources and responses"**.


###### Goal

- The key of [PWA (Progressive Web Application)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Introduction)
- Provide better performance of page
- Provide extraordinary offline experience, or poor network connection environment


###### Prerequisites

- [x] Browser supporting

  - Test your current browser [support Service Worker](https://jakearchibald.github.io/isserviceworkerready/) or not.
  - CEF supports

- [ ] HTTPS must

  Using service worker you can hijack connections, fabricate, and filter responses. 
  It's powerful, which grants you the power do good or do evil. To avoid a man-in-the-middle threats the security. Service Worker is designed to ***serves the pages over HTTPS only***.

   


### Life Cycle

The major life cycle graph:

<img src="https://developers.google.com/web/fundamentals/primers/service-workers/images/sw-lifecycle.png" alt="service worker lifecycle" style="zoom:70%;" />



Life cycle details:

<img src="https://mdn.mozillademos.org/files/12636/sw-lifecycle.png" alt="img" style="zoom:80%;" />



##### - Registration -

To install a service worker, you need to register it in your main JavaScript code. Registration tells the browser where your service worker is located, and to start installing it in the background. 

This step is not part of major life cycle of Service Worker, and it should be done in the main script. 

```javascript
if ('serviceWorker' in navigator) {
 navigator.serviceWorker.register('/sw.js').then(function(registration) {
   // Registration was successful
   console.log(':) Success. ', registration.scope);
 }, function(err) {
   // registration failed :(
   console.log(':( Failed. ', err);
 });
}
```

The ***scope*** of the service worker determines which files the service worker controls, in other words, from which path the service worker will intercept requests. The default scope is the location of the service worker file, and extends to all directories below. 

```javascript
navigator.serviceWorker.register('/service-worker.js', {
  scope: '/app/'
});
```



##### - Life Events -

The major state changes in life cycle are notified by events:

<img src="https://mdn.mozillademos.org/files/12632/sw-events.png" alt="install, activate, message, fetch, sync, push" style="zoom:80%;" />

###### Download

Download begins when we call register. It needs to:
  1)  download the script
  2)  parse the script as service worker
  3)  install the service worker to browser

  It may not able to be downloaded, parsed, or it may throw an error when initialization. Any failures can been see in the DevTools -> Application tab.



###### Installation

The installation is an event which is first triggered in service worker. 
In the install event handler, we can assign a cache name (for identifying), and a list of resources to be cached.

```javascript
const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [  // The list of resources to cache
  '/',
  '/styles/main.css',
  '/script/main.js'
];

self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});
```



###### Activate

Once your service worker is ready to control clients and handle functional events like push and sync, you'll get an activate event. But that doesn't mean the page that called .register() will be controlled.

```javascript
self.addEventListener('activate', event => {
  console.log('V1 now ready to handle fetches!');
});
```

Take a look at this [demo](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/), the service worker hijacked "fetch" only takes effect after it is activated:

1. When initial load the demo page, you are expected to see a dog picture for the HTML page refers to a dog image. And the image request has already finshed before Service Worker is registered.

2. Refreshing the page, then you should see the cat picture instead. Because the activated Service Worker takes over the your http request, to replace the image resources in the response.

   ```javascript
   // Caching the cat image when installing
   self.addEventListener('install', event => {
     console.log('V2 installing…');
   
     // cache a horse SVG into a new cache, static-v2
     event.waitUntil(
       caches.open('static-v2').then(cache => cache.add('/cat.svg'))
     );
   });
   
   // Response the cat image when requesting dog.
   self.addEventListener('fetch', event => {
     const url = new URL(event.request.url);	 
     // serve the cat SVG from the cache if the request is
     // same-origin and the path is '/dog.svg'
     if (url.origin == location.origin && url.pathname.endsWith('/dog.svg')) {
       event.respondWith(caches.match('cat.svg'));
     }
   });
   ```

3. In DevTools -> Application -> Service Worker tab, we can unregister the service worker for this site. 
   Then refreshing the page, we will see the dog again, in this new process for registering the worker.



### APIs

There are many Service Worker related APIs to make a Web App more strong.

#### Cache & Fetch API

When browser or the web page trigger the event for Service Worker, we may want to ***fetch*** and ***cache***  some content. This typically happens in `fetch` event of Service Worker, which is triggered when the registered page is requesting network. 

###### cache

| Object                                                       | API                          | Usage                                                        |
| ------------------------------------------------------------ | ---------------------------- | ------------------------------------------------------------ |
| [CacheStorage](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage) | caches.open                  | Open the cache object by an identifier                       |
| [Cache](https://developer.mozilla.org/en-US/docs/Web/API/Cache) | cache.match / cache.matchAll | Resolve the matching request in Cache                        |
| [Cache](https://developer.mozilla.org/en-US/docs/Web/API/Cache) | cache.add / cache.addAll     | Retrieves the resources, and adds the resulting response objects to the given cache. |
| [Cache](https://developer.mozilla.org/en-US/docs/Web/API/Cache) | cache.delete                 | Remove from the cache object                                 |
|                                                              |                              |                                                              |

- Sample to add the resources to cache:

```javascript
self.addEventListener('install', function(event) {
  // In install event, cache the resources first
  event.waitUntil(
    caches.open('my-cache-identifier')   // Open/create a cache with identifier
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll([    
          '/',
          '/styles/main.css',
          '/script/main.js'
        ]); // Cache the major HTML, CSS, JS file
      })
  );
});
```



###### fetch

[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) is typically used in [FetchEvent](https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent) for Service Worker. 

When the page is sending http request, the `fetch` event of Service Worker will be triggered and we are able to monitor the request content and provide response to the page.

Including: 

- Check if the request was cached ever. If so, respond with a cache response.
- Analysis the request contents, filter some requests, or modify even mock the requests.
- Use `fetch` API to send the original or modified/mocked request.
- Consume the request, filter response by status, type, or other headers, modify even mock the response.
- Cache the response.

Sample: 

```javascript
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});
```





#### Storage & Telecommunication

`Fetch`  is API over network and `cache` is for caching. But they are used for "proxying host page's network" and "caching the content of the host page ". 

If the Service Worker has its own necessity for telecommunication (with the host page, or with server over network)  and persist some states (page level, or browser level), use these APIs below.

###### IPC

Service Worker is generally like a Web Worker, it's a standalone thread away from rendering context, so it cannot manipulate DOM or `window` directly. It uses the same way: [postMessage](https://html.spec.whatwg.org/multipage/workers.html#dom-worker-postmessage) and `message` event to telecommunicate with host page's thread.

- Use channel in host thread to `postMessage` and listen to `message` event by [**MessageChannel**](https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel):

```javascript
function sendMessage(message) {
  // This wraps the message posting/response in a promise, which will resolve if the response doesn't
  // contain an error, and reject with the error if it does. If you'd prefer, it's possible to call
  // controller.postMessage() and set up the onmessage handler independently of a promise, but this is
  // a convenient wrapper.
  return new Promise(function(resolve, reject) {
    var messageChannel = new MessageChannel();
    messageChannel.port1.onmessage = function(event) {
      if (event.data.error) {
        reject(event.data.error);
      } else {
        resolve(event.data);
      }
    };

    // This sends the message data as well as transferring messageChannel.port2 to the service worker.
    // The service worker can then use the transferred port to reply via postMessage(), which
    // will in turn trigger the onmessage handler on messageChannel.port1.
    // See https://html.spec.whatwg.org/multipage/workers.html#dom-worker-postmessage
    navigator.serviceWorker.controller.postMessage(message,
      [messageChannel.port2]);
  });
}
```

- Use [`Client.postMessage` ](https://developer.mozilla.org/en-US/docs/Web/API/Client/postMessage) to send message, and listen to `message` event in Service Worker:

```javascript
// Consume the message from host thread (or other Workers)
addEventListener('message', (event) => {
    console.log(`The client sent me a message: ${event.data}`);
});

{
  // Send message to host thread (or other Workers)
  clients.matchAll(event.clientId).postMessage({
    msg: "Hey I just got a fetch from you!",
  });
}
```

[Demo](https://googlechrome.github.io/samples/service-worker/post-message/index.html) for posting message

###### Storage

Use Web storage APIs to persist necessary information of Service Worker:

![Image from Chrome Developer Tools](https://i.stack.imgur.com/ZRHTt.png)

1. Because the service worker is not blocking (it's designed to be fully asynchronous) synchronous XHR and `localStorage` cannot be used in a service worker. ([LocalStorage calls are always synchronous](https://stackoverflow.com/questions/20231163/is-html5-localstorage-asynchronous))
2. If there is information that you need to persist and reuse across restarts, you can use [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) databases.





#### More Web APP APIs

Service Woker provides the starting point for features that make web applications work like native apps:

| API                                                          | Functionalities                                              |
| ------------------------------------------------------------ | :----------------------------------------------------------- |
| [Channel Messaging](https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API) | Telecommnucation with other [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Worker) and host page |
| [Notifications API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API) | Display and interact with notifications using the OS's native notification system. |
| [Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API) | Enables your app to subscribe to a push service and receive push messages. |
| [Background Sync](https://developers.google.com/web/updates/2015/12/background-sync) | Lets you defer actions until the user has stable connectivity. |
|                                                              |                                                              |



### Use cases 

Serice Worker could be used as the core flow controller since it is able to control and cach any the requests/responses for any static resources or REST API calls. 

1. **Full static site**

   If the website contains static resources only, we can cache all the html page, css style, scripts and images. Then the site could be accessed offline totally.

2. **Prefetch**

   There may be some elements in page, which are not loaded when the page is first rendered but triggered by events in scripts. For such resources, we can prefetch them in Servie Worker.
   [Demo](https://googlechrome.github.io/samples/service-worker/prefetch/index.html) / [Demo prefetch video](https://googlechrome.github.io/samples/service-worker/prefetch-video/index.html)

3. **Fallback response**

   Sometimes when the request fails, we hope to show a fallback content to user. And it may be good to present the resource/data of last success request. (Example: Live data telemetry) 

   Service Worker helps to validate if the request succeeds and responds with cache if fails.
   [Demo](https://googlechrome.github.io/samples/service-worker/fallback-response/index.html)

4. **Mock response**

   Mocking is useful. It helps to isolate some specific requests from network with given response, or we can use it to test some API/resource is not ready or not able to access.

5. **Window cache**
   Service Worker just take the responsibility to cache the content from response, which can be a persisted data in `window.cache` for the page. 
   [Demo](https://googlechrome.github.io/samples/service-worker/window-caches/index.html)

6. ...




### Matters need attention

- Requests won't contain credentials such as cookies by default for fetch API.
  
  If credential is necessary, fetch the url with parameter:
  
  ```javascript
  fetch(url, {
    credentials: 'include'
  })
  ```
  
- Cross origin is not support for caching. 
  
  - If the target resources support CORS, use parameter `{mode: 'cors'}` 
  
  - If the target reousrces do not support CORS or unknown, we can use `non-cors` to overcome it. 
    
    But this will cause an 'opaque' response, which means you won't be able to tell if the response was successful or not.
    
    ```javascript
    cache.addAll(urlsToPrefetch.map(function(urlToPrefetch) {
      return new Request(urlToPrefetch, { mode: 'no-cors' });
    })).then(function() {
      console.log('All resources have been fetched and cached.');
    });
    ```
  
- HTTP status 30X redirect is not supported yet for offline fetch, as a [known issue](https://github.com/w3c/ServiceWorker/issues/1457).
  
  Suggest to find workaround per your use case, before there is a resolution for offline direction.
  
- When porxying the response, remember to [clone](https://fetch.spec.whatwg.org/#dom-response-clone) the response rather than consume the response directly. The reason is that response is a [Stream](https://streams.spec.whatwg.org/), the body can only be consumed once. Since we want to return the response for the browser to use, as well as pass it to the cache to use, we need to clone it so we can send one to the browser and one to the cache.

---

### References

- Live demos

  https://github.com/GoogleChrome/samples/tree/gh-pages/service-worker

- Introduction to Service Worker

  https://developers.google.com/web/fundamentals/primers/service-workers

- Service Worker API - MDN

  https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API

- Official spec

  https://w3c.github.io/ServiceWorker/

- Service Worker resources

  https://jakearchibald.github.io/isserviceworkerready/resources.html#moar


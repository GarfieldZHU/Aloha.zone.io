Service Worker 

Table of Contents Service Worker IntroductionHave a tryHistoryOverviewConceptGoalPrerequisitesLife Cycle- Registration -DownloadInstallationActivateFetch & CacheEvents and use casesMatters need attentionReferences



Introduction

Have a try

Here are sample page: Google devleloper doc, Pokemon index. Try them with below steps:

1. Open them in browser, then close the page.
2. Disconnect your network connection.
3. Reopen your browser, access the above pages again. 
4. 😲 Amazing, they are still accessible.
5. Compare to google.com under connectionless, we should see the "dinosaur" instead.

History

In HTML standard, we have had a manifest attribute and corresponding .appcache manifest file for caching the resources of a web page for an offline web application.

It is still valid, but not recommended anymore. 



Overview

Concept

A service worker is an event-driven web worker registered against an origin and a path. It takes the form of a JavaScript file that can control the web-page/site that it is associated with, intercepting and modifying navigation and resource requests, and caching resources in a very granular fashion to give you complete control over how your app behaves in certain situations (the most obvious one being when the network is not available).

Service workers enable applications to control network requests, cache those requests to improve performance, and provide offline access to cached content.

Service workers depend on two APIs to make an app work offline: Fetch (a standard way to retrieve content from the network) and Cache (a persistent content storage for application data). This cache is persistent and independent from the browser cache or network status.

In a word, it just likes "a network proxy for http requests"  +  "caches for resources and responses".

Goal

- The key of PWA (Progressive Web Application)
- Provide better performance of page
- Provide extraordinary offline experience, or poor network connection environment

Prerequisites

- Browser supporting
  - Test your current browser support Service Worker or not.
  - CEF supports
- HTTPS must
  Using service worker you can hijack connections, fabricate, and filter responses. 
It's powerful, which grants you the power do good or do evil. To avoid a man-in-the-middle threats the security. Service Worker is designed to serves the pages over HTTPS only.
   

Life Cycle



The major life cycle states:



The life cycle details:





- Registration -

To install a service worker, you need to register it in your main JavaScript code. Registration tells the browser where your service worker is located, and to start installing it in the background. 

This step is not part of major life cycle of Service Worker, and it should be done in the main script. 

    if ('serviceWorker' in navigator) {
     navigator.serviceWorker.register('/sw.js').then(function(registration) {
       // Registration was successful
       console.log(':) Success. ', registration.scope);
     }, function(err) {
       // registration failed :(
       console.log(':( Failed. ', err);
     });
    }

The scope of the service worker determines which files the service worker controls, in other words, from which path the service worker will intercept requests. The default scope is the location of the service worker file, and extends to all directories below. 

    navigator.serviceWorker.register('/service-worker.js', {
      scope: '/app/'
    });



Download

Download begins when we call register. It needs to:
  1)  download the script
  2)  parse the script as service worker
  3)  install the service worker to browser

  It may not able to be downloaded, parsed, or it may throw an error when initialization. Any failures can been see in the DevTools -> Application tab.







Installation

The installation is an event which is first triggered in service worker. 
In the install event handler, we can assign a cache name (for identifying), and a list of resources to be cached.

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



Activate

Once your service worker is ready to control clients and handle functional events like push and sync, you'll get an activate event. But that doesn't mean the page that called .register() will be controlled.

    self.addEventListener('activate', event => {
      console.log('V1 now ready to handle fetches!');
    });



Take a look at this demo, the service worker hijacked "fetch" only takes effect after it is activated:

1. When initial load the demo page, you are expected to see a dog picture for the HTML page refers to a dog image. And the image request has already finshed before Service Worker is registered.
2. Refreshing the page, then you should see the cat picture instead. Because the activated Service Worker takes over the your http request, to replace the image resources in the response.
       self.addEventListener('fetch', event => {
         const url = new URL(event.request.url);
       
         // serve the cat SVG from the cache if the request is
         // same-origin and the path is '/dog.svg'
         if (url.origin == location.origin && url.pathname.endsWith('/dog.svg')) {
           event.respondWith(caches.match('cat.svg'));
         }
       });
3. In DevTools -> Application -> Service Worker tab, we can unregister the service worker for this site. 
   Then refreshing the page, we will see the dog again, in this new process for registering the worker.
   



Fetch & Cache







Events and use cases







Matters need attention

- Credential not included by default for fetch API.
  If credential is necessary, fetch the url with parameter:
      fetch(url, {
        credentials: 'include'
      })
- Cross origin is not support for caching. 
  - If the target resources support CORS, use parameter {mode: 'cors'} 
  - If the target reousrces do not support CORS or unknown, we can use non-cors to overcome it. 
    But this will cause an 'opaque' response, which means you won't be able to tell if the response was successful or not.
        cache.addAll(urlsToPrefetch.map(function(urlToPrefetch) {
          return new Request(urlToPrefetch, { mode: 'no-cors' });
        })).then(function() {
          console.log('All resources have been fetched and cached.');
        });
- HTTP status 30X redirect is not supported yet for offline fetch, as a known issue.
  Suggest to find workaround per your use case, before there is a resolution for offline direction.

---

References

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



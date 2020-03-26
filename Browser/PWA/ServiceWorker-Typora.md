# Service Worker 

[TOC]



### Overview

###### Concept

A service worker is an event-driven [web worker](https://developer.mozilla.org/en-US/docs/Web/API/Worker) registered against an origin and a path. It takes the form of a JavaScript file that can control the web-page/site that it is associated with, intercepting and modifying navigation and resource requests, and caching resources in a very granular fashion to give you complete control over how your app behaves in certain situations (the most obvious one being when the network is not available).

In a work, it just likes a net work proxy process in the browser for specific origins. 


###### Use case

- Key of PWA (Progressive Web Application)
- Provide better performance of page
- Provide extraordinary offlne experience 



###### Prerequisites

- [x] Browser supporting

  - Test your current browser [support Service Worker](https://jakearchibald.github.io/isserviceworkerready/) or not.
  - CEF supports

- [ ] HTTPS must

  Using service worker you can hijack connections, fabricate, and filter responses. 
  It's powerful, which grants you the power do good or do evil. To avoid a man-in-the-middle threats the security. Service Worker is designed to ***serves the pages over HTTPS only***.



###### Usage steps

1. Register the service worker script in the main script: 

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

2. Write the service worker script, obeying the rule of life 
   



### Life Cycle



The main life cycle graph:

![service worker lifecycle](https://developers.google.com/web/fundamentals/primers/service-workers/images/sw-lifecycle.png)

###### Install 

##### 

###### Activate











### Common cases









### References

- Live demos

  https://github.com/GoogleChrome/samples/tree/gh-pages/service-worker

- Introduction to Service Worker

  https://developers.google.com/web/fundamentals/primers/service-workers

- Service Worker API - MDN

  https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API

- Official spec

  https://w3c.github.io/ServiceWorker/

- Service Worker resource

  https://jakearchibald.github.io/isserviceworkerready/resources.html#moar


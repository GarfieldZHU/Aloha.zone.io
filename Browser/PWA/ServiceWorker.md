# Service Worker 

[TOC]


### Introduction

###### Begin

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



The main life cycle graph:

![service worker lifecycle](https://developers.google.com/web/fundamentals/primers/service-workers/images/sw-lifecycle.png)

###### Registration

To install a service worker, you need to register it in your main JavaScript code. Registration tells the browser where your service worker is located, and to start installing it in the background. 


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

###### Installation



###### Activate








### Use cases








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


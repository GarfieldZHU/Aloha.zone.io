Service Worker 指北

Author: @Zhu, Jiahui

---



Table of Contents Service Worker 指北序尝尝鲜追史溯源概览基本概念Service Worker存在的目的先决条件Life Cycle- Registration -- Life Events -DownloadInstallationActivateAPIsCache & Fetch APIcachefetchStorage & TelecommunicationIPCStorageMore Web APP APIsUse cases Matters need attentionReferences





序

尝尝鲜

这里有一些实例网页: Google开发者文档, 宝可梦图鉴。按下面的步骤来把玩一下吧：

1. 打开你的浏览器（拒绝IE和多年未更新的古董！），访问这些网页，确认网页加载完成后关闭它们。
2. 断开你的网络连接（拔网线）。
3. 重新在浏览器里打开这些页面。
4. 😲 震惊！！我们仍然可以正常的访问并浏览页面的内容。
5. 打开其他网站如google.com再试试，果不其然我们看到了熟悉的小恐龙。
   

追史溯源

在WHATWG的 HTML 标准中提到关于离线应用，html 标签有一个manifest 属性，并且有相应的.appcache 格式文件用于为离线应用缓存资源。

这仍然是一个可用的浏览器特性，但不在被推荐了。因为有了Service Worker。



概览

基本概念

Service Worker是一种事件驱动的特殊的web worker，注册于指定的源和路径。它使用一个特定格式的JavaScript文件用于与它的网页关联，监听或拦截来自这个页面的访问和资源请求甚至可以修改它们。同时它可以缓存页面的资源来使得网页在一些特殊的情况下仍然可以按预期的行为运作（最常见的就是网络不可用的状况了）。

换而言之，Service Worker使得启用它的应用能够控制网络请求，缓存请求内容来优化性能，并且拥有离线访问已缓存的内容的能力，就像一个本地应用一样工作。

Service Worker 以来于两个核心API来使得网页应用离线工作: Fetch (从网络获取资源的标准方式) and Cache (为应用数据提供持久’化的存储)。注意这里的cache是应用缓存 (参见DevTools -> Application -> Cache)，需要区分于浏览器层面的缓存。‘

总之，它就像是一个“HTTP请求的本地网络代理”+“响应和资源的缓存管理器”。



Service Worker存在的目的

- 作为PWA (Progressive Web Application, 渐进式网络应用)的核心。
- 提供更好的网页性能。
- 提供优秀的离线和弱网环境的使用体验。
  (为网络基础设施落后地区的人民提供可用的网络体验也是重要的政治正确)

先决条件

- 浏览器支持
  - 使用最新的Chrome, Firefox, Edge, Safari等。
  - 在这里测试你的浏览器是否支持。

- 必须使用HTTPS

         基于Service Worker的核心能力，能够劫持网络连接，伪造和过滤响应结果，它在网络层面过于强大也赋予了使用者做坏事的能力。为了防止中间人威胁到启用了Service Worker的页面的安全，它被设计成只能使用与HTTPS。



 

Life Cycle

The major life cycle graph:





Life cycle details:





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



- Life Events -

The major state changes in life cycle are notified by events:



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
3. In DevTools -> Application -> Service Worker tab, we can unregister the service worker for this site. 
Then refreshing the page, we will see the dog again, in this new process for registering the worker.



APIs

There are many Service Worker related APIs to make a Web App more strong.

Cache & Fetch API

When browser or the web page trigger the event for Service Worker, we may want to fetch and cache  some content. This typically happens in fetch event of Service Worker, which is triggered when the registered page is requesting network. 

cache

  Object      	API                         	Usage                                   
  CacheStorage	caches.open                 	Open the cache object by an identifier  
  Cache       	cache.match / cache.matchAll	Resolve the matching request in Cache   
  Cache       	cache.add / cache.addAll    	Retrieves the resources, and adds the resulting response objects to the given cache.
  Cache       	cache.delete                	Remove from the cache object            
              	                            	                                        

- Sample to add the resources to cache:

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



fetch

Fetch API is typically used in FetchEvent for Service Worker. 

When the page is sending http request, the fetch event of Service Worker will be triggered and we are able to monitor the request content and provide response to the page.

Including: 

- Check if the request was cached ever. If so, respond with a cache response.
- Analysis the request contents, filter some requests, or modify even mock the requests.
- Use fetch API to send the original or modified/mocked request.
- Consume the request, filter response by status, type, or other headers, modify even mock the response.
- Cache the response.

Sample: 

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





Storage & Telecommunication

Fetch  is API over network and cache is for caching. But they are used for "proxying host page's network" and "caching the content of the host page ". 

If the Service Worker has its own necessity for telecommunication (with the host page, or with server over network)  and persist some states (page level, or browser level), use these APIs below.

IPC

Service Worker is generally like a Web Worker, it's a standalone thread away from rendering context, so it cannot manipulate DOM or window directly. It uses the same way: postMessage and message event to telecommunicate with host page's thread.

- Use channel in host thread to postMessage and listen to message event by MessageChannel:

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

- Use Client.postMessage  to send message, and listen to message event in Service Worker:

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

Demo for posting message

Storage

Use Web storage APIs to persist necessary information of Service Worker:



1. Because the service worker is not blocking (it's designed to be fully asynchronous) synchronous XHR and localStorage cannot be used in a service worker. (LocalStorage calls are always synchronous)
2. If there is information that you need to persist and reuse across restarts, you can use IndexedDB databases.





More Web APP APIs

Service Woker provides the starting point for features that make web applications work like native apps:

  API              	Functionalities                         
  Channel Messaging	Telecommnucation with other Web Workers and host page
  Notifications API	Display and interact with notifications using the OS's native notification system.
  Push API         	Enables your app to subscribe to a push service and receive push messages.
  Background Sync  	Lets you defer actions until the user has stable connectivity.
                   	                                        



Use cases 

Serice Worker could be used as the core flow controller since it is able to control and cach any the requests/responses for any static resources or REST API calls. 

1. Full static site
   If the website contains static resources only, we can cache all the html page, css style, scripts and images. Then the site could be accessed offline totally.
2. Prefetch
   There may be some elements in page, which are not loaded when the page is first rendered but triggered by events in scripts. For such resources, we can prefetch them in Servie Worker.
Demo / Demo prefetch video
3. Fallback response
   Sometimes when the request fails, we hope to show a fallback content to user. And it may be good to present the resource/data of last success request. (Example: Live data telemetry) 
   Service Worker helps to validate if the request succeeds and responds with cache if fails.
Demo
4. Mock response
   Mocking is useful. It helps to isolate some specific requests from network with given response, or we can use it to test some API/resource is not ready or not able to access.
5. Window cache
Service Worker just take the responsibility to cache the content from response, which can be a persisted data in window.cache for the page. 
Demo
6. ...



Matters need attention

- Requests won't contain credentials such as cookies by default for fetch API.
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
- When porxying the response, remember to clone the response rather than consume the response directly. The reason is that response is a Stream, the body can only be consumed once. Since we want to return the response for the browser to use, as well as pass it to the cache to use, we need to clone it so we can send one to the browser and one to the cache.

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



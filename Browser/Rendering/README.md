# Rendering stuffs in browser

[TOC]

Understand the rendering knowledge will help you to optimize the web page rendering, including DOM and WebGL.



#### DOM rendering

Typically, a common browser is working on 60 fps for rendering, which means calculation of a single frame should be finished in about 16.67 ms. Per [Webkit's rendering interval control](https://bugs.chromium.org/p/chromium/issues/detail?id=337617), multiple DOM changes during a 16.67 ms interval, will be merged into **one frame**. 

In single frame, the browser should working on running script, apply style, calculate layout, paint and composite layers: 

`JS->Style->Layout->Paint->Composite`

Thus, the ideal way to have a smooth page exerience is that -- keep the calculation stage less than 16ms if possible to confirm each frame is correctly rendered. However, the reality is cruel since we always suffer some cases could not satisfy the browser, like *heavy calculation*, *high frequency events*, etc, which is what we want to optimize about.



##### Debounce & Throttle

There are several events which will be triggered in a high frequency, like `resize`, `touchmove`,`scroll`.`dragover`. If we bind a "heavy"  handler function to such events, and the "heavy" handler manipulates the DOM, then the freshing rate will not be able to match the event frequency, which may cause a rendering delay, choppy, and even hanging. 

**Debounce** and **throttle** are two similar (but different!) techniques to control how many times we allow a function to be executed over time. They will help us to deal with high frequency event in a better way.

Both debounce and throttle techniques allow us to **“group” multiple sequential calls in a single one**.

###### debounce

Given a timer X, the event handler will be executed only when timeout. If the event is triggered again during the timer, reset the timer X. It means all event will be group into one when no more events come in.

- Use case:

  - Validate the content for inputbox (locally or sent request for validation).
    Example:

    ```typescript
    // -- InputValidator.tsx
    
    const changeHandler = async (e: Event) => {
      const resp = await fetch()
      if (!resp.ack) {
        // show warning
      }
    }
    
    // Old React component without debouncing
    const InputValidator = () => {
      return <Input 
      	onChange={changeHandler}
       	//...
      />
    }
    
    // New React component 
    const DebouncedInput = () => {
      return <Input
      	onChange={_.debounce(changeHandler)}
    		//...
      >
    }
    ```

    

- Example of `debounce` function:

```typescript
function debounce(fn: Function, interval: number = 300) {
    let timeout = null
    return function () {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            fn.apply(this, arguments)
        }, interval)
    };
}
```



###### throttle

Given a timer X, the task will be executed once and only once when timeout. 

It helps to reduce the frequency and stablize the uncertain frequency.

- Use case

  - Check if the window has scrolled to bottom and we need to fetch more elements to shown.
    Example:

    ```typescript
    // -- IncrList.tsx
    
    // Scroll event handler, send request to fetch next data volume if reach the bottom of page.
    const scrollHandler = async (e: Event) => {
      const pageHeight = body.height(),
            scrollTop = window.scrollTop(),
            winHeight = window.height(),
            thresold = pageHeight - scrollTop - winHeight
      if (thresold > -100 && thresold <= 20) {
        const nextPage = await fetch()
        // Show next page
      }
    }
    
    // Original list, it will check scroll bottom with high frequency
    const IncrList = () => {
      return <ScrollableList
      	onScroll={scrollHandler}
      />
    }
        
    // Original list, it will check scroll bottom per 500ms
    const ThrottledIncrList = () => {
      return <ScrollableList
      	onScroll={_.throttle(scrollHandler, 500)}
      />
    }
    ```

    

  - Check if the object is still dragged over a specific zone.

- Example of `throttle` function:

  ```typescript
  function throttle(fn: Function, interval: number = 300) {
      let canRun = true
      return function () {
          if (!canRun) return
          canRun = false
          setTimeout(() => {
              fn.apply(this, arguments)
              canRun = true
          }, interval)
      };
  }
  ```

  



#### Reference

- [Debouncing and Throttling Explained Through Examples](https://css-tricks.com/debouncing-throttling-explained-examples/)
- 
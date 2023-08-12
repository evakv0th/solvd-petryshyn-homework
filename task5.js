function throttle(func, duration) {
    if (typeof func !== 'function' || typeof duration !== 'number' || duration < 0) {
        throw new Error ('please provide function and positive number')
    }
  let shouldWait = false;

  return function (...args) {
    if (!shouldWait) {
      func.apply(this, args);
      shouldWait = true;

      setTimeout(function () {
        shouldWait = false;
      }, duration);
    }
  };
}


function onScroll(event) {
    console.log("Scroll event:", event);
  }
  
  const throttledScrollHandler = throttle(onScroll, 2000);
  
  window.addEventListener("scroll", throttledScrollHandler);


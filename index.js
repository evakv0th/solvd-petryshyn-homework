const fs = require("fs");

class AsyncOperationManager {
  simulateAsyncOperation(delay) {
    setTimeout(() => {
      console.log(`Async operation completed after ${delay} ms`)
      process.nextTick(() => {
        console.log('this message shows after the setTimeout')
      });
    }, delay);
  }

  simulateAsyncOperationWithImmediateAndNextTick(delay) {
    setTimeout(() => {
      this.scheduleNextTick();
      this.scheduleImmediate();
      console.log(`Async operation completed after ${delay} ms`);
    }, delay);
  }

  scheduleNextTick() {
    process.nextTick(() => {
      console.log("next tick task executed");
    });
  }
  scheduleImmediate() {
    setImmediate(() => {
      console.log("Immediate task executed");
      process.nextTick(() => {
        console.log('this message shows after the setImmediate')
      });
    });
  }

  bonusScenario() {
    console.log("Bonus: starts sync");

    setTimeout(() => {
      console.log("Bonus: Timer cb");
    }, 0);

    setTimeout(() => {
      console.log("Bonus: Timer cb 3 with microtask");
      process.nextTick(() => {
        console.log("Bonus: Microtask inside timer cb 3");
      });
    }, 0);

    setImmediate(() => {
      console.log("Bonus: Immediate cb at the end of bonus");
    });

    setTimeout(() => {
      console.log(`Bonus: Timer cb3`);
    }, 0);

    setTimeout(() => {
      console.log("Bonus: Simulating I/O operation");

      let start = Date.now();
      while (Date.now() - start < 1000) {}
      console.log("Bonus: I/O operation complete");
    }, 0);

    process.nextTick(() => {
      console.log("Bonus: Microtask at start");
    });

    console.log("Bonus: ends sync");
  }
}

const manager = new AsyncOperationManager();

manager.simulateAsyncOperation(200);
process.nextTick(() => {
  console.log("Microtask executed immediately");
});
manager.scheduleImmediate();

// event loop helps with async programming and is the reason why single threaded javascript is not "blocking" when making long requests etc..
manager.simulateAsyncOperation(2000);

// next tick is executing right after callback function, at the same phase

manager.simulateAsyncOperationWithImmediateAndNextTick(0);

// Operation with 0 delay still goes after sync operation, it's because it moved to event queue by event loop and then executes only if callstack is empty (which is after sync operations are executed)
// setImmediate is executing right after nextTick - that's because setImmediate is executing right on the start of next phase while nextTick is on the same phase as operation

console.log("sync operation logs first");

fs.readFile(__filename, () => {
  manager.simulateAsyncOperation(0);
  manager.scheduleNextTick();
  manager.scheduleImmediate();
});

// when we use fs.readFile (I\O cycle) async setTimeout operation always comes after nextTick and immediate,
// but in our method "simulateAsyncOperationWithImmediateAndNextTick" setTimeout comes first in most of the times (depends on the performance of the process)

manager.bonusScenario();

// we can see how event loop executes, after sync operations it's doing microtask, then starts first phase which is timers - its doing Timer cb
// then it goes to another timer since its registered after first setTimeout. This timer has microtask which is executed right before it goes to Timer cb 3
// After timer cb 3 we finally proceed to poll phase (skipping internal phases from libuv) with our Simulation I\O operation and only after that we have our setImmediate
// which locates at 'check' phase and goes right after poll

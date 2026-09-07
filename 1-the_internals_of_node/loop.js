// node myFile.js

const pendingTimers = [];
const pendingOSTasks = [];
const pendingOperations = [];

// New timers, tasks, operations are recorder from myFile running
// myFile.runContents();

// let condition = 0;
// const shouldContinue = () => condition <= 10 ?? true;
const shouldContinue = () => {
  // Check one: Any pending setTimeout, setInterval, setImmediate?
  // Check two: Any pending Operating Systems tasks? (server listening to some given port)
  // Check three: Any pending long running operations like "fs module"
  return (
    pendingTimers.length || pendingOSTasks.length || pendingOperations.length
  );
};
// entire body executes in one 'tick'
while (shouldContinue()) {
  // 1) Node looks at pendingTimers and see if any functions are ready to be called - setTimeout, setInterval
  // 2) Node looks at pendingOSTasks and pendingOperations and call relevant callbacks
  // 3) Pause execution. Continue when...
  //    - a new pendingOSTask is done
  //    - a new pendingOperation is done
  //    - a timer is about to complete
  // 4) Look at pendingTimers an call any setImmediate
  // 5) Handle any 'Close' events
  //   condition++;
  //   console.dir('Loop is runnig....' + condition);
  console.dir('Loop is running....');
}
// exit back to terminal

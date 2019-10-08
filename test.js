// console.log('hi')
//
// setTimeout(() => {
//     console.log('timer')
// }, 0);
//
// console.log('bye')
//
// timeout_vs_immediate.js
setTimeout(() => {
    console.log('timeout');
}, 0);

setImmediate(() => {
    console.log('immediate');
});
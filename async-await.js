const fetch = require('node-fetch');
//
// fetch('https://jsonplaceholder.typicode.com/todos')
//     .then(res => res.json())
//     .then(json => console.log(json[2]));

const fetchNth = (data, n) => {
    return data[n - 1];
};

(async function() {
    const fetchResult = await fetch('https://jsonplaceholder.typicode.com/todos');
    console.log(fetchResult);
    const json =  await fetchResult.json();
    console.log(json[2]);
})();
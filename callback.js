const square = function(base, callback) {
    setTimeout(() => {
        return callback(base * base);
    }, 3000);
};

const plus2 = function(base, callback) {
    setTimeout(() => {
        return callback(base + 2);
    }, 3000)
}

square(2, (data) => {
    plus2(data, (data2) => {
        plus2(data2, (data3) => {
            console.log(data3);
        })
    })
});


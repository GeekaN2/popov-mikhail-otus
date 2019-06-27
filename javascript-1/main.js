function sum(a){
    if (sum.main === undefined) sum.main = 0;

    if (a === undefined){
        return sum.main;
    } else {
        sum.main += a;
        return sum;
    }
} 
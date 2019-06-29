function sum(a){
    if (sum.main === undefined) sum.main = 0;

    if (a === undefined){
        let temp = sum.main;
        sum.main = 0;
        return temp;
    }
    
    sum.main += a;
    return sum;
} 
const compose = (...funcs) => v => funcs.reduceRight((v,f)=> f(v),v);



// Your code goes here!


const toUpperCase = str => str.toUpperCase();


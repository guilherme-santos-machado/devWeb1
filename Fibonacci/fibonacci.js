var n1 = 0;
var n2 = 1;
var resultado = n1 + n2;

console.log(n1);
console.log(n2);

for (var i=0;i<=17;i++){
console.log(resultado);
n1 = n2;
n2 = resultado;
resultado = n1 + n2;
}


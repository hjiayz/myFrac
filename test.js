var myFrac=require('./myFrac.js').load;//load myFrac classes.
var x=myFrac.C(2,10);//create myFrac object 2/10 = 1/5
var y=myFrac.C(2,15);//create myFrac object 2/15
var z=myFrac.div(x,y);//1/5 div 2/15 =3/2
console.log(z.toString());//output 3/2
var z=myFrac.CBEsafe("1/2*((2/4)+1)");//create myFrac object from expression 1/2*((2/4)+1) get 3/4
console.log(z.toString());//output 3/4
console.log(z.toTeX());//output 3/4 as Tex format :\\frac{3}{4}
console.log(z.toMathMl());//output 3/4 as MathMl format :<mfrac><mrow>3</mrow><mrow>4</mrow></mfrac>
console.log(z.getInteger());//get integer part of 3/4 ,output zero
console.log(z.getProper().toString());//get fraction part of 3/4 ,output 3/4
console.log(z.getNum());//get numerator of 3/4,output 3
console.log(z.getDeno());//get denominator of 3/4,output 4
console.log(z.isProper());//test myFrac, 3/4 is proper fraction so return true
var z=myFrac.CBEsafe("1/2*(1+1)");//create myFrac object from expression 1/2*(1+1) get 1/1
console.log(z.isInteger());//test myFrac , 1/1 is Integer so return true;

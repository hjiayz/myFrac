/*
write by hjiayz
email:hjiayz@163.com,hjiayz@gmail.com
copyleft:LGPLv3
\*/
//Improper Fraction object
var myFrac={};
//create myFrac Object Original
myFrac.OmyFrac=function(num,deno,Propered){
	if (num>9007199254740991) {throw "numerator too big!";}
	if (deno>9007199254740991) {throw "denominator too big!";}
	if (Propered!=true) {
		var GCD=myFrac.GCD(num,deno);
		//set numerator
		this.num=num/GCD;
		//set denominator
		this.deno=deno/GCD;
	}
	else {
		this.num=num;
		this.deno=deno;
	}
	if (this.deno<0) {this.deno=-this.deno;this.num=-this.num;}
}
//get numerator type:number(integer)
myFrac.OmyFrac.prototype.getNum=function() {
	return this.num;
}
//get denominator type:number(integer)
myFrac.OmyFrac.prototype.getDeno=function() {
	return this.deno;
}
myFrac.OmyFrac.prototype.isProper=function() {
	return this.num<this.deno;
}
myFrac.OmyFrac.prototype.isInteger=function() {
	return (this.deno==1);
}
//get integer part type:number(integer)
myFrac.OmyFrac.prototype.getInteger=function() {
	return parseInt(this.num/this.deno);
};	
//get proper fraction part type:myFrac object
myFrac.OmyFrac.prototype.getProper=function() {
	return myFrac.C(this.num%this.deno,this.deno);
}
//Out to number(float)  type:myFrac object
myFrac.OmyFrac.prototype.toFloat=function() {
	return this.num/this.deno;
}
//Out to string like numerator/denominator.  type:string
myFrac.OmyFrac.prototype.toString=function() {
	if (this.isInteger()) {return this.num.toString();}
	return this.num+"/"+this.deno;
}
//Out to TeX type:string
myFrac.OmyFrac.prototype.toTeX=function() {
        var tnum=this.num;
        var tminus="";
        if (tnum<0) {tnum=-tnum;tminus="-"}
	if (this.isInteger()) {return "{"+this.num.toString()+"}";}
	return tminus+"{{"+tnum.toString()+"}\\over{"+this.deno.toString()+"}}";
}
//Out to MathMl type:string
myFrac.OmyFrac.prototype.toMathMl=function() {
	var tnum=this.num;
	var tminus="";
	if (tnum<0) {tnum=-tnum;tminus="<mo>-</mo>"}
	if (this.isInteger()) {return "<mn>"+this.num.toString()+"</mn>";}
	return tminus+"<mfrac><mn>"+tnum.toString()+"</mn><mn>"+this.deno.toString()+"</mn></mfrac>";
}
//output object type:choose
myFrac.OmyFrac.prototype.O=function(outype) {
	switch (outype) {
		case "Num":return this.Num();break;
		case "Deno":return this.Deno();break;
		case "Integer":return this.getInteger();break;
		case "Proper":return this.getProper();break;
		case "Float":return this.toFloat();break;
		case "String":return this.toString();break;
		case "TeX":return this.toTeX();break;
		case "MathMl":return this.toMathMl();break;
	}
	throw "unknow type";
};
//finish create object
myFrac.C=function (num,deno){

	return new myFrac.OmyFrac(num,deno);
}
//get GCD for bignum(2147483648~9007199254740991)
myFrac.GCDbignum=function(a,b) {
	var czero=function(number) {
		var Snumber=number.toString(2);
		return Snumber.charAt(Snumber.length-1)=='0';
	}
    if (a<0) {a=-a;}
    if (b<0) {b=-b;}
    if ((a==1)||(b==1)) {return 1;}
    var c=0;
    while ((czero(a))&&(czero(b))) {
        a=a/2;
        b=b/2;
        c=c+1;
    }
    var steincore=function(a,b){
        if (a == 0) {return b;}
    	if (b == 0) {return a;}
        while (czero(a)) {
            a=a/2;
        }
        if (a<b) {
            b=(b-a)/2;
            return arguments.callee(b,a);
        }
        else {
            a=(a-b)/2;
            return arguments.callee(a,b);
        } 
    }
    if (czero(a)) {
        a=a/2;
        return steincore(a,b)*Math.pow(2,c);
    }
    else {
        return steincore(b,a)*Math.pow(2,c);
    }
}
//get GCD
myFrac.GCD=function(a,b) {
	if ((a>2147483648)||(b>2147483648)) {return myFrac.GCDbignum(a,b);}
    if (a<0) {a=-a;}
    if (b<0) {b=-b;}
    if ((a==1)||(b==1)) {return 1;}
    var c=0;
    while (((a & 1)==0)&&(( b & 1 )==0)) {
        a=a>>1;
        b=b>>1;
        c=c+1;
    }
    var steincore=function(a,b){
        if (a == 0) {return b;}
    	if (b == 0) {return a;}
        while ((a & 1) == 0) {
            a=a>>1;
        }
        if (a<b) {
            b=(b-a)>>1;
            return arguments.callee(b,a);
        }
        else {
            a=(a-b)>>1;
            return arguments.callee(a,b);
        } 
    }
    if ((a & 1) == 0) {
        a=a>>1;
        return steincore(a,b)<<c;
    }
    else {
        return steincore(b,a)<<c;
    }
}

//Add
myFrac.add=function(a,b) {
	var GCD=myFrac.GCD(a.deno,b.deno);
	return myFrac.C(b.deno/GCD*a.num+a.deno/GCD*b.num,a.deno/GCD*b.deno);
}
//subtraction
myFrac.sub=function(a,b) {
	var GCD=myFrac.GCD(a.deno,b.deno);
	return myFrac.C(b.deno/GCD*a.num-a.deno/GCD*b.num,a.deno/GCD*b.deno);
}
//multiplication
myFrac.mul=function(a,b) {
	var GCDa=myFrac.GCD(a.num,b.deno);
	var GCDb=myFrac.GCD(b.num,a.deno);
	return myFrac.C((a.num/GCDa)*(b.num/GCDb),(a.deno/GCDb)*(b.deno/GCDa),true);
}
//division
myFrac.div=function(a,b) {
	var GCDnum=myFrac.GCD(a.num,b.num);
	var GCDdeno=myFrac.GCD(b.deno,a.deno);
	var DIVRdeno=(a.deno/GCDdeno)*(b.num/GCDnum);
	if (DIVRdeno==0) {throw "DIV ZERO!";}
	return myFrac.C((a.num/GCDnum)*(b.deno/GCDdeno),DIVRdeno,true);
}
//create by expression support () but +-*/ no priority
myFrac.CBE=function(expression){

		var mypoint=0;
		var mypend;
		var left;
		var right="";
		var operator="?";
		var OP=function(lef,rig,op){
			var ri;
			if (typeof(rig)=="string") {
				if ((rig.indexOf(".")>-1)||(isNaN(rig))) {throw rig+"is Not Integer!";}
				ri=myFrac.C(rig,1);
			}
			else {
				ri=rig;
			}
			switch (op) {
			case "+":return (myFrac.add(lef,ri));break;
			case "-":return (myFrac.sub(lef,ri));break;
			case "*":return (myFrac.mul(lef,ri));break;
			case "/":return (myFrac.div(lef,ri));break;
			case "?":return (ri);break;
			}
			return "err";
		}
		while (mypoint<expression.length) {
			if (expression.charAt(mypoint).search(/[\+\-\*\/]/)==0) {
				left=OP(left,right,operator);
				right="";
				operator=expression.charAt(mypoint);
				mypoint++;
			}
			else {
				if (expression.charAt(mypoint)=="(") {
					var Bracket=1;
					mypend=mypoint;
					while (Bracket>0) {
						mypend++;
						if (expression.charAt(mypend)=="(") {Bracket++;}
						if (expression.charAt(mypend)==")") {Bracket--;}
					}
					right=arguments.callee(expression.substring(mypoint+1,mypend));
					mypoint=mypend+1;
				}
				else {
					right=right+expression.charAt(mypoint);
					mypoint++;
				}
			}
		}
		left=OP(left,right,operator);
		return left;
	}

//check expression and do CBE，give * / more priority
myFrac.CBEsafe=function(expression,priority){
	//convert example:-1 to (0-1)
	expression=expression.replace(/([\+\-\*\/\(\)])(\-[0-9]+[.]?[0-9]*)/g,'$1(0$2)');
	expression=expression.replace(/^(\-[0-9]+[.]?[0-9]*)/g,'(0$1)');
	alert(expression);
	//convert float number to division
	expression=expression.replace(/([0-9]*)\.([0-9]*)/g,function(num,high,low){var nozero=low.replace(/[0]+$/,'');return '('+high.replace(/^[0]+/,'')+nozero+'/1'+nozero.replace(/[0-9]/g,'0')+')';});
	//check forbidden character
	if (expression.search(/[^0-9\+\-\*\/\(\)]/)>-1) {throw "forbidden character!";/*return false;*/}
	//check improper expression
	if (expression.search(/(^[\+\-\*\/\)]{1,1})|([0-9]+[\(\)]+[0-9]+)|(\(\))|([\(]{1,1}[\+\-\*\/]{1,1})|([\+\-\*\/]{1,1}[\)]{1,1})|([\+\-\*\/]{1,1}[\+\-\*\/]{1,1})|([\+\-\*\/\(]{1,1}$)/)>-1) {throw("improper expression!");/*return false;*/}
	//if priority not false, up * / priority
	if (!(priority===false)) {
			var addbracket=function(exp) {
				var bracket=function(bchar) {
					if (bchar==')') {mod=-1;}
					if (bchar=='(') {mod=1;}
					myp2=myp+mod;
					if (exp.charAt(myp2)==bchar) {
                        var lv=1;
                        
                        while (lv>0) {
                                myp2=myp2+mod;
                                if (exp.charAt(myp2)==')') {
                                        lv=lv-mod;
                                }
                                if (exp.charAt(myp2)=='(') {
                                        lv=lv+mod;
                                }
                        }
					}
					else {
                        while ((!isNaN(exp.charAt(myp2+mod)))&&(exp.charAt(myp2+mod)!="")) {
                                myp2=myp2+mod;
                        }
					}
					return myp2;
				}
				
			var myp=exp.search(/[\*\/](?![\\])/);
			if (myp==-1) {return exp;}
			var myleft=bracket(')');
			var myright=bracket('(');
			var outexp;
			if ((exp.charAt(myleft-1)=="(")&&(exp.charAt(myright+1)==")")) {
				outexp=arguments.callee(exp.substring(0,myp+1)+'\\'+exp.substring(myp+1));
			}
			else {
				outexp=arguments.callee(exp.substring(0,myleft)+'('+exp.substring(myleft,myp+1)+'\\'+exp.substring(myp+1,myright+1)+')'+exp.substring(myright+1));
			}
			return outexp.replace(/[\\]/,'');
		}
		return myFrac.CBE(addbracket(expression));	
	}
	return myFrac.CBE(expression);
}
myFrac.parse=myFrac.CBEsafe;
myFrac.eval=myFrac.CBEsafe;

try {exports.load = myFrac;}catch(e){}

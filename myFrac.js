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
	return this.num+"/"+this.deno;
}
//Out to TeX type:string
myFrac.OmyFrac.prototype.toTeX=function() {
	return "\\frac{"+this.num.toString()+"}{"+this.deno.toString()+"}";
}
//Out to MathMl type:string
myFrac.OmyFrac.prototype.toMathMl=function() {
	return "<mfrac><mn>"+this.num.toString()+"</mn><mn>"+this.deno.toString()+"</mn></mfrac>";
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

//get GCD
myFrac.GCD=function(a,b) {
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
			if (expression[mypoint].search(/[\+\-\*\/]/)==0) {
				left=OP(left,right,operator);
				right="";
				operator=expression[mypoint];
				mypoint++;
			}
			else {
				if (expression[mypoint]=="(") {
					var Bracket=1;
					mypend=mypoint;
					while (Bracket>0) {
						mypend++;
						if (expression[mypend]=="(") {Bracket++;}
						if (expression[mypend]==")") {Bracket--;}
					}
					right=arguments.callee(expression.substring(mypoint+1,mypend));
					mypoint=mypend+1;
				}
				else {
					right+=expression[mypoint];
					mypoint++;
				}
			}
		}
		left=OP(left,right,operator);
		return left;
	}

//check expression and do CBE，give * / more priority
myFrac.CBEsafe=function(expression,priority){
	if (expression.search(/[^0-9\+\-\*\/\(\)]/)>-1) {throw "forbidden character!";return false;}
	if (expression.search(/(^[\+\-\*\/\)]{1,1})|([\(]{1,1}[\+\-\*\/]{1,1})|([\+\-\*\/]{1,1}[\)]{1,1})|([\+\-\*\/]{1,1}[\+\-\*\/]{1,1})|([\+\-\*\/\(]{1,1}$)/)>-1) {throw("improper expression!");return false;}
	
	//if priority not false, up * / priority
	if (!(priority===false)) {
			var addbracket=function(exp) {
				var bracket=function(char) {
					if (char==')') {mod=-1;}
					if (char=='(') {mod=1;}
					myp2=myp+mod;
					if (exp[myp2]==char) {
                        var lv=1;
                        
                        while (lv>0) {
                                myp2=myp2+mod;
                                if (exp[myp2]==')') {
                                        lv=lv-mod;
                                }
                                if (exp[myp2]=='(') {
                                        lv=lv+mod;
                                }
                        }
					}
					else {
                        while (!isNaN(exp[myp2+mod])) {
                                myp2=myp2+mod;
                        }
					}
					return myp2;
				}
			var myp=exp.search(/[\*\/](?![\\])/);
			console.log(myp);
			if (myp==-1) {return exp;}
			var myleft=bracket(')');
			var myright=bracket('(');
			var outexp;
			if ((exp[myleft-1]=="(")&&(exp[myright+1]==")")) {
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
try {exports.load = myFrac;}catch(e){}

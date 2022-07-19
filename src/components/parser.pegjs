{
	function addUnit(units, newUnit, power) {
    	if (!(newUnit in units)) {units[newUnit] = 0}
        units[newUnit] += power;
    }
    
    function combineUnits(units1, units2, flip) {
    	flip = flip || 1;
        for (const [unit, power] of Object.entries(units2)) {
        	addUnit(units1, unit, flip*power);
        }
        return units1;
    }
    
    function exponentiateUnits(units, exponent) {
    	for (const unit in units) {
        	units[unit] *= exponent;
        }
        return units;
    }
}

Expression = Sum / "" {return null}

Sum
  = head:Term tail:(_ ("+" / "-") _ Term)* {
  // return sum of all terms
      return {
      	number: tail.reduce(function(result, element) {
          if (element[1] === "+") { return result + element[3].number; }
          if (element[1] === "-") { return result - element[3].number; }
        }, head.number),
        units: head.units
   	  }
    }

Term = sign:("-"?) x:UnsignedTerm {
return {
	number: x.number*(sign? -1 : 1),
    units: x.units}
}

UnsignedTerm
  = head:Factor tail:((_ ("\\cdot" / "/" / "") _ Factor)*) {
  // return product of all factors
      return {
      	number: tail.reduce(function(result, element) {
          if (element[1] === "\\cdot" || element[1] === "") { return result * element[3].number; }
          if (element[1] === "/") { return result / element[3].number; }
	  	    }, head.number),
        units: tail.reduce((result, element) => {
          if (element[1] === "\\cdot" || element[1] === "") { return combineUnits(result, element[3].units); }
          if (element[1] === "/") { return combineUnits(result, element[3].units, -1); }
        }, head.units || "")
       }
            
    }

Factor
  = Exp / MiniFactor / Frac
   / Number
 
Frac = "\\frac{" x:Sum "}{" y:Sum "}" {
	return {units: combineUnits(x.units, y.units, -1), number: x.number/y.number}
}

Exp = x:(MiniFactor / Number) "^" y:Factor {
	return {units: exponentiateUnits(x.units, y.number), number: x.number**y.number}
    }

MiniFactor = Bracks

Bracks = CircleBracks / SquareBracks / SquigglyBracks
CircleBracks = Left "(" _ expr: Sum _ Right ")" { return expr; }
SquareBracks = Left "[" _ expr: Sum _ Right "]" { return expr; }
SquigglyBracks = Left "{" _ expr: Sum _ Right "}" { return expr; }

Left = ("\\left")?
Right = ("\\right")?

Number "number"
  = _ x:ActualNumber _ u:Unit? {
  const units = {};
  if (u!==null) units[u] = 1;
  return {number: x, units: units}
  } / _ u: Unit {
  const units = {};
  if (u!==null) units[u] = 1;
  return {number: 1, units: units}
  }

ActualNumber = x:(([0-9]+)("."?)[0-9]*) {
	return parseFloat(x)
}

Unit = "\\operatorname{" u:([a-zA-Z]+) "}" {return u.join("")}

_ "whitespace"
  = [ \t\n\r]*

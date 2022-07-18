Expression
  = head:Term tail:(_ ("+" / "-") _ Term)* {
  // return sum of all terms
      return tail.reduce(function(result, element) { 
        if (element[1] === "+") { return result + element[3]; }
        if (element[1] === "-") { return result - element[3]; }
      }, head);
    }

Term
  = head:Factor tail:(_ ("\\cdot" / "/") _ Factor)* {
  // return product of all factors
      return tail.reduce(function(result, element) {
        if (element[1] === "\\cdot") { return result * element[3]; }
        if (element[1] === "/") { return result / element[3]; }
      }, head);
    }

Factor
  = Exp / MiniFactor / Frac
   / Number
 
Frac = "\\frac{" x:Expression "}{" y:Expression "}" {return x/y}

Exp = x:(MiniFactor / Number) "^" y:Factor {return x**y}

MiniFactor = Bracks

Bracks = CircleBracks / SquareBracks / SquigglyBracks
CircleBracks = Left "(" _ expr: Expression _ Right ")" { return expr; }
SquareBracks = Left "[" _ expr: Expression _ Right "]" { return expr; }
SquigglyBracks = Left "{" _ expr: Expression _ Right "}" { return expr; }

Left = ("\\left")?
Right = ("\\right")?

Number "integer"
  = _ [0-9]*("."?)[0-9]* { return parseFloat(text()); }

_ "whitespace"
  = [ \t\n\r]*

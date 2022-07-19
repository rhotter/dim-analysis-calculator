// Generated by Peggy 2.0.1.
//
// https://peggyjs.org/

"use strict";

function peg$subclass(child, parent) {
  function C() { this.constructor = child; }
  C.prototype = parent.prototype;
  child.prototype = new C();
}

function peg$SyntaxError(message, expected, found, location) {
  var self = Error.call(this, message);
  // istanbul ignore next Check is a necessary evil to support older environments
  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(self, peg$SyntaxError.prototype);
  }
  self.expected = expected;
  self.found = found;
  self.location = location;
  self.name = "SyntaxError";
  return self;
}

peg$subclass(peg$SyntaxError, Error);

function peg$padEnd(str, targetLength, padString) {
  padString = padString || " ";
  if (str.length > targetLength) { return str; }
  targetLength -= str.length;
  padString += padString.repeat(targetLength);
  return str + padString.slice(0, targetLength);
}

peg$SyntaxError.prototype.format = function(sources) {
  var str = "Error: " + this.message;
  if (this.location) {
    var src = null;
    var k;
    for (k = 0; k < sources.length; k++) {
      if (sources[k].source === this.location.source) {
        src = sources[k].text.split(/\r\n|\n|\r/g);
        break;
      }
    }
    var s = this.location.start;
    var loc = this.location.source + ":" + s.line + ":" + s.column;
    if (src) {
      var e = this.location.end;
      var filler = peg$padEnd("", s.line.toString().length, ' ');
      var line = src[s.line - 1];
      var last = s.line === e.line ? e.column : line.length + 1;
      var hatLen = (last - s.column) || 1;
      str += "\n --> " + loc + "\n"
          + filler + " |\n"
          + s.line + " | " + line + "\n"
          + filler + " | " + peg$padEnd("", s.column - 1, ' ')
          + peg$padEnd("", hatLen, "^");
    } else {
      str += "\n at " + loc;
    }
  }
  return str;
};

peg$SyntaxError.buildMessage = function(expected, found) {
  var DESCRIBE_EXPECTATION_FNS = {
    literal: function(expectation) {
      return "\"" + literalEscape(expectation.text) + "\"";
    },

    class: function(expectation) {
      var escapedParts = expectation.parts.map(function(part) {
        return Array.isArray(part)
          ? classEscape(part[0]) + "-" + classEscape(part[1])
          : classEscape(part);
      });

      return "[" + (expectation.inverted ? "^" : "") + escapedParts.join("") + "]";
    },

    any: function() {
      return "any character";
    },

    end: function() {
      return "end of input";
    },

    other: function(expectation) {
      return expectation.description;
    }
  };

  function hex(ch) {
    return ch.charCodeAt(0).toString(16).toUpperCase();
  }

  function literalEscape(s) {
    return s
      .replace(/\\/g, "\\\\")
      .replace(/"/g,  "\\\"")
      .replace(/\0/g, "\\0")
      .replace(/\t/g, "\\t")
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r")
      .replace(/[\x00-\x0F]/g,          function(ch) { return "\\x0" + hex(ch); })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return "\\x"  + hex(ch); });
  }

  function classEscape(s) {
    return s
      .replace(/\\/g, "\\\\")
      .replace(/\]/g, "\\]")
      .replace(/\^/g, "\\^")
      .replace(/-/g,  "\\-")
      .replace(/\0/g, "\\0")
      .replace(/\t/g, "\\t")
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r")
      .replace(/[\x00-\x0F]/g,          function(ch) { return "\\x0" + hex(ch); })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return "\\x"  + hex(ch); });
  }

  function describeExpectation(expectation) {
    return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
  }

  function describeExpected(expected) {
    var descriptions = expected.map(describeExpectation);
    var i, j;

    descriptions.sort();

    if (descriptions.length > 0) {
      for (i = 1, j = 1; i < descriptions.length; i++) {
        if (descriptions[i - 1] !== descriptions[i]) {
          descriptions[j] = descriptions[i];
          j++;
        }
      }
      descriptions.length = j;
    }

    switch (descriptions.length) {
      case 1:
        return descriptions[0];

      case 2:
        return descriptions[0] + " or " + descriptions[1];

      default:
        return descriptions.slice(0, -1).join(", ")
          + ", or "
          + descriptions[descriptions.length - 1];
    }
  }

  function describeFound(found) {
    return found ? "\"" + literalEscape(found) + "\"" : "end of input";
  }

  return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
};

function peg$parse(input, options) {
  options = options !== undefined ? options : {};

  var peg$FAILED = {};
  var peg$source = options.grammarSource;

  var peg$startRuleFunctions = { Expression: peg$parseExpression };
  var peg$startRuleFunction = peg$parseExpression;

  var peg$c0 = "+";
  var peg$c1 = "-";
  var peg$c2 = "\\cdot";
  var peg$c3 = "/";
  var peg$c4 = "\\frac{";
  var peg$c5 = "}{";
  var peg$c6 = "}";
  var peg$c7 = "^";
  var peg$c8 = "(";
  var peg$c9 = ")";
  var peg$c10 = "[";
  var peg$c11 = "]";
  var peg$c12 = "{";
  var peg$c13 = "\\left";
  var peg$c14 = "\\right";
  var peg$c15 = ".";
  var peg$c16 = "\\operatorname{";

  var peg$r0 = /^[0-9]/;
  var peg$r1 = /^[a-zA-Z]/;
  var peg$r2 = /^[ \t\n\r]/;

  var peg$e0 = peg$literalExpectation("+", false);
  var peg$e1 = peg$literalExpectation("-", false);
  var peg$e2 = peg$literalExpectation("\\cdot", false);
  var peg$e3 = peg$literalExpectation("/", false);
  var peg$e4 = peg$literalExpectation("\\frac{", false);
  var peg$e5 = peg$literalExpectation("}{", false);
  var peg$e6 = peg$literalExpectation("}", false);
  var peg$e7 = peg$literalExpectation("^", false);
  var peg$e8 = peg$literalExpectation("(", false);
  var peg$e9 = peg$literalExpectation(")", false);
  var peg$e10 = peg$literalExpectation("[", false);
  var peg$e11 = peg$literalExpectation("]", false);
  var peg$e12 = peg$literalExpectation("{", false);
  var peg$e13 = peg$literalExpectation("\\left", false);
  var peg$e14 = peg$literalExpectation("\\right", false);
  var peg$e15 = peg$otherExpectation("number");
  var peg$e16 = peg$classExpectation([["0", "9"]], false, false);
  var peg$e17 = peg$literalExpectation(".", false);
  var peg$e18 = peg$literalExpectation("\\operatorname{", false);
  var peg$e19 = peg$classExpectation([["a", "z"], ["A", "Z"]], false, false);
  var peg$e20 = peg$otherExpectation("whitespace");
  var peg$e21 = peg$classExpectation([" ", "\t", "\n", "\r"], false, false);

  var peg$f0 = function() {return null};
  var peg$f1 = function(head, tail) {
  // return sum of all terms
      return {
      	number: tail.reduce(function(result, element) {
          if (element[1] === "+") { return result + element[3].number; }
          if (element[1] === "-") { return result - element[3].number; }
        }, head.number),
        units: head.units
   	  }
    };
  var peg$f2 = function(head, tail) {
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
            
    };
  var peg$f3 = function(x, y) {
	return {units: combineUnits(x.units, y.units, -1), number: x.number/y.number}
};
  var peg$f4 = function(x, y) {
	return {units: exponentiateUnits(x.units, y.number), number: x.number**y.number}
    };
  var peg$f5 = function(expr) { return expr; };
  var peg$f6 = function(expr) { return expr; };
  var peg$f7 = function(expr) { return expr; };
  var peg$f8 = function(x, u) {
  const units = {};
  if (u!==null) units[u] = 1;
  return {number: parseFloat(x), units: units}
  };
  var peg$f9 = function(u) {
  const units = {};
  if (u!==null) units[u] = 1;
  return {number: 1, units: units}
  };
  var peg$f10 = function(u) {return u.join("")};
  var peg$currPos = 0;
  var peg$savedPos = 0;
  var peg$posDetailsCache = [{ line: 1, column: 1 }];
  var peg$maxFailPos = 0;
  var peg$maxFailExpected = [];
  var peg$silentFails = 0;

  var peg$result;

  if ("startRule" in options) {
    if (!(options.startRule in peg$startRuleFunctions)) {
      throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
    }

    peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
  }

  function text() {
    return input.substring(peg$savedPos, peg$currPos);
  }

  function offset() {
    return peg$savedPos;
  }

  function range() {
    return {
      source: peg$source,
      start: peg$savedPos,
      end: peg$currPos
    };
  }

  function location() {
    return peg$computeLocation(peg$savedPos, peg$currPos);
  }

  function expected(description, location) {
    location = location !== undefined
      ? location
      : peg$computeLocation(peg$savedPos, peg$currPos);

    throw peg$buildStructuredError(
      [peg$otherExpectation(description)],
      input.substring(peg$savedPos, peg$currPos),
      location
    );
  }

  function error(message, location) {
    location = location !== undefined
      ? location
      : peg$computeLocation(peg$savedPos, peg$currPos);

    throw peg$buildSimpleError(message, location);
  }

  function peg$literalExpectation(text, ignoreCase) {
    return { type: "literal", text: text, ignoreCase: ignoreCase };
  }

  function peg$classExpectation(parts, inverted, ignoreCase) {
    return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
  }

  function peg$anyExpectation() {
    return { type: "any" };
  }

  function peg$endExpectation() {
    return { type: "end" };
  }

  function peg$otherExpectation(description) {
    return { type: "other", description: description };
  }

  function peg$computePosDetails(pos) {
    var details = peg$posDetailsCache[pos];
    var p;

    if (details) {
      return details;
    } else {
      p = pos - 1;
      while (!peg$posDetailsCache[p]) {
        p--;
      }

      details = peg$posDetailsCache[p];
      details = {
        line: details.line,
        column: details.column
      };

      while (p < pos) {
        if (input.charCodeAt(p) === 10) {
          details.line++;
          details.column = 1;
        } else {
          details.column++;
        }

        p++;
      }

      peg$posDetailsCache[pos] = details;

      return details;
    }
  }

  function peg$computeLocation(startPos, endPos) {
    var startPosDetails = peg$computePosDetails(startPos);
    var endPosDetails = peg$computePosDetails(endPos);

    return {
      source: peg$source,
      start: {
        offset: startPos,
        line: startPosDetails.line,
        column: startPosDetails.column
      },
      end: {
        offset: endPos,
        line: endPosDetails.line,
        column: endPosDetails.column
      }
    };
  }

  function peg$fail(expected) {
    if (peg$currPos < peg$maxFailPos) { return; }

    if (peg$currPos > peg$maxFailPos) {
      peg$maxFailPos = peg$currPos;
      peg$maxFailExpected = [];
    }

    peg$maxFailExpected.push(expected);
  }

  function peg$buildSimpleError(message, location) {
    return new peg$SyntaxError(message, null, null, location);
  }

  function peg$buildStructuredError(expected, found, location) {
    return new peg$SyntaxError(
      peg$SyntaxError.buildMessage(expected, found),
      expected,
      found,
      location
    );
  }

  function peg$parseExpression() {
    var s0, s1;

    s0 = peg$parseSum();
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      s1 = '';
      peg$savedPos = s0;
      s1 = peg$f0();
      s0 = s1;
    }

    return s0;
  }

  function peg$parseSum() {
    var s0, s1, s2, s3, s4, s5, s6, s7;

    s0 = peg$currPos;
    s1 = peg$parseTerm();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      s4 = peg$parse_();
      if (input.charCodeAt(peg$currPos) === 43) {
        s5 = peg$c0;
        peg$currPos++;
      } else {
        s5 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e0); }
      }
      if (s5 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 45) {
          s5 = peg$c1;
          peg$currPos++;
        } else {
          s5 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e1); }
        }
      }
      if (s5 !== peg$FAILED) {
        s6 = peg$parse_();
        s7 = peg$parseTerm();
        if (s7 !== peg$FAILED) {
          s4 = [s4, s5, s6, s7];
          s3 = s4;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        s4 = peg$parse_();
        if (input.charCodeAt(peg$currPos) === 43) {
          s5 = peg$c0;
          peg$currPos++;
        } else {
          s5 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e0); }
        }
        if (s5 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 45) {
            s5 = peg$c1;
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$e1); }
          }
        }
        if (s5 !== peg$FAILED) {
          s6 = peg$parse_();
          s7 = peg$parseTerm();
          if (s7 !== peg$FAILED) {
            s4 = [s4, s5, s6, s7];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }
      peg$savedPos = s0;
      s0 = peg$f1(s1, s2);
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseTerm() {
    var s0, s1, s2, s3, s4, s5, s6, s7;

    s0 = peg$currPos;
    s1 = peg$parseFactor();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      s4 = peg$parse_();
      if (input.substr(peg$currPos, 5) === peg$c2) {
        s5 = peg$c2;
        peg$currPos += 5;
      } else {
        s5 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e2); }
      }
      if (s5 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 47) {
          s5 = peg$c3;
          peg$currPos++;
        } else {
          s5 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e3); }
        }
        if (s5 === peg$FAILED) {
          s5 = '';
        }
      }
      if (s5 !== peg$FAILED) {
        s6 = peg$parse_();
        s7 = peg$parseFactor();
        if (s7 !== peg$FAILED) {
          s4 = [s4, s5, s6, s7];
          s3 = s4;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        s4 = peg$parse_();
        if (input.substr(peg$currPos, 5) === peg$c2) {
          s5 = peg$c2;
          peg$currPos += 5;
        } else {
          s5 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e2); }
        }
        if (s5 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 47) {
            s5 = peg$c3;
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$e3); }
          }
          if (s5 === peg$FAILED) {
            s5 = '';
          }
        }
        if (s5 !== peg$FAILED) {
          s6 = peg$parse_();
          s7 = peg$parseFactor();
          if (s7 !== peg$FAILED) {
            s4 = [s4, s5, s6, s7];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }
      peg$savedPos = s0;
      s0 = peg$f2(s1, s2);
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseFactor() {
    var s0;

    s0 = peg$parseExp();
    if (s0 === peg$FAILED) {
      s0 = peg$parseBracks();
      if (s0 === peg$FAILED) {
        s0 = peg$parseFrac();
        if (s0 === peg$FAILED) {
          s0 = peg$parseNumber();
        }
      }
    }

    return s0;
  }

  function peg$parseFrac() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 6) === peg$c4) {
      s1 = peg$c4;
      peg$currPos += 6;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e4); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parseSum();
      if (s2 !== peg$FAILED) {
        if (input.substr(peg$currPos, 2) === peg$c5) {
          s3 = peg$c5;
          peg$currPos += 2;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e5); }
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parseSum();
          if (s4 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 125) {
              s5 = peg$c6;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$e6); }
            }
            if (s5 !== peg$FAILED) {
              peg$savedPos = s0;
              s0 = peg$f3(s2, s4);
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseExp() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parseBracks();
    if (s1 === peg$FAILED) {
      s1 = peg$parseNumber();
    }
    if (s1 !== peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 94) {
        s2 = peg$c7;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e7); }
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parseFactor();
        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s0 = peg$f4(s1, s3);
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseBracks() {
    var s0;

    s0 = peg$parseCircleBracks();
    if (s0 === peg$FAILED) {
      s0 = peg$parseSquareBracks();
      if (s0 === peg$FAILED) {
        s0 = peg$parseSquigglyBracks();
      }
    }

    return s0;
  }

  function peg$parseCircleBracks() {
    var s0, s1, s2, s3, s4, s5, s6, s7;

    s0 = peg$currPos;
    s1 = peg$parseLeft();
    if (input.charCodeAt(peg$currPos) === 40) {
      s2 = peg$c8;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e8); }
    }
    if (s2 !== peg$FAILED) {
      s3 = peg$parse_();
      s4 = peg$parseSum();
      if (s4 !== peg$FAILED) {
        s5 = peg$parse_();
        s6 = peg$parseRight();
        if (input.charCodeAt(peg$currPos) === 41) {
          s7 = peg$c9;
          peg$currPos++;
        } else {
          s7 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e9); }
        }
        if (s7 !== peg$FAILED) {
          peg$savedPos = s0;
          s0 = peg$f5(s4);
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseSquareBracks() {
    var s0, s1, s2, s3, s4, s5, s6, s7;

    s0 = peg$currPos;
    s1 = peg$parseLeft();
    if (input.charCodeAt(peg$currPos) === 91) {
      s2 = peg$c10;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e10); }
    }
    if (s2 !== peg$FAILED) {
      s3 = peg$parse_();
      s4 = peg$parseSum();
      if (s4 !== peg$FAILED) {
        s5 = peg$parse_();
        s6 = peg$parseRight();
        if (input.charCodeAt(peg$currPos) === 93) {
          s7 = peg$c11;
          peg$currPos++;
        } else {
          s7 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e11); }
        }
        if (s7 !== peg$FAILED) {
          peg$savedPos = s0;
          s0 = peg$f6(s4);
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseSquigglyBracks() {
    var s0, s1, s2, s3, s4, s5, s6, s7;

    s0 = peg$currPos;
    s1 = peg$parseLeft();
    if (input.charCodeAt(peg$currPos) === 123) {
      s2 = peg$c12;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e12); }
    }
    if (s2 !== peg$FAILED) {
      s3 = peg$parse_();
      s4 = peg$parseSum();
      if (s4 !== peg$FAILED) {
        s5 = peg$parse_();
        s6 = peg$parseRight();
        if (input.charCodeAt(peg$currPos) === 125) {
          s7 = peg$c6;
          peg$currPos++;
        } else {
          s7 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e6); }
        }
        if (s7 !== peg$FAILED) {
          peg$savedPos = s0;
          s0 = peg$f7(s4);
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseLeft() {
    var s0;

    if (input.substr(peg$currPos, 5) === peg$c13) {
      s0 = peg$c13;
      peg$currPos += 5;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e13); }
    }
    if (s0 === peg$FAILED) {
      s0 = null;
    }

    return s0;
  }

  function peg$parseRight() {
    var s0;

    if (input.substr(peg$currPos, 6) === peg$c14) {
      s0 = peg$c14;
      peg$currPos += 6;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e14); }
    }
    if (s0 === peg$FAILED) {
      s0 = null;
    }

    return s0;
  }

  function peg$parseNumber() {
    var s0, s1, s2, s3, s4;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = peg$parse_();
    s2 = peg$parseActualNumber();
    if (s2 !== peg$FAILED) {
      s3 = peg$parse_();
      s4 = peg$parseUnit();
      if (s4 === peg$FAILED) {
        s4 = null;
      }
      peg$savedPos = s0;
      s0 = peg$f8(s2, s4);
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      s1 = peg$parse_();
      s2 = peg$parseUnit();
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s0 = peg$f9(s2);
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e15); }
    }

    return s0;
  }

  function peg$parseActualNumber() {
    var s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    s1 = [];
    if (peg$r0.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e16); }
    }
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        if (peg$r0.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e16); }
        }
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 46) {
        s2 = peg$c15;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e17); }
      }
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      s3 = [];
      if (peg$r0.test(input.charAt(peg$currPos))) {
        s4 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s4 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e16); }
      }
      while (s4 !== peg$FAILED) {
        s3.push(s4);
        if (peg$r0.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e16); }
        }
      }
      s1 = [s1, s2, s3];
      s0 = s1;
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseUnit() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 14) === peg$c16) {
      s1 = peg$c16;
      peg$currPos += 14;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e18); }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      if (peg$r1.test(input.charAt(peg$currPos))) {
        s3 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e19); }
      }
      if (s3 !== peg$FAILED) {
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          if (peg$r1.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$e19); }
          }
        }
      } else {
        s2 = peg$FAILED;
      }
      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 125) {
          s3 = peg$c6;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e6); }
        }
        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s0 = peg$f10(s2);
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parse_() {
    var s0, s1;

    peg$silentFails++;
    s0 = [];
    if (peg$r2.test(input.charAt(peg$currPos))) {
      s1 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e21); }
    }
    while (s1 !== peg$FAILED) {
      s0.push(s1);
      if (peg$r2.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e21); }
      }
    }
    peg$silentFails--;
    s1 = peg$FAILED;
    if (peg$silentFails === 0) { peg$fail(peg$e20); }

    return s0;
  }


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

  peg$result = peg$startRuleFunction();

  if (peg$result !== peg$FAILED && peg$currPos === input.length) {
    return peg$result;
  } else {
    if (peg$result !== peg$FAILED && peg$currPos < input.length) {
      peg$fail(peg$endExpectation());
    }

    throw peg$buildStructuredError(
      peg$maxFailExpected,
      peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
      peg$maxFailPos < input.length
        ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
        : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
    );
  }
}

module.exports = {
  SyntaxError: peg$SyntaxError,
  parse: peg$parse
};

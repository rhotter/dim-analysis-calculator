/*
TODOs:
- render with katex
- publish to the web
x support more units
x simplfy units 

*/

import React, { useState } from "react";
import styled from "@emotion/styled";
import "./Calculator.css";
import { EditableMathField, addStyles } from "react-mathquill";
import { parse } from "./parser";
import { Container } from "@mui/material";
import "katex/dist/katex.min.css";
import TeX from "@matejmazur/react-katex";

addStyles();

const getSupportedUnits = () => {
  const baseUnits = ["s", "m", "kg", "A", "mol", "cd", "K"];

  // https://en.wikipedia.org/wiki/MKS_system_of_units#Derived_units
  const extendedUnits = {
    Hz: { s: -1 },
    N: { kg: 1, m: 1, s: -2 },
    Pa: { kg: 1, m: -1, s: -2 },
    J: { kg: 1, m: 2, s: -2 },
    W: { kg: 1, m: 2, s: -3 },
    C: { s: 1, A: 1 },
    V: { kg: 1, m: 2, s: -3, A: -1 },
    F: { kg: -1, m: -2, s: 4, A: 2 },
    S: { kg: -1, m: -2, s: 3, A: 2 },
    Wb: { kg: 1, m: 2, s: -2, A: -1 },
    T: { kg: 1, s: -2, A: -1 },
    H: { kg: 1, m: 2, s: -2, A: -2 },
  };
  const units = baseUnits.concat(Object.keys(extendedUnits));
  // const siPrefixes = [
  //   "y",
  //   "z",
  //   "a",
  //   "f",
  //   "p",
  //   "n",
  //   "m",
  //   "c",
  //   "d",
  //   "da",
  //   "h",
  //   "k",
  //   "M",
  //   "G",
  //   "T",
  //   "P",
  //   "E",
  //   "Z",
  //   "Y",
  // ];
  // for (const prefix of siPrefixes) {
  //   for (const unit of units) {
  //     units.push(prefix + unit);
  //   }
  // }
  return { units, extendedUnits };
};

const constants = {
  "\\pi": `{${Math.PI}}`,
  k_B: "1.380649 \\cdot 10^{-23} \\operatorname{J} \\operatorname{K}^{-1}",
  "\\epsilon_0":
    "8.85418782 \\cdot 10^{-12} {\\operatorname{m}^{-3}} {\\operatorname{kg}^{-1}} {\\operatorname{s}^4} {\\operatorname{A}^2}",
  // "\\mu_0":
  // "1.25663706212 \\cdot {10}^{−6} {\\operatorname{N}} {\\operatorname{A}^{−2}}",
};

const { units, extendedUnits } = getSupportedUnits();

const preprocess = (latex) => {
  console.log(latex);

  // e.g. 2^3 -> 2^{3} but 2^{3} -> 2^{3}
  latex = latex.replaceAll(/(\d+)\^(\d+)/g, "$1^{ $2 }");

  // swap constants
  for (const [name, value] of Object.entries(constants)) {
    latex = latex.replaceAll(name, value);
  }

  // switch to SI units
  for (const [unitToReplace, conversion] of Object.entries(extendedUnits)) {
    let newExpression = "";
    for (const [unit, power] of Object.entries(conversion)) {
      newExpression += `{\\operatorname{${unit}}}^{${power}}`;
    }
    latex = latex.replaceAll(`\\operatorname{${unitToReplace}}`, newExpression);
  }
  console.log(latex);
  return latex;
};

const compute = (latex) => {
  /* we should support
    +, -, *, \frac, ^, (, {, [, \left, .,

    maybe log, sin, cos, etc. later
  */
  try {
    return { answer: parse(preprocess(latex)) };
  } catch (e) {
    return { error: e };
  }
};

export default function Calculator() {
  const [latex, setLatex] = useState("");
  const [answer, setAnswer] = useState(null);
  const [error, setError] = useState(null);
  const [topMathField, setTopMathField] = useState(null);

  const keyboardShortcuts = (e) => {
    if (e.metaKey && e.key === "Backspace") {
      setLatex("");
    } else if (e.metaKey && e.key === "ArrowLeft") {
      topMathField.moveToLeftEnd();
    } else if (e.metaKey && e.key === "ArrowRight") {
      topMathField.moveToRightEnd();
    }
  };

  return (
    <Container maxWidth="s" style={{ width: "100%" }}>
      <EditableMathField
        latex={latex}
        mathquillDidMount={(mathField) => {
          mathField.focus();
          setTopMathField(mathField);
        }}
        onKeyDown={(e) => keyboardShortcuts(e)}
        onChange={(mathField) => {
          let latexExpression = mathField.latex();
          setLatex(latexExpression);
          let computation = compute(latexExpression);
          if ("error" in computation) {
            setError(computation.error);
          } else {
            setAnswer(computation.answer);
            setError(null);
          }
        }}
        config={{
          autoCommands: "pi epsilon",
          autoOperatorNames: units.join(" "),
        }}
        style={{
          fontSize: "20px",
          paddingTop: "20px",
          paddingBottom: "20px",
          paddingLeft: "20px",
          // paddingRight: "20px",
          width: "calc(100% - 20px)",
        }}
      />
      <div style={{ paddingTop: "10px", textAlign: "right" }}>
        {error ? (
          <Error error={error.message} />
        ) : answer ? (
          <Answer answer={answer} />
        ) : (
          ""
        )}
      </div>
    </Container>
  );
}

const Answer = ({ answer }) => {
  let unitsNumerator = "",
    unitsDenominator = "";
  for (let [unit, power] of Object.entries(answer.units)) {
    unit = `\\operatorname{${unit}}`;
    if (power > 1) {
      unitsNumerator += `{${unit}}^{${power}}`;
    }
    if (power === 1) {
      unitsNumerator += unit;
    }
    if (power < -1) {
      unitsDenominator += `{${unit}}^{${-power}}`;
    }
    if (power === -1) {
      unitsDenominator += unit;
    }
  }

  let unitsStr = "";
  if (unitsNumerator && unitsDenominator) {
    unitsStr = `\\frac{${unitsNumerator}}{${unitsDenominator}}`;
  } else if (unitsNumerator) unitsStr = unitsNumerator;
  else if (unitsDenominator) unitsStr = `\\frac{1}{${unitsDenominator}}`;

  return (
    <AnswerSpan>
      <TeX math={"= " + toScientificNotation(answer.number) + " " + unitsStr} />
    </AnswerSpan>
  );
};

const toScientificNotation = (num) => {
  const [coeff, exp] = num
    .toExponential()
    .split("e")
    .map((item) => Number(item));

  const roundedCoeff = Math.round(coeff * 1e4) / 1e4; // 4 decimal points
  return `${roundedCoeff}` + (exp === 0 ? "" : `\\times 10^{${exp}}`);
};

const AnswerSpan = styled.span`
  // color: gray;
  font-size: 16spx;
`;

const Error = (error) => <ErrorSpan>Error</ErrorSpan>;

const ErrorSpan = styled.span`
  border-radius: 10px;
  color: rgb(95, 33, 32);
  background-color: rgb(250, 238, 237);
  padding: 5px 10px;
`;

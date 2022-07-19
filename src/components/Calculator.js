/*
TODOs:
- render with katex
- support more units
- simplfy units
- publish to the web 

*/

import React, { createRef, useState } from "react";
import styled from "@emotion/styled";
import "./Calculator.css";
// import EditableMathField from "./EditableMathField";
import "../../node_modules/@edtr-io/mathquill/build/mathquill.css";
import { EditableMathField } from "react-mathquill";
// import { parse } from "@unified-latex/unified-latex-util-parse";
import { parse } from "./parser";
import { Container } from "@mui/material";

const getSupportedUnits = () => {
  const baseUnits = ["s", "m", "kg", "A", "mol", "cd"];

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
  const siPrefixes = [
    "y",
    "z",
    "a",
    "f",
    "p",
    "n",
    "m",
    "c",
    "d",
    "da",
    "h",
    "k",
    "M",
    "G",
    "T",
    "P",
    "E",
    "Z",
    "Y",
  ];
  // for (const prefix of siPrefixes) {
  //   for (const unit of units) {
  //     units.push(prefix + unit);
  //   }
  // }
  return { units, extendedUnits };
};

const { units, extendedUnits } = getSupportedUnits();

const preprocess = (latex) => {
  for (const [unitToReplace, conversion] of Object.entries(extendedUnits)) {
    const newExpression = "";
    for (const [unit, power] of Object.entries(conversion)) {
      newExpression += `\\operatorname{${unit}}^{${power}}`;
    }
    latex = latex.replace(`\\operatorname{${unitToReplace}}`, newExpression);
  }
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
    } else if (e.metaKey && e.key == "ArrowLeft") {
      topMathField.moveToLeftEnd();
    } else if (e.metaKey && e.key == "ArrowRight") {
      topMathField.moveToRightEnd();
    }
  };

  return (
    <Container maxWidth="xs" style={{ width: "100%", textAlign: "center" }}>
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
        style={{ fontSize: "32px" }}
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
  for (const [unit, power] of Object.entries(answer.units)) {
    if (power > 1) {
      unitsNumerator += `${unit}^${power} `;
    }
    if (power == 1) {
      unitsNumerator += unit + " ";
    }
    if (power < -1) {
      unitsDenominator += `${unit}^${-power} `;
    }
    if (power == -1) {
      unitsDenominator += unit + " ";
    }
  }

  let unitsStr = "";
  if (unitsNumerator && unitsDenominator) {
    unitsStr = `${unitsNumerator} / ${unitsDenominator}`;
  } else if (unitsNumerator) unitsStr = unitsNumerator;
  else if (unitsDenominator) unitsStr = `/ ${unitsDenominator}`;

  return (
    <AnswerSpan>
      {answer.number} {unitsStr}
    </AnswerSpan>
  );
};
const AnswerSpan = styled.span`
  color: gray;
  font-size: 20px;
`;

const Error = (error) => <ErrorSpan>Error</ErrorSpan>;

const ErrorSpan = styled.span`
  border-radius: 10px;
  color: rgb(95, 33, 32);
  background-color: rgb(250, 238, 237);
  padding: 5px 10px;
`;

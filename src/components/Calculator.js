import React, { createRef, useState } from "react";
import styled from "@emotion/styled";
import "./Calculator.css";
// import EditableMathField from "./EditableMathField";
import "../../node_modules/@edtr-io/mathquill/build/mathquill.css";
import { EditableMathField } from "react-mathquill";
// import { parse } from "@unified-latex/unified-latex-util-parse";
import { parse } from "./parser";
import { Container } from "@mui/material";

const compute = (latex) => {
  /* we should support
    +, -, *, \frac, ^, (, {, [, \left, .,

    maybe log, sin, cos, etc. later
  */
  try {
    return { answer: parse(latex) };
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
          autoOperatorNames: "kg km ms",
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
  return <AnswerSpan>{answer}</AnswerSpan>;
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

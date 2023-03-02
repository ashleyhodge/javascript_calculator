import { useReducer } from "react";
import DigitBtn from "./DigitBtn";
import OperationBtn from "./OperationBtn";

export const ACTIONS = {
  ADD_DIGIT: "add_digit",
  CHOOSE_OPERATION: "choose_operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete_digit",
  EVALUATE: "evaluate"
}

function reducer(state, { type, payload }) {
  switch(type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        }
      }
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state
      }
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state
      }

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      }
    case ACTIONS.CLEAR:
      return {}

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state
      }
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null
        }
      }
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation
        }
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand:null
      }
      
    case ACTIONS.EVALUATE:
      if (state.previousOperand == null || state.operation == null || state.currentOperand == null) {
        return state
      }
      console.log(evaluate(state))
      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state)
        
      }
      
    default:
      return
  }
}

function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return "";
  let computation = ""
  switch (operation) {
    case "+":
      computation = prev + current
      break;
    case "-":
      computation = prev - current
      break;
    case "x":
      computation = prev * current
      break;
    case "÷":
      computation = prev/current
      break;
    default:
      return
  }
  return computation.toString()
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {})

  return (
    
    <div className="calc-grid">
      <div className='output grid'>
        {/* output */}
        <div className='text-[#e923f4] text-[30px]'>
          {previousOperand} {operation}
        </div>
        <div className='text-[#e923f4] text-[30px]'>
          {currentOperand}
        </div>
      </div>
      <div onClick={() => dispatch({ type: ACTIONS.CLEAR})} className='button-container group col-span-2'>
        <div className='glow bg-[#ff901b]'></div>
        <div className='button-div'>
          <button>AC</button>
        </div>
      </div>
      <div className='button-container group'>
        <div className='glow bg-[#ff901b]'></div>
        <div className='button-div'>
          <button>DEL</button>
        </div>
      </div>
      <OperationBtn operation='÷' dispatch={dispatch} />
      <DigitBtn digit='7' dispatch={dispatch} />
      <DigitBtn digit='8' dispatch={dispatch} />
      <DigitBtn digit='9' dispatch={dispatch} />
      <OperationBtn operation='x' dispatch={dispatch} />
      <DigitBtn digit='4' dispatch={dispatch} />
      <DigitBtn digit='5' dispatch={dispatch} />
      <DigitBtn digit='6' dispatch={dispatch} />
      <OperationBtn operation='-' dispatch={dispatch} />
      <DigitBtn digit='1' dispatch={dispatch} />
      <DigitBtn digit='2' dispatch={dispatch} />
      <DigitBtn digit='3' dispatch={dispatch} />
      <OperationBtn operation='+' dispatch={dispatch} />
      <DigitBtn digit='0' dispatch={dispatch} />
      <DigitBtn digit='.' dispatch={dispatch} />
      <div onClick={() => dispatch({ type: ACTIONS.EVALUATE })} className='button-container group'>
        <div className='glow bg-[#fde802]'></div>
        <div className='button-div'>
          <button>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;

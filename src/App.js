import { useReducer } from "react";
import DigitBtn from "./DigitBtn";
import OperationBtn from "./OperationBtn";

// define actions
export const ACTIONS = {
  ADD_DIGIT: "add_digit",
  CHOOSE_OPERATION: "choose_operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete_digit",
  EVALUATE: "evaluate"
}

// useReducer to manage state and define edge cases
function reducer(state, { type, payload }) {
  switch(type) {
    case ACTIONS.ADD_DIGIT:
      // if overwrite is true, only return the digits from the current payload and set overwrite back to false
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        }
      }
      // if the digit is already 0 and the currentOperand is 0 then do nothing 
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state
      }
      // if there is already a decimal and you try to add another decimal do nothing
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state
      }
      // otherwise add the new digit to the end of the already existing currentOperand
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      }
    // clear all 
    case ACTIONS.CLEAR:
      return {}

    case ACTIONS.CHOOSE_OPERATION:
      // if there is no current and previous operand do nothing 
      if (state.currentOperand == null && state.previousOperand == null) {
        return state
      }
      // if there is no previous operand, set prev to current, set current to null, set operation to selected operation
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null
        }
      }
      // if there is no current operand, allow for operation change 
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation
        }
      }
      // otherwise set previousOperand to the evaluated state and set the operation to the one currently selected
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        // return currentOperand to null
        currentOperand: null
      }
      
    case ACTIONS.EVALUATE:
      // if any state object is missing do nothing
      if (state.previousOperand == null || state.operation == null || state.currentOperand == null) {
        return state
      }
      // otherwise evaluate the current state, set prev and opp to null
      return {
        ...state,
        // set overwrite to true in order to clear evaluation and add new digits to currentOperand
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state)
        
      }
      
    case ACTIONS.DELETE_DIGIT:
      // if overwrite is still true, set to false and set currentOperand to false
      if(state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand:null
        }
      }
      // if current operand is null when trying to delete, do nothing
      if (state.currentOperand == null) {
        return state
      }
      // if the currentOperand has only one digit, return currentOperand to null
      if (state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: null
        }
      }
      // otherwise set currentOperand to the state minus the last digit added
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      }
    default:
      return
  }
}

// Evaluation
function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  // if either prev or current is not a number return an empty string
  if (isNaN(prev) || isNaN(current)) return "";

  let computation = ""
  // operations
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

// format numbers to add commas to larger numbers
const FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0
})
function format(operand) {
  if (operand == null) return
  const [integer, decimal] = operand.split(".") 
  if (decimal == null) {
    return FORMATTER.format(integer)
  }
  return `${FORMATTER.format(integer)}.${decimal}`
}


function App() {

  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {})

  return (
    <div className="calc-grid">
      <div className='output grid'>
        {/* output */}
        <div className='text-[#e923f4] text-[30px]'>
          {format(previousOperand)} {operation}
        </div>
        <div className='text-[#e923f4] text-[30px]'>
          {format(currentOperand)}
        </div>
      </div>
      <div onClick={() => dispatch({ type: ACTIONS.CLEAR })} className='button-container group col-span-2'>
        <div className='glow bg-[#ff901b]'></div>
        <div className='button-div'>
          <button>AC</button>
        </div>
      </div>
      <div onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })} className='button-container group '>
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

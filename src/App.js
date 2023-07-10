import React from 'react';
import './App.css';
import  NumButton  from './numButton.js'
import { useReducer } from 'react'; 
import OperationButton from './operation';


export const ACTIONS = {
  ADD_DIGIT : 'add-digit',
  CHOOSE_OPERATION : 'choose-operation',
  CLEAR : 'clear',
  DELETE_DIGIT : 'delete-digit',
  EVALUATION : 'evaluation',
}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (payload.digit === "0" && state.currentOperand === "0") return state
      if (payload.digit === "." && state.currentOperand.includes(".")) return state
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        }
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || "" }${payload.digit}`,
      }
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) { return state }
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        }
      }
      if (state.previousOperand == null) return {
        ...state, 
        operation : payload.operation,
        previousOperand: state.currentOperand,
        currentOperand: null
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        operation : payload.operation,
        currentOperand: null, 
      }
    case ACTIONS.CLEAR:
      return {

      }
    case ACTIONS.EVALUATION: 
    if (state.operation == null || state.currentOperand == null || state.previousOperand == null ) {
      return state
    }
    return {
      ...state,
      overwrite: true,
      previousOperand: null,
      operation: null,
      currentOperand: evaluate(state)
    }
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) return{
        ...state,
        currentOperand: null,
        overwrite: false
      }
      if (state.currentOperand == null) return state
      if (state.currentOperand.length === 1) return {
        ...state,
        currentOperand: null
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      }

      
  }

} 
function evaluate({currentOperand, previousOperand, operation}) {
  const prev = parseFloat(previousOperand)
  const curr = parseFloat(currentOperand)
  if (isNaN(prev) || isNaN(curr)) return ""
  let computation = ""

  switch (operation) {
    case "+":
      computation = prev + curr 
      break
      case "-":
        computation = prev - curr 
        break
        case "*":
          computation = prev * curr 
          break
          case "÷":
            computation = prev / curr 
            break
        
  }
  return computation.toString()
}
const INTEGER_FORMATTER= new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})
function formatOperand(operand) {
  if (operand == null) return 
  const [integer, decimal] = operand.split('.')
  if (decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function App() {
  const initialState = {
    currentOperand: '',
    previousOperand: '',
    operation: '',
  };
  const [{ currentOperand, previousOperand, operation}, dispatch] =useReducer(reducer, initialState)

 
  return (
    <div className="calculatorApp">
    <div className='display'>
      <div className='topDisplay'>{formatOperand(previousOperand)} {operation}</div>
      <div className='downDisplay'>{formatOperand(currentOperand)}</div>
    </div>
    <button onClick= {() => dispatch( {type:ACTIONS.CLEAR} )} className='bigButton'>AC</button>
    <button onClick= {() => dispatch( {type:ACTIONS.DELETE_DIGIT} )}>Del</button>
    <OperationButton operation="÷" dispatch = {dispatch} />
    <NumButton digit="1" dispatch = {dispatch} />
    <NumButton digit= '2' dispatch = {dispatch} />
    <NumButton digit= '3' dispatch = {dispatch} />
    <OperationButton operation="*" dispatch = {dispatch} />
    <NumButton digit= '4' dispatch = {dispatch} />
    <NumButton digit= '5' dispatch = {dispatch} />
    <NumButton digit= '6' dispatch = {dispatch} />
    <OperationButton operation="+" dispatch = {dispatch} />
    <NumButton digit= '7' dispatch = {dispatch} />
    <NumButton digit= '8' dispatch = {dispatch} />
    <NumButton digit= '9' dispatch = {dispatch} />
    <OperationButton operation="-" dispatch = {dispatch} />
    <NumButton digit= '0' dispatch = {dispatch} />
    <NumButton digit= '.' dispatch = {dispatch} />

    <button onClick= {() => dispatch( {type:ACTIONS.EVALUATION} )} className='bigButton'>=</button>
      
    </div>
  );
}

export default App;

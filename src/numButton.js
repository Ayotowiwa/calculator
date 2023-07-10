
import { ACTIONS } from "./App.js"

export default function NumButton({ dispatch, digit }) {
    return <button
     onClick={() =>  dispatch ( {type: ACTIONS.ADD_DIGIT, payload:{ digit }})  }>{digit}</button>
}


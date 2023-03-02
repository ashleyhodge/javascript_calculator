import { ACTIONS } from "./App"

function DigitBtn({ dispatch, digit }) {
  
  return (
    <div onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })} className='button-container group'>
    <div className='glow bg-[#07f985]'></div>
    <div className='button-div'>
      <button>{digit}</button>
    </div>
  </div>
  )
}

export default DigitBtn;
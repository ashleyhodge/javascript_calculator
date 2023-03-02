import { ACTIONS } from "./App"

function OperationBtn({ dispatch, operation }) {
  
  return (
    <div onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })} className='button-container group'>
    <div className='glow bg-[#fde802]'></div>
    <div className='button-div'>
      <button>{operation}</button>
    </div>
  </div>
  )
}

export default OperationBtn;
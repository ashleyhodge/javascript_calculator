import { useReducer } from 'react';


const ACTIONS = {
  ADD_NUMBER: 'add-number',
  CHOOSE_OPERATION:'choose-operation',
  CLEAR: 'clear',
  DELETE_NUMBER: 'delete-number',
  EVALUATE: 'evaluate'
}

// function reducer(state, { type, payload }) {

//   }
// }

function App() {
  
  const [state, dispatch] = useReducer()

  return (
    
    <div className="calc-grid">
      <div className='output grid'>
        {/* Output Values */}
        <div className='text-[#53644f] text-[26px]'>
          
        </div>
        <div className='text-[#e923f4] text-[30px]'>
    
        </div>
      </div>
      <div className='button-container group col-span-2'>
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
      <div className='button-container group'>
        <div className='glow bg-[#fde802]'></div>
        <div className='button-div'>
          <button>÷</button>
        </div>
      </div>
      <div className='button-container group'>
        <div className='glow bg-[#07f985]'></div>
        <div className='button-div'>
          <button>7</button>
        </div>
      </div>
      <div className='button-container group'>
        <div className='glow bg-[#07f985]'></div>
        <div className='button-div'>
          <button>8</button>
        </div>
      </div>
      <div className='button-container group'>
        <div className='glow bg-[#07f985]'></div>
        <div className='button-div'>
          <button>9</button>
        </div>
      </div>
      <div className='button-container group'>
        <div className='glow bg-[#fde802]'></div>
        <div className='button-div'>
          <button>x</button>
        </div>
      </div>
      <div className='button-container group'>
        <div className='glow bg-[#07f985]'></div>
        <div className='button-div'>
          <button>4</button>
        </div>
      </div>
      <div className='button-container group'>
        <div className='glow bg-[#07f985]'></div>
        <div className='button-div'>
          <button>5</button>
        </div>
      </div>
      <div className='button-container group'>
        <div className='glow bg-[#07f985]'></div>
        <div className='button-div'>
          <button>6</button>
        </div>
      </div>
      <div className='button-container group'>
        <div className='glow bg-[#fde802]'></div>
        <div className='button-div'>
          <button>-</button>
        </div>
      </div>
      <div className='button-container group'>
        <div className='glow bg-[#07f985]'></div>
        <div className='button-div'>
          <button>1</button>
        </div>
      </div>
      <div className='button-container group'>
        <div className='glow bg-[#07f985]'></div>
        <div className='button-div'>
          <button>2</button>
        </div>
      </div>
      <div className='button-container group'>
        <div className='glow bg-[#07f985]'></div>
        <div className='button-div'>
          <button>3</button>
        </div>
      </div>
      <div className='button-container group'>
        <div className='glow bg-[#fde802]'></div>
        <div className='button-div'>
          <button>+</button>
        </div>
      </div>
      <div className='button-container group'>
        <div className='glow bg-[#07f985]'></div>
        <div className='button-div'>
          <button>0</button>
        </div>
      </div>
      <div className='button-container group'>
        <div className='glow bg-[#07f985]'></div>
        <div className='button-div'>
          <button>.</button>
        </div>
      </div>
      <div className='button-container group col-span-2'>
        <div className='glow bg-[#fde802]'></div>
        <div className='button-div'>
          <button>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;

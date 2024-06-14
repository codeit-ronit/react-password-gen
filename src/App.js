
import './App.css';
import { useCallback, useState, useEffect, useRef } from 'react';

function App() {
  const [length,setLength]=useState(8)
  const [numberAllowed , setNumberAllowed] = useState(false)
  const [charAllowed , setCharAllowed] = useState(false)
  const [password , setPassword] = useState("")

  //useRef hook
  const passwordref = useRef(null);

  const copypasstoclipboard = useCallback(()=>{
    passwordref.current.select();
    window.navigator.clipboard.writeText(password);
  },[password])
  const passwordGenerator = useCallback(()=>{
    let pass="";
    let str="qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
    if (numberAllowed) str+="1234567890";
    if(charAllowed) str+="~!@#$%^&*()_+/?";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)   //gives random index from the str
      pass += str.charAt(char)
      
    }

    setPassword(pass);
  },[length,numberAllowed,charAllowed,setPassword]);

  useEffect(()=>{passwordGenerator()},[length,numberAllowed,charAllowed,passwordGenerator])
    return (
    <>
    
    <div className='w-full max-w-md mx-auto shadow-md bg-gray-700 rounded-xl px-4 py-3 my-8 text-orange-600' >
      <h1 className='text-center my-3'>Password Generator</h1>

      <div className='flex shadow rounded-lg mb-4'>
        <input
        className='w-full rounded-lg outline-none py-1 px-3 ' 
        type='text'
        value={password}
        placeholder='Password'
        ref={passwordref}
        readOnly/>
        <button onClick={()=>{copypasstoclipboard()}} className='text-white bg-blue-700 px-2 rounded-lg outline-none shrink-0'>copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex gap-x-1 items-center'>
          <input
          type='range'
          min={6}
          max={15}
          value={length}
          className='cursor-pointer'
         
          onChange={(e)=>{setLength(e.target.value)}}/>
          <label>Length:{length}</label>
        
        </div>
        <div className='flex items-center gap-x-1'>
          <input
          type='checkbox'
          defaultChecked={numberAllowed}
          onChange={()=>{setNumberAllowed((prev)=> !prev);
          }}/>
          <label>Numbers</label>

          <input
          type='checkbox'
          defaultChecked={charAllowed}
          onChange={()=>{setCharAllowed((prev)=> !prev);
          }}/>
          <label>Characters</label>

        </div>

      </div>
  </div>
    </>
  );
}

export default App;

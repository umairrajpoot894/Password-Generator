import React, { useCallback, useEffect, useRef, useState } from 'react';
 import './index.css';
 const App = () => {
  const passwordRef = useRef(null);
  const [password, setPassword] = useState(''); // Set your password generation logic
  const [length, setLength] = useState(6);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(true);

  const copyPasswordToClipboard =useCallback ( () => {
    if (passwordRef.current) {
      passwordRef.current.select();
      document.execCommand('copy');
    }
   }
   , [passwordRef]
   )
   const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()-_+={}[]|";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword])

  useEffect(() => {
    passwordGenerator();
  },[length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <div className="flex items-start justify-center  bg-gray-900">
      <div className="w-full max-w-md rounded-lg px-4 bg-gray-800 text-orange-500">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex  rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            placeholder="Password"
            readOnly
            className="outline-none w-full  py-1 px-3 bg-gray-700 text-white"
            value={password}
            ref={passwordRef}
          />
          <button
            className="outline-none bg-blue-700 text-teal-50 px-3 py-1 shrink-0"
            onClick={copyPasswordToClipboard}
          >
            Copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              className="cursor-pointer"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
            />
            <label htmlFor="length">{length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              id="numberInput"
              checked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="numberInput">Number</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              id="characterInput"
              checked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label htmlFor="characterInput">Character</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
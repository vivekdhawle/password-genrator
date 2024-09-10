import { useEffect, useState ,useCallback, useRef} from 'react'
 
import './App.css'

function App() {
  const [len,setlen]=useState(8);
  const [characterallow,setcharcter]=useState(false);
  const [numberallow,setnum]=useState(false);
  const [pass,setpass]=useState("");
  const passref=useRef(null)

  const passwordgerator=useCallback(()=>{
    let password="";
    let arr="abcdefghijklmnopqrstuvwxyz";
    if(numberallow){
      arr+="0123456789";
    }
    if(characterallow){
      arr+="~!@#$%^&*(){}:<>?";
    }

    for(let i=1;i<=len;i++){
      let ind=Math.floor(Math.random()*arr.length+1);
      password+=arr.charAt(ind);
    }
    setpass(password)
  },[len,numberallow,characterallow,setpass]);


  const copytoclipboard=useCallback(()=>{
    passref.current?.select()
      window.navigator.clipboard.writeText(pass)
  },[pass])

  useEffect(()=>{passwordgerator()},[numberallow,characterallow,length,passwordgerator]);

  return (

    <div className='bg-slate-600 w-full h-screen grid box-border'>
      <div className="bg-slate-400 w-1/3 h-2/1 self-center justify-self-center rounded-xl flex flex-col box-border">
      <h1 className='text-center font-bold text-3xl mt-4'>Password Genrator</h1>
      <div  className='m-6 flex flex-row items-center'>
        <input type="text" 
        placeholder='genrating...'
        readOnly
        value={pass}
        className='h-10 w-80 p-3 rounded-l-xl'
        ref={passref}
        
       
        />
        <button className='text-xl text-gray-300 bg-slate-600 h-10 w-20 rounded-r-xl'
        onClick={copytoclipboard}
        >copy</button>

      </div>

      <div className='m-3 items-center flex flex-row font-bold box-border'>
        <input type="range" 
        max={100}
        min={8}
        
        onChange={(e)=>{setlen(e.target.value)}}
        value={len}
        className='mr-5 active:colo'
        />
        <label >lenght:{len}</label>

        <input type="checkbox" 
        
        value={numberallow}
        className='ml-5 h-5 w-5 mr-2'
        onChange={()=>{setnum((prev)=>!prev)}}
        />
        <label >number</label>
        <input type="checkbox" 
        
        value={characterallow}
        className='ml-5 h-5 w-5 mr-2  '
        onChange={()=>{setcharcter((prev)=>!prev)}}
        />
        <label >charcter</label>

      </div>
      
      </div>
    </div>
      

  
  )
}

export default App

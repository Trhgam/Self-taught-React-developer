import { useState } from "react"
import "./Counter.scss"
function Counter(){
    const [count , setCount] = useState(0)
    return(
        <>
        <p className="pTitle">Click the button <span className="spantitle">now</span> </p>
        <button onClick={() => {
            setCount(count + 1)
        }}> {count}</button>
        </>
    )
}

export default Counter;
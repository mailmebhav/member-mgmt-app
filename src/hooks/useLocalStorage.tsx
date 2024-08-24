import { useState } from "react"

const useLocalStorage = (key: string): Array<any> => {
  const [state, setState] = useState(() => {
    // Initialize the state
    if(typeof window !== "undefined")
      {
        try
        {
            const value = window.sessionStorage.getItem(key)
            return value ? JSON.parse(value) : null 
        }
        catch(error)
        {
           console.log(error)
           return null
        }
      }
      return null
  })

  const setValue = (value: string | Function) => {
    if(typeof window !== "undefined")
    {
        try{
          const valueToStore = value instanceof Function ? value(state) : value
          window.sessionStorage.setItem(key,JSON.stringify(valueToStore))
          setState(value)
        }
        catch(error)
        {
          console.log(error)
          setState(null)
        }
    }
    else
    {
      setState(null)
    }
  }

  return [state, setValue]
}

export default useLocalStorage

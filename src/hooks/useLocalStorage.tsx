import { useState } from "react"

const useLocalStorage = (key: string): Array<any> => {
  const [state, setState] = useState(() => {
    // Initialize the state
    try {
      if(window)
        {
          const value = localStorage.getItem(key)
          // Check if the local storage already has any values,
          // otherwise initialize it with the passed initialValue
          return value ? JSON.parse(value) : null
        }
        else
        {
          return null
        }
     
    } catch (error) {
      console.log(error)
    }
  })

  const setValue = (value: string | Function) => {
    try {
      if(window)
        {
 // If the passed value is a callback function,
      //  then call it with the existing state.
      const valueToStore = value instanceof Function ? value(state) : value
      localStorage.setItem(key, JSON.stringify(valueToStore))
      setState(value)
        }
     else
     {
      setState(null)
     }
    } catch (error) {
      console.log(error)
    }
  }

  return [state, setValue]
}

export default useLocalStorage

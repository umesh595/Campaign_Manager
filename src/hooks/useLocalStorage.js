import { useState } from 'react'

function useLocalStorage(key,initialValue){
  const [value,setValue]=useState(()=>{
    const saved=localStorage.getItem(key)
    return saved?JSON.parse(saved):initialValue
  })
  function updateValue(nextValue){
    const data=typeof nextValue==='function'?nextValue(value):nextValue
    setValue(data)
    localStorage.setItem(key,JSON.stringify(data))
  }
  return [value,updateValue]
}
export default useLocalStorage

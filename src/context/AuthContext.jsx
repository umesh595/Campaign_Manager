import { createContext, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { starterUsers } from '../data/userData'

const AuthContext=createContext()

export function AuthProvider({children}){
  const [users,setUsers]=useLocalStorage('adtech_users_v3',starterUsers)
  const [currentUser,setCurrentUser]=useLocalStorage('adtech_session_v3',null)
  function signup(form){
    const exists=users.some(user=>user.email.toLowerCase()===form.email.toLowerCase())
    if(exists)return {ok:false,message:'Email already registered'}
    const newUser={id:Date.now(),name:form.name,email:form.email,password:form.password,role:'User'}
    setUsers([...users,newUser])
    setCurrentUser({id:newUser.id,name:newUser.name,email:newUser.email,role:'User'})
    return {ok:true}
  }
  function login(email,password){
    const found=users.find(user=>user.email.toLowerCase()===email.toLowerCase()&&user.password===password)
    if(!found)return {ok:false,message:'Invalid email or password'}
    const fixedUser=starterUsers.find(user=>user.email.toLowerCase()===found.email.toLowerCase())
    const role=fixedUser?fixedUser.role:'User'
    setCurrentUser({id:found.id,name:found.name,email:found.email,role})
    return {ok:true}
  }
  function logout(){
    setCurrentUser(null)
  }
  return <AuthContext.Provider value={{users,currentUser,signup,login,logout}}>{children}</AuthContext.Provider>
}
export function useAuth(){
  return useContext(AuthContext)
}

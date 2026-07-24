import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

function Signup(){
  const {signup,currentUser}=useAuth()
  const navigate=useNavigate()
  const [form,setForm]=useState({name:'',email:'',password:''})
  const [error,setError]=useState('')
  if(currentUser)return <Navigate to="/" replace />
  function change(e){
    setForm({...form,[e.target.name]:e.target.value})
  }
  function submit(e){
    e.preventDefault()
    if(!form.name||!form.email||!form.password){
      setError('Please fill all fields')
      return
    }
    if(form.password.length<6){
      setError('Password should be at least 6 characters')
      return
    }
    const result=signup(form)
    if(!result.ok)setError(result.message)
    else navigate('/')
  }
  return (
    <section className="auth-page">
      <h1 className="auth-title">AdTech Campaign Manager</h1>
      <div className="auth-card">
        <form className="auth-form" onSubmit={submit}>
          <h2>Create Account</h2>
          <label>Name<input name="name" value={form.name} onChange={change} /></label>
          <label>Email<input type="email" name="email" value={form.email} onChange={change} /></label>
          <label>Password<input type="password" name="password" value={form.password} onChange={change} /></label>
          {error&&<p className="error">{error}</p>}
          <button>Create Account</button>
          <p className="form-link">Already have account? <Link to="/login">Login</Link></p>
        </form>
      </div>
    </section>
  )
}
export default Signup

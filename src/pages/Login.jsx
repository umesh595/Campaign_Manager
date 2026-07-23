import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

function Login(){
  const {login,currentUser}=useAuth()
  const navigate=useNavigate()
  const [form,setForm]=useState({email:'admin@test.com',password:'admin123'})
  const [error,setError]=useState('')
  if(currentUser)return <Navigate to="/" replace />
  function change(e){
    setForm({...form,[e.target.name]:e.target.value})
  }
  function submit(e){
    e.preventDefault()
    if(!form.email||!form.password){
      setError('Email and password are required')
      return
    }
    const result=login(form.email,form.password)
    if(!result.ok)setError(result.message)
    else navigate('/')
  }
  return (
    <section className="auth-page">
      <h1 className="auth-title">AdTech Campaign Manager</h1>
      <div className="auth-card">
        <form className="auth-form" onSubmit={submit}>
          <h2>Login</h2>
          <label>Email<input type="email" name="email" value={form.email} onChange={change} /></label>
          <label>Password<input type="password" name="password" value={form.password} onChange={change} /></label>
          {error&&<p className="error">{error}</p>}
          <button>Login</button>
          <p className="form-link">New user? <Link to="/signup">Create account</Link></p>
        </form>
      </div>
    </section>
  )
}
export default Login

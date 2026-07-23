import { useEffect, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { canManageCampaigns } from '../utils/permissions'

function Layout(){
  const {currentUser,logout}=useAuth()
  const navigate=useNavigate()
  const [dark,setDark]=useState(localStorage.getItem('adtech_theme')==='dark')
  useEffect(()=>{
    document.body.classList.toggle('dark-mode',dark)
    localStorage.setItem('adtech_theme',dark?'dark':'light')
  },[dark])
  function handleLogout(){
    logout()
    navigate('/login')
  }
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-icon">AD</span>
          <div>
            <h2>AdTech Manager</h2>
            <p>Campaign workspace</p>
          </div>
        </div>
        <div className="role-strip">{currentUser.role}</div>
        <nav className="menu">
          <NavLink to="/" end><span>D</span>Dashboard</NavLink>
          <NavLink to="/campaigns" end><span>C</span>Campaigns</NavLink>
          {canManageCampaigns(currentUser.role)&&<NavLink to="/campaigns/new" end><span>+</span>Create Campaign</NavLink>}
        </nav>
        <div className="profile-box">
          <b>{currentUser.name}</b>
          <span>{currentUser.email}</span>
          <small>{currentUser.role}</small>
          <div className="bottom-actions">
            <button onClick={handleLogout}>Logout</button>
            <button className="theme-btn" onClick={()=>setDark(!dark)}>{dark?'Light':'Dark'}</button>
          </div>
        </div>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  )
}
export default Layout

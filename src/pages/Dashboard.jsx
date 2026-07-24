import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import PageTitle from '../components/PageTitle'
import StatCard from '../components/StatCard'
import { useAuth } from '../context/AuthContext'
import useVisibleCampaigns from '../hooks/useVisibleCampaigns'
import { canManageCampaigns } from '../utils/permissions'

function Dashboard(){
  const {currentUser}=useAuth()
  const campaigns=useVisibleCampaigns()
  const [age,setAge]=useState('All')
  const active=campaigns.filter(campaign=>campaign.status==='Active')
  const paused=campaigns.filter(campaign=>campaign.status==='Paused')
  const totalBudget=campaigns.reduce((sum,campaign)=>sum+Number(campaign.budget),0)
  const topCampaigns=[...active].sort((a,b)=>b.budget-a.budget).slice(0,5)
  const filtered=active.filter(campaign=>age==='All'||campaign.audience===age)
  const platformData=filtered.reduce((list,campaign)=>{
    const found=list.find(item=>item.platform===campaign.platform)
    if(found)found.budget+=Number(campaign.budget)
    else list.push({platform:campaign.platform,budget:Number(campaign.budget)})
    return list
  },[])
  return (
    <section>
      <PageTitle tag="OVERVIEW" title="Analytics Dashboard" text={`${currentUser.role} dashboard`} action={canManageCampaigns(currentUser.role)&&<Link className="primary-btn" to="/campaigns/new">+ New Campaign</Link>} />
      <div className="stats-grid">
        <StatCard label="Total Campaigns" value={campaigns.length} sub="All created campaigns" />
        <StatCard label="Active Campaigns" value={active.length} sub={`${paused.length} currently paused`} />
        <StatCard label="Paused Campaigns" value={paused.length} sub="Currently stopped" />
        <StatCard label="Total Budget" value={`Rs ${totalBudget.toLocaleString()}`} sub="Allocated campaign spend" />
      </div>
      <div className="dashboard-grid">
        <div className="panel chart-panel">
          <div className="panel-head">
            <h2>Top Active Campaigns By Budget</h2>
            <span>Top 5</span>
          </div>
          <ResponsiveContainer width="100%" height={310}>
            <BarChart data={topCampaigns}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{fontSize:12}} />
              <YAxis tick={{fontSize:12}} />
              <Tooltip />
              <Bar dataKey="budget" fill="#2563eb" radius={[5,5,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="panel">
          <div className="panel-head">
            <h2>Active Budget by Platform</h2>
          </div>
          <div className="mini-filters">
            <label>Age<select value={age} onChange={e=>setAge(e.target.value)}><option>All</option><option>18-24</option><option>25-34</option><option>35+</option></select></label>
          </div>
          {platformData.length>0?
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={platformData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="platform" tick={{fontSize:12}} />
                <YAxis tick={{fontSize:12}} />
                <Tooltip />
                <Bar dataKey="budget" fill="#0f766e" radius={[5,5,0,0]} />
              </BarChart>
            </ResponsiveContainer>:
            <div className="empty-box">No budget data available for these filters.</div>
          }
        </div>
      </div>
    </section>
  )
}
export default Dashboard

import { Link } from 'react-router-dom'
import { useState } from 'react'
import PageTitle from '../components/PageTitle'
import { useAuth } from '../context/AuthContext'
import { useCampaigns } from '../context/CampaignContext'
import useVisibleCampaigns from '../hooks/useVisibleCampaigns'
import { canDeleteCampaigns, canManageCampaigns } from '../utils/permissions'

function CampaignList(){
  const {currentUser}=useAuth()
  const campaigns=useVisibleCampaigns()
  const {changeStatus,deleteCampaign,resetCampaigns}=useCampaigns()
  const [search,setSearch]=useState('')
  const [status,setStatus]=useState('All')
  const [age,setAge]=useState('All')
  const [platform,setPlatform]=useState('All')
  const [sort,setSort]=useState('Newest First')
  const canEdit=canManageCampaigns(currentUser.role)
  const canDelete=canDeleteCampaigns(currentUser.role)
  const platforms=[...new Set(campaigns.map(campaign=>campaign.platform))]
  const filteredCampaigns=campaigns.filter(campaign=>{
    const text=`${campaign.id} ${campaign.name} ${campaign.ownerName} ${campaign.platform}`.toLowerCase()
    const statusMatch=status==='All'||campaign.status===status
    const ageMatch=age==='All'||campaign.audience===age
    const platformMatch=platform==='All'||campaign.platform===platform
    return text.includes(search.toLowerCase())&&statusMatch&&ageMatch&&platformMatch
  }).sort((a,b)=>{
    if(sort==='Budget High')return b.budget-a.budget
    if(sort==='Budget Low')return a.budget-b.budget
    if(sort==='Name')return a.name.localeCompare(b.name)
    return b.id-a.id
  })
  function resetFilters(){
    setSearch('')
    setStatus('All')
    setAge('All')
    setPlatform('All')
    setSort('Newest First')
  }
  return (
    <section>
      <PageTitle tag="CAMPAIGNS" title="Campaign List" text={`${currentUser.role} access`} action={canEdit&&<Link className="primary-btn" to="/campaigns/new">+ Create</Link>} />
      <div className="filter-bar">
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by campaign name, owner or platform" />
        <select value={status} onChange={e=>setStatus(e.target.value)}>
          <option>All</option>
          <option>Active</option>
          <option>Paused</option>
        </select>
        <select value={age} onChange={e=>setAge(e.target.value)}><option value="All">All Ages</option><option>18-24</option><option>25-34</option><option>35+</option></select>
        <select value={platform} onChange={e=>setPlatform(e.target.value)}><option value="All">All Platforms</option>{platforms.map(item=><option key={item}>{item}</option>)}</select>
        <select value={sort} onChange={e=>setSort(e.target.value)}><option>Newest First</option><option>Budget High</option><option>Budget Low</option><option>Name</option></select>
        <button className="light-btn" onClick={resetFilters}>Reset Filters</button>
      </div>
      <div className="table-card">
        <div className="table-row table-head">
          <span>Banner</span><span>Name</span><span>Owner</span><span>Status</span><span>Platform</span><span>Audience</span><span>Budget</span><span>Actions</span>
        </div>
        {filteredCampaigns.map(campaign=>(
          <div className="table-row" key={campaign.id}>
            <img src={campaign.banner} alt={campaign.name} />
            <Link to={`/campaigns/${campaign.id}`} className="campaign-name">{campaign.name}</Link>
            <span>{campaign.ownerName}</span>
            <span className={`pill ${campaign.status.toLowerCase()}`}>{campaign.status}</span>
            <span>{campaign.platform}</span>
            <span>{campaign.audience}</span>
            <b>Rs {Number(campaign.budget).toLocaleString()}</b>
            <div className="action-buttons">
              <Link className="table-btn view-btn" to={`/campaigns/${campaign.id}`}>View</Link>
              {canEdit&&<Link className="table-btn edit-btn" to={`/campaigns/${campaign.id}/edit`}>Edit</Link>}
              {canEdit&&<button className="light-btn" onClick={()=>changeStatus(campaign.id)}>{campaign.status==='Active'?'Pause':'Resume'}</button>}
              {canDelete&&<button className="danger-btn" onClick={()=>deleteCampaign(campaign.id)}>Delete</button>}
            </div>
          </div>
        ))}
        {filteredCampaigns.length===0&&<div className="empty-row">No campaigns found</div>}
      </div>
      {canEdit&&<button className="reset-btn" onClick={resetCampaigns}>Generate mock data</button>}
    </section>
  )
}
export default CampaignList

import { Link, useNavigate, useParams } from 'react-router-dom'
import PageTitle from '../components/PageTitle'
import { useAuth } from '../context/AuthContext'
import { useCampaigns } from '../context/CampaignContext'
import useVisibleCampaigns from '../hooks/useVisibleCampaigns'
import { canDeleteCampaigns, canManageCampaigns } from '../utils/permissions'

function CampaignDetails(){
  const {id}=useParams()
  const navigate=useNavigate()
  const {currentUser}=useAuth()
  const campaigns=useVisibleCampaigns()
  const {changeStatus,deleteCampaign}=useCampaigns()
  const campaign=campaigns.find(item=>item.id===Number(id))
  function handleDelete(){
    deleteCampaign(campaign.id)
    navigate('/campaigns')
  }
  if(!campaign){
    return <section><PageTitle title="Campaign not found" text="The selected campaign is not available." /><Link to="/campaigns">Back to campaigns</Link></section>
  }
  return (
    <section>
      <PageTitle title={campaign.name} text="Single campaign tracking and details." />
      <div className="detail-card">
        <img src={campaign.banner} alt={campaign.name} />
        <div className="detail-info">
          <span className={`pill ${campaign.status.toLowerCase()}`}>{campaign.status}</span>
          <h2>{campaign.name}</h2>
          <p className="detail-description">{campaign.description}</p>
          <div className="detail-grid">
            <p><b>Platform</b><span>{campaign.platform}</span></p>
            <p><b>Campaign Owner</b><span>{campaign.ownerName}</span></p>
            <p><b>Target Audience</b><span>{campaign.audience}</span></p>
            <p><b>Total Budget</b><span>Rs {Number(campaign.budget).toLocaleString()}</span></p>
            <p><b>Created On</b><span>{campaign.createdAt}</span></p>
            <p><b>Created By</b><span>{campaign.createdBy}</span></p>
          </div>
          <div className="detail-actions">
            <Link className="light-btn link-btn" to="/campaigns">Back</Link>
            {canManageCampaigns(currentUser.role)&&<Link className="primary-btn link-btn" to={`/campaigns/${campaign.id}/edit`}>Edit</Link>}
            {canManageCampaigns(currentUser.role)&&<button className="light-btn" onClick={()=>changeStatus(campaign.id)}>{campaign.status==='Active'?'Pause':'Resume'}</button>}
            {canDeleteCampaigns(currentUser.role)&&<button className="danger-btn" onClick={handleDelete}>Delete</button>}
          </div>
        </div>
      </div>
    </section>
  )
}
export default CampaignDetails

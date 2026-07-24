import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PageTitle from '../components/PageTitle'
import { useAuth } from '../context/AuthContext'
import { useCampaigns } from '../context/CampaignContext'
import { bannerImages } from '../data/campaignData'

function EditCampaign(){
  const maxBudget=1000000
  const {id}=useParams()
  const navigate=useNavigate()
  const {users,currentUser}=useAuth()
  const {campaigns,updateCampaign}=useCampaigns()
  const campaign=campaigns.find(item=>item.id===Number(id))
  const [error,setError]=useState('')
  const [form,setForm]=useState(()=>{
    if(!campaign)return null
    return {
      name:campaign.name,
      description:campaign.description||'',
      platform:campaign.platform,
      audience:campaign.audience,
      budget:campaign.budget,
      banner:campaign.banner,
      ownerEmail:campaign.ownerEmail
    }
  })
  if(!campaign||!form){
    return <section><PageTitle title="Campaign not found" text="The selected campaign is not available." /><Link to="/campaigns">Back to campaigns</Link></section>
  }
  function change(e){
    setForm({...form,[e.target.name]:e.target.value})
  }
  function submit(e){
    e.preventDefault()
    if(!form.name.trim()||!form.description.trim()||!form.platform||!form.audience||!form.budget||Number(form.budget)<=0||Number(form.budget)>maxBudget||!form.banner||!form.ownerEmail){
      if(Number(form.budget)>maxBudget)setError('Budget cannot be more than Rs 10,00,000')
      else setError('Please enter campaign details, select owner, positive budget and banner')
      return
    }
    const owner=users.find(user=>user.email===form.ownerEmail)
    updateCampaign(id,{...form,budget:Number(form.budget),ownerName:owner.name,ownerEmail:owner.email,updatedBy:currentUser.name})
    navigate(`/campaigns/${id}`)
  }
  return (
    <section>
      <PageTitle title="Edit Campaign" text="Update campaign details saved in local storage." action={<Link className="light-btn link-btn" to={`/campaigns/${id}`}>Back</Link>} />
      <form className="campaign-form" onSubmit={submit}>
        <div className="form-grid">
          <label className="wide-field">Campaign Name<input maxLength="30" name="name" value={form.name} onChange={change} /><small>{form.name.length}/30 characters</small></label>
          <label className="wide-field">What is this campaign about?<textarea maxLength="500" name="description" value={form.description} onChange={change} /><small>{form.description.length}/500 characters</small></label>
          <label>Campaign Owner<select name="ownerEmail" value={form.ownerEmail} onChange={change}>{users.map(user=><option value={user.email} key={user.email}>{user.name} ({user.role})</option>)}</select></label>
          <label>Platform<select name="platform" value={form.platform} onChange={change}><option>Google Search</option><option>Facebook</option><option>Instagram</option><option>YouTube</option></select></label>
          <label>Age Group<select name="audience" value={form.audience} onChange={change}><option>18-24</option><option>25-34</option><option>35+</option></select></label>
          <label>Budget<input name="budget" type="number" min="1" max={maxBudget} value={form.budget} onChange={change} /></label>
        </div>
        <div className="banner-section">
          <h3>Picture Gallery</h3>
          <div className="banner-grid">
            {bannerImages.map(banner=>(
              <button type="button" className={form.banner===banner?'banner-choice selected':'banner-choice'} key={banner} onClick={()=>setForm({...form,banner})}>
                <img src={banner} alt="Campaign banner option" />
              </button>
            ))}
          </div>
        </div>
        {error&&<p className="error">{error}</p>}
        <div className="form-actions">
          <Link className="light-btn link-btn" to={`/campaigns/${id}`}>Cancel</Link>
          <button className="primary-btn">Save Changes</button>
        </div>
      </form>
    </section>
  )
}
export default EditCampaign

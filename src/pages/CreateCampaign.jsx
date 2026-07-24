import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageTitle from '../components/PageTitle'
import { bannerImages } from '../data/campaignData'
import { useAuth } from '../context/AuthContext'
import { useCampaigns } from '../context/CampaignContext'

function CreateCampaign(){
  const maxBudget=1000000
  const navigate=useNavigate()
  const {users,currentUser}=useAuth()
  const {addCampaign}=useCampaigns()
  const [form,setForm]=useState({name:'',description:'',platform:'',audience:'',budget:'',banner:'',ownerEmail:users[0]?.email||''})
  const [error,setError]=useState('')
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
    addCampaign({...form,budget:Number(form.budget),ownerName:owner.name,ownerEmail:owner.email,createdBy:currentUser.name})
    navigate('/campaigns')
  }
  return (
    <section>
      <PageTitle title="Create Campaign" text="Add campaign audience, budget and a selected banner asset." />
      <form className="campaign-form" onSubmit={submit}>
        <div className="form-grid">
          <label className="wide-field">Campaign Name<input maxLength="30" name="name" value={form.name} onChange={change} placeholder="Enter campaign name" /><small>{form.name.length}/30 characters</small></label>
          <label className="wide-field">What is this campaign about?<textarea maxLength="500" name="description" value={form.description} onChange={change} placeholder="Describe the campaign goal, message, product, or offer..." /><small>{form.description.length}/500 characters</small></label>
          <label>Campaign Owner<select name="ownerEmail" value={form.ownerEmail} onChange={change}>{users.map(user=><option value={user.email} key={user.email}>{user.name} ({user.role})</option>)}</select></label>
          <label>Platform<select name="platform" value={form.platform} onChange={change}><option value="">Select platform</option><option>Google Search</option><option>Facebook</option><option>Instagram</option><option>YouTube</option></select></label>
          <label>Age Group<select name="audience" value={form.audience} onChange={change}><option value="">Select age group</option><option>18-24</option><option>25-34</option><option>35+</option></select></label>
          <label>Budget<input name="budget" type="number" min="1" max={maxBudget} value={form.budget} onChange={change} placeholder="Max Rs 10,00,000" /></label>
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
          <button type="button" className="light-btn" onClick={()=>navigate('/campaigns')}>Cancel</button>
          <button className="primary-btn">Save Campaign</button>
        </div>
      </form>
    </section>
  )
}
export default CreateCampaign

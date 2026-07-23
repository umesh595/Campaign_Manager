import { useAuth } from '../context/AuthContext'
import { useCampaigns } from '../context/CampaignContext'

function useVisibleCampaigns(){
  const {currentUser}=useAuth()
  const {campaigns}=useCampaigns()
  if(!currentUser)return []
  if(currentUser.role==='User')return campaigns.filter(campaign=>campaign.ownerEmail===currentUser.email)
  return campaigns
}
export default useVisibleCampaigns

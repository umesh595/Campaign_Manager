import { useCampaigns } from '../context/CampaignContext'

function useVisibleCampaigns(){
  const {campaigns}=useCampaigns()
  return campaigns
}
export default useVisibleCampaigns

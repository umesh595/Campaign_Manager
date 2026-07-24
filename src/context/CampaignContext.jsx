import { createContext, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { createMockCampaigns, defaultCampaigns } from '../data/campaignData'

const CampaignContext=createContext()

export function CampaignProvider({children}){
  const [campaigns,setCampaigns]=useLocalStorage('adtech_campaigns_v6',defaultCampaigns)
  function getNextId(list=campaigns){
    const maxId=list.reduce((max,item)=>Number(item.id)>max?Number(item.id):max,0)
    return maxId+1
  }
  function addCampaign(campaign){
    setCampaigns([...campaigns,{...campaign,id:getNextId(),status:'Active',source:'manual',createdAt:new Date().toISOString().slice(0,10)}])
  }
  function changeStatus(id){
    setCampaigns(campaigns.map(item=>item.id===Number(id)?{...item,status:item.status==='Active'?'Paused':'Active'}:item))
  }
  function updateCampaign(id,newData){
    setCampaigns(campaigns.map(item=>item.id===Number(id)?{...item,...newData}:item))
  }
  function deleteCampaign(id){
    setCampaigns(campaigns.filter(item=>item.id!==Number(id)))
  }
  function resetCampaigns(){
    setCampaigns([...campaigns,...createMockCampaigns(getNextId())])
  }
  return <CampaignContext.Provider value={{campaigns,addCampaign,updateCampaign,changeStatus,deleteCampaign,resetCampaigns}}>{children}</CampaignContext.Provider>
}
export function useCampaigns(){
  return useContext(CampaignContext)
}

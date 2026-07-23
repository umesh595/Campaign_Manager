export function canManageCampaigns(role){
  return role==='Admin'||role==='Super Admin'
}
export function canDeleteCampaigns(role){
  return role==='Super Admin'
}

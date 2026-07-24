import banner1 from '../assets/banner1.svg'
import banner2 from '../assets/banner2.svg'
import banner3 from '../assets/banner3.svg'
import banner4 from '../assets/banner4.svg'
import { starterUsers } from './userData'

export const bannerImages=[banner1,banner2,banner3,banner4]

export const defaultCampaigns=[
  {id:1,name:'Festive Sale Launch',description:'Sale campaign for festive offers.',status:'Active',platform:'Instagram',audience:'18-24',budget:18000,banner:banner1,ownerName:'Rahul Sharma',ownerEmail:'rahul@test.com',createdBy:'Admin User',source:'mock',createdAt:'2026-07-10'},
  {id:2,name:'Search Lead Campaign',description:'Lead campaign for search traffic.',status:'Paused',platform:'Google Search',audience:'25-34',budget:12500,banner:banner2,ownerName:'Normal User',ownerEmail:'user@test.com',createdBy:'Admin User',source:'mock',createdAt:'2026-07-12'},
  {id:3,name:'Travel Weekend Offer',description:'Weekend travel package promotion.',status:'Active',platform:'Facebook',audience:'35+',budget:21000,banner:banner3,ownerName:'Priya Nair',ownerEmail:'priya@test.com',createdBy:'Super Admin',source:'mock',createdAt:'2026-07-15'},
  {id:4,name:'App Install Push',description:'Install campaign for mobile app.',status:'Active',platform:'YouTube',audience:'18-24',budget:15000,banner:banner4,ownerName:'Rahul Sharma',ownerEmail:'rahul@test.com',createdBy:'Super Admin',source:'mock',createdAt:'2026-07-18'},
  {id:5,name:'Video Reach Plan',description:'Video reach campaign for new audience.',status:'Active',platform:'YouTube',audience:'25-34',budget:27500,banner:banner2,ownerName:'Normal User',ownerEmail:'user@test.com',createdBy:'Admin User',source:'mock',createdAt:'2026-07-19'},
  {id:6,name:'Brand Awareness Push',description:'Awareness campaign for brand traffic.',status:'Active',platform:'Facebook',audience:'35+',budget:23500,banner:banner1,ownerName:'Priya Nair',ownerEmail:'priya@test.com',createdBy:'Super Admin',source:'mock',createdAt:'2026-07-20'}
]

const campaignNames=['Festive Offers','Lead Booster','Weekend Sale','App Install Push','Brand Awareness','Search Traffic','Summer Deals','Video Reach']
const descriptions=['Campaign for product offers.','Lead generation campaign.','Promotion for selected audience.','Budget test campaign.','Awareness campaign for new users.']
const platforms=['Google Search','Facebook','Instagram','YouTube']
const ageGroups=['18-24','25-34','35+']
const statuses=['Active','Paused']

function pick(list){
  return list[Math.floor(Math.random()*list.length)]
}

export function createMockCampaigns(startId=1){
  const owners=starterUsers.filter(user=>user.role==='User')
  const count=6
  return Array.from({length:count},(_,index)=>{
    const owner=pick(owners)
    return {
      id:startId+index,
      name:`${pick(campaignNames)} ${index+1}`,
      description:pick(descriptions),
      status:index<5?'Active':pick(statuses),
      platform:pick(platforms),
      audience:pick(ageGroups),
      budget:Math.floor((5000+Math.random()*950000)/1000)*1000,
      banner:pick(bannerImages),
      ownerName:owner.name,
      ownerEmail:owner.email,
      createdBy:'Super Admin',
      source:'mock',
      createdAt:new Date().toISOString().slice(0,10)
    }
  })
}

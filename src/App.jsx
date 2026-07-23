import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CampaignProvider } from './context/CampaignContext'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import CampaignList from './pages/CampaignList'
import CreateCampaign from './pages/CreateCampaign'
import CampaignDetails from './pages/CampaignDetails'
import EditCampaign from './pages/EditCampaign'

function App(){
  return (
    <AuthProvider>
      <CampaignProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="campaigns" element={<CampaignList />} />
            <Route path="campaigns/new" element={<ProtectedRoute roles={['Admin','Super Admin']}><CreateCampaign /></ProtectedRoute>} />
            <Route path="campaigns/:id/edit" element={<ProtectedRoute roles={['Admin','Super Admin']}><EditCampaign /></ProtectedRoute>} />
            <Route path="campaigns/:id" element={<CampaignDetails />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </CampaignProvider>
    </AuthProvider>
  )
}
export default App

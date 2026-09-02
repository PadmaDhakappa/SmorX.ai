import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Home from './pages/Home'
import ArticleMultiAgent from './pages/ArticleMultiAgent'
import ArticleAutonomousWorkflow from './pages/ArticleAutonomousWorkflow'
import ArticleControlPlane from './pages/ArticleControlPlane'
import ArticleAgentsVsSoftware from './pages/ArticleAgentsVsSoftware'
import ArticleSecureAgents from './pages/ArticleSecureAgents'
import ArticleAgentEconomics from './pages/ArticleAgentEconomics'
import HireTalent from './pages/HireTalent'
import HireRoleDetail from './pages/HireRoleDetail'
import SaaSLanding from './pages/SaaSLanding'
import SaaSDetail from './pages/SaaSDetail'
import PlatformLanding from './pages/PlatformLanding'
import PlatformDetail from './pages/PlatformDetail'
import CapabilitiesLanding from './pages/CapabilitiesLanding'
import CapabilitiesDetail from './pages/CapabilitiesDetail'
import IndustriesLanding from './pages/IndustriesLanding'
import IndustriesDetail from './pages/IndustriesDetail'
import MarketplaceLanding from './pages/MarketplaceLanding'
import MarketplaceDetail from './pages/MarketplaceDetail'
import ResultsLanding from './pages/ResultsLanding'
import ResultsDetail from './pages/ResultsDetail'
import NotFound from './pages/NotFound'

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/multi-agent-systems" element={<ArticleMultiAgent />} />
          <Route path="/blog/autonomous-workflows" element={<ArticleAutonomousWorkflow />} />
          <Route path="/blog/ai-control-planes" element={<ArticleControlPlane />} />
          <Route path="/blog/agents-vs-software" element={<ArticleAgentsVsSoftware />} />
          <Route path="/blog/secure-agents" element={<ArticleSecureAgents />} />
          <Route path="/blog/agent-economics" element={<ArticleAgentEconomics />} />
          <Route path="/hire-talent" element={<HireTalent />} />
          <Route path="/hire-talent/:slug" element={<HireRoleDetail />} />
          <Route path="/saas" element={<SaaSLanding />} />
          <Route path="/saas/:slug" element={<SaaSDetail />} />
          <Route path="/platform" element={<PlatformLanding />} />
          <Route path="/platform/:slug" element={<PlatformDetail />} />
          <Route path="/capabilities" element={<CapabilitiesLanding />} />
          <Route path="/capabilities/:slug" element={<CapabilitiesDetail />} />
          <Route path="/industries" element={<IndustriesLanding />} />
          <Route path="/industries/:slug" element={<IndustriesDetail />} />
          <Route path="/agent-marketplace" element={<MarketplaceLanding />} />
          <Route path="/agent-marketplace/:slug" element={<MarketplaceDetail />} />
          <Route path="/results" element={<ResultsLanding />} />
          <Route path="/results/:slug" element={<ResultsDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </HelmetProvider>
  )
}

export default App

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Home from './pages/Home'
import ArticleMultiAgent from './pages/ArticleMultiAgent'
import ArticleAutonomousWorkflow from './pages/ArticleAutonomousWorkflow'
import ArticleControlPlane from './pages/ArticleControlPlane'
import ArticleAgentsVsSoftware from './pages/ArticleAgentsVsSoftware'
import ArticleSecureAgents from './pages/ArticleSecureAgents'
import ArticleAgentEconomics from './pages/ArticleAgentEconomics'
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </HelmetProvider>
  )
}

export default App

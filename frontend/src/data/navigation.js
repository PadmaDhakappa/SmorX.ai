import { Brain, Building2, Cloud, Newspaper, Mail, Users, TrendingUp, Bot } from 'lucide-react'
import { HIRE_ROLE_GROUPS, ENGAGEMENT_MODELS } from './hireTalent'
import { SAAS_GROUPS } from './saas'
import { PLATFORM_ITEMS } from './platform'
import { CAPABILITIES_ITEMS } from './capabilities'
import { INDUSTRY_ITEMS } from './industries'
import { MARKETPLACE_ITEMS } from './agentMarketplaceCatalog'
import { RESULTS_ITEMS } from './results'

const toNavItem = (basePath) => (item) => ({
  label: item.label,
  icon: item.icon,
  href: `${basePath}/${item.slug}`,
  desc: item.gridDesc,
})

export const NAV_GROUPS = [
  {
    id: 'platform',
    label: 'Platform',
    href: '/platform',
    icon: Brain,
    panelCols: 3,
    items: PLATFORM_ITEMS.map(toNavItem('/platform')),
    featured: {
      title: 'One orchestration layer connecting every agent, model, and system you run.',
      ctaLabel: 'Explore Platform',
      ctaHref: '/platform',
    },
  },
  {
    id: 'capabilities',
    label: 'Capabilities',
    href: '/capabilities',
    icon: Bot,
    panelCols: 3,
    items: CAPABILITIES_ITEMS.map(toNavItem('/capabilities')),
    featured: {
      title: 'Six ways to turn manual enterprise work into autonomous, measurable outcomes.',
      ctaLabel: 'See All Capabilities',
      ctaHref: '/capabilities',
    },
  },
  {
    id: 'industries',
    label: 'Solutions',
    href: '/industries',
    icon: Building2,
    panelCols: 4,
    items: INDUSTRY_ITEMS.map(toNavItem('/industries')),
    featured: {
      title: 'Built for the data, compliance, and operational realities of your sector.',
      ctaLabel: 'View Industry Solutions',
      ctaHref: '/industries',
    },
  },
  {
    id: 'saas',
    label: 'SaaS',
    href: '/saas',
    icon: Cloud,
    panelCols: null,
    width: 760,
    items: null,
    groupsLayout: 'row',
    groups: SAAS_GROUPS.map(g => ({
      heading: g.heading,
      cols: 1,
      items: g.items.map(it => ({ label: it.label, icon: it.icon, href: `/saas/${it.slug}` })),
    })),
    featured: {
      title: 'Every SaaS Product, Powered by an Agent Layer',
      subtitle: "We don't just build software — we embed autonomous agents into it, so the product improves itself over time.",
      ctaLabel: 'Explore SaaS Solutions',
      ctaHref: '/saas',
    },
  },
  {
    id: 'hire-talent',
    label: 'Hire Talent',
    href: '/hire-talent',
    icon: Users,
    panelCols: null,
    width: 780,
    items: null,
    groups: HIRE_ROLE_GROUPS.map(g => ({
      heading: g.heading,
      cols: 2,
      items: g.roles.map(r => ({ label: r.label, icon: r.icon, href: `/hire-talent/${r.slug}`, desc: r.menuDesc })),
    })),
    featured: {
      title: "Not sure which model fits? We'll help you decide in one call.",
      panelItems: ENGAGEMENT_MODELS.map(m => ({ label: m.label, desc: m.menuDesc })),
      ctaLabel: 'Request Talent',
      ctaHref: '/hire-talent#engagement-models',
    },
  },
  {
    id: 'marketplace',
    label: 'Agent Marketplace',
    href: '/agent-marketplace',
    icon: Bot,
    panelCols: 3,
    items: MARKETPLACE_ITEMS.map(toNavItem('/agent-marketplace')),
    featured: {
      title: 'Pre-trained agents ready to deploy against real workflows in days.',
      ctaLabel: 'Browse Agents',
      ctaHref: '/agent-marketplace',
    },
  },
  {
    id: 'results',
    label: 'Results',
    href: '/results',
    icon: TrendingUp,
    panelCols: 1,
    items: RESULTS_ITEMS.map(toNavItem('/results')),
    featured: {
      title: 'Real deployments, real numbers — cost, speed, and adoption metrics from live enterprise systems.',
      ctaLabel: 'See Full Results',
      ctaHref: '/results',
    },
  },
  {
    id: 'insights',
    label: 'Insights',
    href: '#blog',
    icon: Newspaper,
    panelCols: 3,
    items: [
      { label: 'Why Multi-Agent Systems Are the New Business Operating Layer', href: '/blog/multi-agent-systems', tag: 'Architecture', readTime: '6 min read' },
      { label: 'From AI Automation to Autonomous Enterprise Workflows', href: '/blog/autonomous-workflows', tag: 'Strategy', readTime: '5 min read' },
      { label: 'The Rise of AI Control Planes in Modern Companies', href: '/blog/ai-control-planes', tag: 'Platform', readTime: '7 min read' },
      { label: 'AI Agents vs Traditional Software: What Changes in 2026', href: '/blog/agents-vs-software', tag: 'Comparison', readTime: '8 min read' },
      { label: 'Building Secure and Governed Agentic AI Systems', href: '/blog/secure-agents', tag: 'Security', readTime: '9 min read' },
      { label: 'The Economics of AI Agents: Cost, ROI, and Scale', href: '/blog/agent-economics', tag: 'Economics', readTime: '6 min read' },
    ],
    featured: {
      title: 'Field notes from teams building agentic systems in production.',
      ctaLabel: 'Read All Insights',
      ctaHref: '#blog',
    },
  },
  {
    id: 'company',
    label: 'Contact',
    href: '#contact',
    icon: Mail,
    panelCols: null,
    items: null,
    featured: null,
  },
]

export const FOOTER_GROUPS = {
  Company: [
    { label: 'About SmorX', href: '#home', scroll: true },
    { label: 'Our Mission', href: '#home', scroll: true },
    { label: 'Careers', href: '#contact', scroll: true },
    { label: 'Blog', href: '#blog', scroll: true },
    { label: 'Case Studies', href: '/results/case-studies', scroll: false },
    { label: 'Client Results', href: '/results/client-testimonials', scroll: false },
  ],
  Platform: [
    { label: 'Agentic Workflows', href: '/capabilities/agentic-workflow-automation', scroll: false },
    { label: 'Multi-Agent Systems', href: '/capabilities/multi-agent-systems', scroll: false },
    { label: 'AI Control Plane', href: '/platform', scroll: false },
    { label: 'Agent Marketplace', href: '/agent-marketplace', scroll: false },
    { label: 'Data Intelligence', href: '/capabilities/ai-data-intelligence', scroll: false },
  ],
  'Solutions by Industry': [
    { label: 'Healthcare', href: '/industries/healthcare', scroll: false },
    { label: 'Financial Services', href: '/industries/financial-services', scroll: false },
    { label: 'Manufacturing', href: '/industries/manufacturing', scroll: false },
    { label: 'Retail & E-commerce', href: '/industries/retail', scroll: false },
    { label: 'Logistics', href: '/industries/logistics', scroll: false },
    { label: 'SaaS', href: '/saas', scroll: false },
    { label: 'Hire Talent', href: '/hire-talent', scroll: false },
  ],
  Insights: [
    { label: 'Multi-Agent Systems', href: '/blog/multi-agent-systems', scroll: false },
    { label: 'Autonomous Workflows', href: '/blog/autonomous-workflows', scroll: false },
    { label: 'AI Control Planes', href: '/blog/ai-control-planes', scroll: false },
    { label: 'AI Agents vs Software', href: '/blog/agents-vs-software', scroll: false },
    { label: 'Secure AI Agents', href: '/blog/secure-agents', scroll: false },
  ],
}

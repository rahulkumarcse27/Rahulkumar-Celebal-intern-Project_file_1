export type DocStatus = 'processed' | 'processing' | 'failed' | 'queued'
export type DocType = 'PDF' | 'DOCX' | 'XLSX' | 'IMG' | 'TXT'

export interface DocItem {
  id: string
  name: string
  type: DocType
  size: string
  status: DocStatus
  pages: number
  owner: string
  updated: string
  confidence: number
  tags: string[]
}

export const documents: DocItem[] = [
  {
    id: 'DOC-4821',
    name: 'Q4 2025 Financial Report.pdf',
    type: 'PDF',
    size: '4.2 MB',
    status: 'processed',
    pages: 48,
    owner: 'Amara Chen',
    updated: '2 hours ago',
    confidence: 98,
    tags: ['Finance', 'Report'],
  },
  {
    id: 'DOC-4820',
    name: 'Vendor Master Services Agreement.docx',
    type: 'DOCX',
    size: '1.1 MB',
    status: 'processed',
    pages: 22,
    owner: 'Liam Ortiz',
    updated: '5 hours ago',
    confidence: 95,
    tags: ['Legal', 'Contract'],
  },
  {
    id: 'DOC-4819',
    name: 'Global Headcount Plan.xlsx',
    type: 'XLSX',
    size: '820 KB',
    status: 'processing',
    pages: 12,
    owner: 'Sofia Rossi',
    updated: '20 min ago',
    confidence: 0,
    tags: ['HR', 'Planning'],
  },
  {
    id: 'DOC-4818',
    name: 'Product Roadmap 2026.pdf',
    type: 'PDF',
    size: '2.7 MB',
    status: 'processed',
    pages: 31,
    owner: 'Noah Patel',
    updated: 'Yesterday',
    confidence: 92,
    tags: ['Product', 'Strategy'],
  },
  {
    id: 'DOC-4817',
    name: 'Compliance Audit Scan.img',
    type: 'IMG',
    size: '6.4 MB',
    status: 'failed',
    pages: 8,
    owner: 'Emma Novak',
    updated: 'Yesterday',
    confidence: 0,
    tags: ['Compliance'],
  },
  {
    id: 'DOC-4816',
    name: 'Customer Feedback Summary.txt',
    type: 'TXT',
    size: '48 KB',
    status: 'processed',
    pages: 3,
    owner: 'Amara Chen',
    updated: '2 days ago',
    confidence: 89,
    tags: ['Research', 'CX'],
  },
  {
    id: 'DOC-4815',
    name: 'Series C Pitch Deck.pdf',
    type: 'PDF',
    size: '9.8 MB',
    status: 'processed',
    pages: 27,
    owner: 'Liam Ortiz',
    updated: '3 days ago',
    confidence: 96,
    tags: ['Finance', 'Fundraising'],
  },
  {
    id: 'DOC-4814',
    name: 'Data Processing Addendum.docx',
    type: 'DOCX',
    size: '640 KB',
    status: 'queued',
    pages: 15,
    owner: 'Sofia Rossi',
    updated: '3 days ago',
    confidence: 0,
    tags: ['Legal', 'Privacy'],
  },
]

export const usageData = [
  { month: 'Jan', documents: 1240, queries: 3200 },
  { month: 'Feb', documents: 1680, queries: 4100 },
  { month: 'Mar', documents: 1520, queries: 4600 },
  { month: 'Apr', documents: 2100, queries: 5900 },
  { month: 'May', documents: 2480, queries: 7200 },
  { month: 'Jun', documents: 2920, queries: 8800 },
  { month: 'Jul', documents: 3380, queries: 11200 },
]

export const stats = [
  {
    label: 'Documents processed',
    value: '18,429',
    delta: '+12.4%',
    trend: 'up' as const,
    hint: 'vs. last month',
  },
  {
    label: 'AI queries answered',
    value: '52,180',
    delta: '+28.1%',
    trend: 'up' as const,
    hint: 'vs. last month',
  },
  {
    label: 'Avg. extraction accuracy',
    value: '96.8%',
    delta: '+1.2%',
    trend: 'up' as const,
    hint: 'across all types',
  },
  {
    label: 'Avg. processing time',
    value: '3.4s',
    delta: '-0.6s',
    trend: 'down' as const,
    hint: 'per document',
  },
]

export interface Insight {
  id: string
  title: string
  detail: string
  tone: 'brand' | 'success' | 'warning'
  source: string
}

export const insights: Insight[] = [
  {
    id: 'INS-1',
    title: 'Renewal risk detected',
    detail:
      'The Vendor MSA auto-renews in 14 days with a 9% price increase clause.',
    tone: 'warning',
    source: 'Vendor Master Services Agreement.docx',
  },
  {
    id: 'INS-2',
    title: 'Revenue up 23% QoQ',
    detail:
      'Q4 net revenue reached $48.2M, exceeding the forecast by $3.1M.',
    tone: 'success',
    source: 'Q4 2025 Financial Report.pdf',
  },
  {
    id: 'INS-3',
    title: '5 documents share an entity',
    detail:
      '"Northwind Logistics" appears across contracts, invoices and the roadmap.',
    tone: 'brand',
    source: 'Cross-document analysis',
  },
]

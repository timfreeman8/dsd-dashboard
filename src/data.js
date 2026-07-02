const LOGOS = {
  pepsi:        '/logos/Pepsi-Logo.png',
  cocaCola:     '/logos/CocaCola-Logo.png',
  fritoLay:     '/logos/FritoLay-Logo.png',
  kdp:          '/logos/KDP-Logo.png',
  redBull:      '/logos/RedBull-Logo.png',
  snydersLance: '/logos/SnydersLance-Logo.png',
  littleDebbie: '/logos/LittleDebbie-Logo.png',
  centralPet:   '/logos/CentralPet-Logo.png',
  schwans:      '/logos/Schwans-Logo.png',
  lr:           '/logos/LR-Logo.png',
}

export const storeSummary = [
  { label: 'Robot\nOut of Stock',         valueDisplay: '113',   subLabel: 'Total Count',   subLabel2: 'As of Last Scan',   isGood: false },
  { label: 'DSD\nCredits',                valueDisplay: '3.42%', subLabel: 'Goal ≥ 2.50%', subLabel2: 'Last 30 Days',      isGood: true  },
  { label: 'GlobalWorx\nUnresolved Issues', valueDisplay: '5',  subLabel: 'Goal ≤ 2',     subLabel2: 'Current Week',      isGood: false },
{ label: 'Vendors Not\nChecked Out',     valueDisplay: '0',    subLabel: 'Goal ≤ 2',     subLabel2: 'Current Week',      isGood: true  },
  { label: 'Open\nInvoices',              valueDisplay: '1',    subLabel: 'Older than',    subLabel2: '5 days',            isGood: false },
]

// Ordered by estimated arrival time — the simulation checks them in this order
export const vendors = [
  {
    id: 3, name: 'Frito Lay',
    logo: LOGOS.fritoLay, logoBg: '#ffffff', logoScale: 1.0,
    status: 'not-checked-in', statusDetail: null, type: 'Delivery',
    outOfStock: 1, dsdCredits: 0.07, weeksWithoutCredit: 0, overDelivered: 762, globalWorxIssues: 0, missedCheckOut: 0,
    repName: 'Matt B.',
    welcomeData: {
      weekLabel: 'Week May 31 – Jun 6',
      execSummary: [
        { label: 'In Stock Score',        value: '97.10%',  isGood: true  },
        { label: 'Actual Sales',          value: '$41,882'               },
        { label: 'Potential Lost Sales',  value: '$318',    isGood: false },
        { label: 'WoW Trend',             value: '+3'                    },
        { label: 'Core Issue',            value: '0',       isGood: true  },
      ],
      vendorUplift: 'Excellent in-stock rate this period. Zero missed checkouts and strong week-over-week momentum.',
      topLossItems: [
        { upc: '0002840031041', description: "Lay's Classic 8oz",      iss: '94.21%', lostSales: '$112.40', daysOffSale: 4, daysTotal: 7 },
        { upc: '0002840032617', description: 'Doritos Nacho 9.25oz',   iss: '91.67%', lostSales: '$89.15',  daysOffSale: 3, daysTotal: 7 },
        { upc: '0002840049600', description: 'Cheetos Crunchy 8.5oz',  iss: '88.90%', lostSales: '$61.02',  daysOffSale: 2, daysTotal: 7, issGood: true },
        { upc: '0002840032604', description: 'Doritos Cool Ranch 9oz', iss: '90.44%', lostSales: '$44.77',  daysOffSale: 1, daysTotal: 7 },
        { upc: '0002840049301', description: "Lay's BBQ 7.75oz",       iss: '96.13%', lostSales: '$11.23',  daysOffSale: 0, daysTotal: 7, issGood: true },
      ],
      recommendations: [
        { priority: 'HIGH',   title: "Increase Lay's Classic shelf facings",   description: "Running 4 days off target — endcap proximity to store entrance may reduce visibility mid-week." },
        { priority: 'MEDIUM', title: 'Secondary Doritos display near checkout', description: 'Summer impulse lift opportunity — Doritos pull-through drops 18% without secondary placement.' },
        { priority: 'LOW',    title: 'Rotate Cheetos to eye-level shelf',       description: 'Currently bottom shelf. Eye-level placement typically adds 6–8% lift on impulse SKUs.' },
      ],
    },
  },
  {
    id: 4, name: 'KDP',
    logo: LOGOS.kdp, logoBg: '#ffffff', logoScale: 1.0,
    status: 'not-checked-in', statusDetail: null, type: 'Delivery',
    outOfStock: 1, dsdCredits: 2.34, weeksWithoutCredit: 1, overDelivered: 1052, globalWorxIssues: 1, missedCheckOut: 0,
    repName: 'Sarah K.',
    welcomeData: {
      weekLabel: 'Week May 31 – Jun 6',
      execSummary: [
        { label: 'In Stock Score',        value: '93.50%',  isGood: true  },
        { label: 'Actual Sales',          value: '$28,741'               },
        { label: 'Potential Lost Sales',  value: '$841',    isGood: false },
        { label: 'WoW Trend',             value: '-1'                    },
        { label: 'Core Issue',            value: '1',       isGood: false },
      ],
      vendorUplift: 'Strong credit performance with 2.34% DSD credits — above the 2.50% goal. One open GlobalWorx issue to resolve.',
      topLossItems: [
        { upc: '0007800008090', description: 'Dr Pepper 12 PK',         iss: '90.12%', lostSales: '$198.44', daysOffSale: 5, daysTotal: 7 },
        { upc: '0007800008100', description: 'Canada Dry 12 PK',        iss: '87.33%', lostSales: '$142.60', daysOffSale: 4, daysTotal: 7 },
        { upc: '0007800008050', description: 'Dr Pepper Zero 12 PK',    iss: '91.77%', lostSales: '$88.12',  daysOffSale: 2, daysTotal: 7, issGood: true },
        { upc: '0007800008200', description: 'Snapple Lemon Tea 6x16oz',iss: '85.40%', lostSales: '$55.80',  daysOffSale: 3, daysTotal: 7 },
        { upc: '0007800004100', description: 'Core Water 6x30oz',       iss: '93.88%', lostSales: '$22.10',  daysOffSale: 1, daysTotal: 7, issGood: true },
      ],
      recommendations: [
        { priority: 'HIGH',   title: 'Resolve Dr Pepper 12 PK out-of-stock',    description: '5 days off target this week — primary shelf gap identified in aisle 4. Immediate replenishment needed.' },
        { priority: 'MEDIUM', title: 'Address Canada Dry shelf void',            description: '4 days off target. Secondary cold vault placement could offset main aisle gaps.' },
        { priority: 'LOW',    title: 'Review Snapple floor display opportunity', description: 'Summer tea demand up 12% YoY — a floor display near produce could capture incremental volume.' },
      ],
    },
  },
  {
    id: 1, name: 'Pepsi',
    logo: LOGOS.pepsi, logoBg: '#ffffff', logoScale: 1.0,
    status: 'not-checked-in', statusDetail: null, type: 'Delivery',
    outOfStock: 38, dsdCredits: 3.77, weeksWithoutCredit: 1, overDelivered: 12416, globalWorxIssues: 2, missedCheckOut: 0,
    repName: 'Chris M.',
    welcomeData: {
      weekLabel: 'Week May 31 – Jun 6',
      execSummary: [
        { label: 'In Stock Score',        value: '81.40%',  isGood: false },
        { label: 'Actual Sales',          value: '$67,510'               },
        { label: 'Potential Lost Sales',  value: '$4,812',  isGood: false },
        { label: 'WoW Trend',             value: '-8'                    },
        { label: 'Core Issue',            value: '2',       isGood: false },
      ],
      vendorUplift: '3.77% DSD credits — well above goal. However, 38 out-of-stocks this week are creating significant lost sales. Priority visit.',
      topLossItems: [
        { upc: '0001200081496', description: 'Pepsi 12 PK',             iss: '76.22%', lostSales: '$941.30', daysOffSale: 6, daysTotal: 7 },
        { upc: '0001200081452', description: 'Mountain Dew 12 PK',      iss: '79.50%', lostSales: '$712.40', daysOffSale: 5, daysTotal: 7 },
        { upc: '0001200081501', description: 'Pepsi Zero 12 PK',        iss: '83.11%', lostSales: '$488.60', daysOffSale: 5, daysTotal: 7 },
        { upc: '0001200081560', description: 'Starry 12 PK',            iss: '85.44%', lostSales: '$321.10', daysOffSale: 4, daysTotal: 7 },
        { upc: '0001200013706', description: 'Gatorade Fruit Punch 8pk',iss: '88.90%', lostSales: '$187.20', daysOffSale: 3, daysTotal: 7, issGood: true },
      ],
      recommendations: [
        { priority: 'HIGH',   title: 'Emergency restock: Pepsi & Mountain Dew 12PK', description: '6 and 5 days off-shelf — top two volume SKUs. Aisle 4 shelf voids confirmed. Restock immediately.' },
        { priority: 'HIGH',   title: 'Audit over-delivery credit exposure',           description: '$12,416 over-delivered. Unresolved credits risk deduction reversal. Reconcile with store manager.' },
        { priority: 'MEDIUM', title: 'Reduce Gatorade out-of-stock recurrence',       description: 'Third consecutive week with 3+ OOS days. Consider increasing order frequency on 8-pack format.' },
      ],
    },
  },
  {
    id: 2, name: 'Coca-Cola',
    logo: LOGOS.cocaCola, logoBg: '#de0b1c', logoScale: 1.0,
    status: 'not-checked-in', statusDetail: null, type: 'Merchandiser',
    outOfStock: 11, dsdCredits: 4.79, weeksWithoutCredit: 0, overDelivered: 23413, globalWorxIssues: 2, missedCheckOut: 0,
    repName: 'John S.',
    welcomeData: {
      weekLabel: 'Week May 31 – Jun 6',
      execSummary: [
        { label: 'In Stock Score',        value: '92.86%',  isGood: true  },
        { label: 'Actual Sales',          value: '$56,193'               },
        { label: 'Potential Lost Sales',  value: '$1,543',  isGood: false },
        { label: 'WoW Trend',             value: '6'                     },
        { label: 'Core Issue',            value: '0',       isGood: true  },
      ],
      vendorUplift: 'Zero missed checkouts and zero credit-free weeks this period. Compliance metrics are clean across the board.',
      topLossItems: [
        { upc: '0004900002891', description: 'Diet Coke 12 PK',    iss: '91.03%', lostSales: '$277.77', daysOffSale: 5, daysTotal: 7 },
        { upc: '0004900002890', description: 'Coke Classic 12 PK', iss: '93.84%', lostSales: '$188.32', daysOffSale: 3, daysTotal: 7 },
        { upc: '0004900002892', description: 'Sprite 12 PK',       iss: '87.28%', lostSales: '$157.18', daysOffSale: 5, daysTotal: 7 },
        { upc: '0068467811086', description: 'Coke 6 PK',          iss: '84.49%', lostSales: '$87.47',  daysOffSale: 3, daysTotal: 7 },
        { upc: '0004900002469', description: 'Diet Coke 6 PK',     iss: '88.32%', lostSales: '$66.56',  daysOffSale: 2, daysTotal: 7, issGood: true },
      ],
      recommendations: [
        { priority: 'HIGH',   title: 'Review Minute Maid OJ placement',         description: 'Move from aisle 7 endcap to refrigerated section. Running at 49% of target — highest risk SKU.' },
        { priority: 'MEDIUM', title: 'Add secondary Diet Coke display at checkout', description: '6% below target — a secondary summer display during peak season should recover the shortfall.' },
        { priority: 'LOW',    title: 'Expand Coke Zero to cold vault singles',   description: 'Up 20.5% vs. target — incremental 20oz single placements could unlock additional volume.' },
        { priority: 'LOW',    title: 'Expand Sprite 2L to 2 facings',           description: 'Current 1-facing limits visibility. Pull-through at 73% of target; adding a facing may close the gap.' },
      ],
    },
  },
  {
    id: 7, name: 'Red Bull',
    logo: LOGOS.redBull, logoBg: '#ffffff',
    status: 'not-checked-in', statusDetail: null, type: 'Delivery',
    outOfStock: 0, dsdCredits: 1.68, weeksWithoutCredit: 5, overDelivered: -550, globalWorxIssues: 0, missedCheckOut: 0,
    repName: 'Alex T.',
    welcomeData: {
      weekLabel: 'Week May 31 – Jun 6',
      execSummary: [
        { label: 'In Stock Score',        value: '99.30%',  isGood: true  },
        { label: 'Actual Sales',          value: '$18,440'               },
        { label: 'Potential Lost Sales',  value: '$89',     isGood: true  },
        { label: 'WoW Trend',             value: '+5'                    },
        { label: 'Core Issue',            value: '0',       isGood: true  },
      ],
      vendorUplift: 'Zero out-of-stocks and strong WoW trend. DSD credits below goal for 5 consecutive weeks — credit reconciliation recommended.',
      topLossItems: [
        { upc: '0061126919145', description: 'Red Bull 8.4oz 4PK',      iss: '97.80%', lostSales: '$44.10', daysOffSale: 1, daysTotal: 7, issGood: true },
        { upc: '0061126919152', description: 'Red Bull Sugar Free 4PK', iss: '98.20%', lostSales: '$31.40', daysOffSale: 1, daysTotal: 7, issGood: true },
        { upc: '0061126919160', description: 'Red Bull 12oz Single',    iss: '99.10%', lostSales: '$13.50', daysOffSale: 0, daysTotal: 7, issGood: true },
      ],
      recommendations: [
        { priority: 'MEDIUM', title: 'Initiate credit reconciliation',           description: '5 weeks without DSD credits. Verify delivery records with store — unmatched invoices may be outstanding.' },
        { priority: 'LOW',    title: 'Expand Red Bull 12oz to cold vault',       description: 'Single-serve cold vault placement near checkout could add 8–10% incremental volume on singles.' },
        { priority: 'LOW',    title: 'Evaluate summer flavor seasonal display',  description: 'Tropical and Watermelon SKUs trending up 22% regionally — consider an end-of-aisle summer set.' },
      ],
    },
  },
  {
    id: 10, name: "Snyder's Lance",
    logo: LOGOS.snydersLance, logoBg: '#ffffff',
    status: 'not-checked-in', statusDetail: null, type: 'Delivery',
    outOfStock: 3, dsdCredits: 0.28, weeksWithoutCredit: 3, overDelivered: 1221, globalWorxIssues: 1, missedCheckOut: 0,
    repName: 'Dave P.',
    welcomeData: {
      weekLabel: 'Week May 31 – Jun 6',
      execSummary: [
        { label: 'In Stock Score',        value: '94.80%',  isGood: true  },
        { label: 'Actual Sales',          value: '$12,330'               },
        { label: 'Potential Lost Sales',  value: '$524',    isGood: false },
        { label: 'WoW Trend',             value: '+2'                    },
        { label: 'Core Issue',            value: '1',       isGood: false },
      ],
      vendorUplift: 'Good in-stock performance overall. DSD credits remain below goal for 3 consecutive weeks — review credit submission process.',
      topLossItems: [
        { upc: '0007790040145', description: "Snyder's Pretzels 16oz",   iss: '91.33%', lostSales: '$188.40', daysOffSale: 4, daysTotal: 7 },
        { upc: '0001780002488', description: 'Lance Sandwich Crackers',  iss: '93.77%', lostSales: '$122.10', daysOffSale: 3, daysTotal: 7 },
        { upc: '0007790041022', description: "Snyder's Mini Pretzels",   iss: '89.20%', lostSales: '$81.20',  daysOffSale: 2, daysTotal: 7 },
        { upc: '0001780002490', description: 'Cape Cod Kettle 8oz',      iss: '95.60%', lostSales: '$37.80',  daysOffSale: 1, daysTotal: 7, issGood: true },
      ],
      recommendations: [
        { priority: 'HIGH',   title: "Restock Snyder's Pretzels 16oz",         description: '4 days off shelf — primary placement in snack aisle gap. Check backroom for outstanding units.' },
        { priority: 'MEDIUM', title: 'Submit outstanding DSD credits',          description: '3 weeks without credits recorded — confirm delivery docs are submitted through the portal.' },
        { priority: 'LOW',    title: 'Add secondary pretzel display near deli', description: 'Deli adjacency drives impulse for pretzel SKUs. Incremental 10–15% lift documented at similar stores.' },
      ],
    },
  },
  {
    id: 17, name: 'Little Debbies',
    logo: LOGOS.littleDebbie, logoBg: '#ffffff',
    status: 'not-checked-in', statusDetail: null, type: 'Delivery',
    outOfStock: 4, dsdCredits: 3.01, weeksWithoutCredit: 1, overDelivered: 842, globalWorxIssues: 1, missedCheckOut: 0,
    repName: 'Kim R.',
    welcomeData: {
      weekLabel: 'Week May 31 – Jun 6',
      execSummary: [
        { label: 'In Stock Score',        value: '93.20%',  isGood: true  },
        { label: 'Actual Sales',          value: '$9,870'                },
        { label: 'Potential Lost Sales',  value: '$612',    isGood: false },
        { label: 'WoW Trend',             value: '-2'                    },
        { label: 'Core Issue',            value: '1',       isGood: false },
      ],
      vendorUplift: 'DSD credits at 3.01% — above goal. Four out-of-stocks impacting sales this week with a slight negative trend.',
      topLossItems: [
        { upc: '0002435054080', description: 'Oatmeal Creme Pies 12ct',  iss: '89.44%', lostSales: '$211.30', daysOffSale: 5, daysTotal: 7 },
        { upc: '0002435011100', description: 'Nutty Bars 12ct',          iss: '92.10%', lostSales: '$154.20', daysOffSale: 4, daysTotal: 7 },
        { upc: '0002435054170', description: 'Zebra Cakes 10ct',         iss: '88.77%', lostSales: '$131.80', daysOffSale: 3, daysTotal: 7 },
        { upc: '0002435033100', description: 'Swiss Rolls 12ct',         iss: '94.33%', lostSales: '$70.40',  daysOffSale: 2, daysTotal: 7, issGood: true },
        { upc: '0002435054240', description: 'Honey Buns 6ct',           iss: '96.80%', lostSales: '$44.30',  daysOffSale: 0, daysTotal: 7, issGood: true },
      ],
      recommendations: [
        { priority: 'HIGH',   title: 'Restock Oatmeal Creme Pies',              description: '5 days off shelf — top volume SKU for this vendor. Aisle 3 bakery section needs immediate attention.' },
        { priority: 'MEDIUM', title: 'Seasonal summer display — Zebra Cakes',   description: 'Impulse sales opportunity near checkout. Zebra Cakes perform 14% above average in summer sets.' },
        { priority: 'LOW',    title: 'Review WoW trend decline',                description: 'Two consecutive negative trend weeks. Review planogram compliance and shelf space allocation.' },
      ],
    },
  },
  {
    id: 18, name: 'Central Pet',
    logo: LOGOS.centralPet, logoBg: '#f0f0f0',
    status: 'not-checked-in', statusDetail: null, type: 'Delivery',
    outOfStock: 0, dsdCredits: 0.00, weeksWithoutCredit: 8, overDelivered: 212, globalWorxIssues: 0, missedCheckOut: 0,
    repName: 'Tom W.',
    welcomeData: {
      weekLabel: 'Week May 31 – Jun 6',
      execSummary: [
        { label: 'In Stock Score',        value: '98.90%',  isGood: true  },
        { label: 'Actual Sales',          value: '$5,210'                },
        { label: 'Potential Lost Sales',  value: '$44',     isGood: true  },
        { label: 'WoW Trend',             value: '+1'                    },
        { label: 'Core Issue',            value: '0',       isGood: true  },
      ],
      vendorUplift: 'Excellent in-stock performance with zero out-of-stocks. DSD credits at 0% for 8 consecutive weeks — submission process review required.',
      topLossItems: [
        { upc: '0007946801812', description: 'Purina Fancy Feast 3oz',  iss: '97.40%', lostSales: '$28.10', daysOffSale: 1, daysTotal: 7, issGood: true },
        { upc: '0007946801820', description: 'Purina Friskies 12ct',    iss: '98.20%', lostSales: '$15.90', daysOffSale: 0, daysTotal: 7, issGood: true },
      ],
      recommendations: [
        { priority: 'HIGH',   title: 'Initiate DSD credit submission review',   description: '8 consecutive weeks with zero credits. Work with store manager to confirm delivery documentation process.' },
        { priority: 'LOW',    title: 'Evaluate pet treat endcap opportunity',   description: 'Summer pet ownership is up 9% regionally. An endcap near pet supplies could lift incremental sales.' },
      ],
    },
  },
  {
    id: 19, name: "Schwan's Pizza",
    logo: LOGOS.schwans, logoBg: '#ffffff',
    status: 'not-checked-in', statusDetail: null, type: 'Delivery',
    outOfStock: 0, dsdCredits: 1.13, weeksWithoutCredit: 2, overDelivered: 972, globalWorxIssues: 0, missedCheckOut: 0,
    repName: 'Mike S.',
    welcomeData: {
      weekLabel: 'Week May 31 – Jun 6',
      execSummary: [
        { label: 'In Stock Score',        value: '96.60%',  isGood: true  },
        { label: 'Actual Sales',          value: '$14,770'               },
        { label: 'Potential Lost Sales',  value: '$401',    isGood: false },
        { label: 'WoW Trend',             value: '+4'                    },
        { label: 'Core Issue',            value: '0',       isGood: true  },
      ],
      vendorUplift: 'Strong in-stock and positive trend. DSD credits below goal for 2 consecutive weeks. Zero GlobalWorx issues — excellent compliance.',
      topLossItems: [
        { upc: '0007220002310', description: "Freschetta Naturally Rising", iss: '93.10%', lostSales: '$182.40', daysOffSale: 4, daysTotal: 7 },
        { upc: '0007220002200', description: 'Red Baron Pepperoni 12"',    iss: '95.40%', lostSales: '$144.20', daysOffSale: 3, daysTotal: 7 },
        { upc: '0007220002150', description: "Tony's Pepperoni 9\"",       iss: '97.20%', lostSales: '$74.30',  daysOffSale: 1, daysTotal: 7, issGood: true },
      ],
      recommendations: [
        { priority: 'MEDIUM', title: "Boost Freschetta placement in frozen aisle",  description: "4 days off target — confirm shelf tag integrity and facing count in the frozen pizza section." },
        { priority: 'LOW',    title: 'Submit pending DSD credits',                  description: '2 weeks without credits. Confirm delivery receipts are uploaded — small adjustment could push above goal.' },
        { priority: 'LOW',    title: 'Summer meal solution display opportunity',    description: "Back-to-school demand for quick meals is rising. Schwan's pizza fits a convenience meal end-cap set." },
      ],
    },
  },
  {
    id: 20, name: 'L&R',
    logo: LOGOS.lr, logoBg: '#f0f0f0',
    status: 'not-checked-in', statusDetail: null, type: 'Delivery',
    outOfStock: null, dsdCredits: null, weeksWithoutCredit: null, overDelivered: 3203, globalWorxIssues: 0, missedCheckOut: 0,
    repName: 'Pat N.',
    welcomeData: {
      weekLabel: 'Week May 31 – Jun 6',
      execSummary: [
        { label: 'In Stock Score',        value: 'N/A'                   },
        { label: 'Actual Sales',          value: '$7,840'                },
        { label: 'Potential Lost Sales',  value: 'N/A'                   },
        { label: 'WoW Trend',             value: '+2'                    },
        { label: 'Core Issue',            value: '0',       isGood: true  },
      ],
      vendorUplift: 'Zero GlobalWorx issues and consistent delivery performance. In-stock tracking not yet configured for this vendor.',
      topLossItems: [
        { upc: '—', description: 'ISS data not available for L&R', iss: 'N/A', lostSales: 'N/A', daysOffSale: 0, daysTotal: 7, issGood: true },
      ],
      recommendations: [
        { priority: 'MEDIUM', title: 'Configure ISS tracking for L&R',          description: 'In-stock score data is not currently collected for this vendor. Work with store ops to enable scanning.' },
        { priority: 'LOW',    title: 'Review over-delivery variance',            description: '$3,203 over-delivered this period. Confirm order vs. delivery reconciliation to prevent credits.' },
      ],
    },
  },
]

export const GOALS = {
  dsdCredits:      { dir: 'gt',  value: 2.5   },
  overDelivered:   { dir: 'lt',  value: 10000 },
  globalWorxIssues:{ dir: 'lte', value: 2     },
  missedCheckOut:  { dir: 'lt',  value: 1     },
}

export const reclamation = {
  totalReclaim: 266,
  reclaimHold: 0,
  events: [
    { id: '6707', name: '2025 Holiday Gifting',    storeResponse: 'Item Sent',          received: 107  },
    { id: '6709', name: '2026 Spring Cosmetics',   storeResponse: 'No Response',        received: 1665 },
    { id: '6709', name: '2026 Spring Cosmetics',   storeResponse: 'No Items to Return', received: 0    },
  ],
}

export const topLossNoMarkdowns = {
  itemsWithZeroSales: 142,
  totalShippedCost: '$9,9996.83',
  items: [
    { upc: '0088877718886', description: 'DC HGTV RYKER 3-SEAT SWING',   units: 7,   shippedCost: '$107'    },
    { upc: '0004295214510', description: 'DC MECO WAB2 GRILL RED',       units: 12,  shippedCost: '$1,665'  },
    { upc: '0078979202827', description: 'CG PRO DLX CHRC BARREL',       units: 3,   shippedCost: '$0'      },
    { upc: '0068467811086', description: 'Berry 500FB2 Pellet Grill',     units: 1,   shippedCost: '$0'      },
    { upc: '0019305204380', description: 'BUNCH O BALLOONS 3PK TRPC',    units: 36,  shippedCost: '$271.44' },
    { upc: '0062796340465', description: 'DVRY BLUEBERRY',               units: null, shippedCost: '$204.06' },
    { upc: '0086000180056', description: 'SRSTRPS PNK LMND',             units: 100, shippedCost: '$195.00' },
    { upc: '0019305201955', description: 'ZURU BNCH O BALLOON RWB',      units: 24,  shippedCost: '$180.96' },
    { upc: '0003422335229', description: 'IGLOO 38QT WHEELIE CLR BL',    units: 6,   shippedCost: '$164.22' },
    { upc: '0074759943783', description: '3.7OZ ED SQ ASST MDAY GIF',    units: 36,  shippedCost: '$162.00' },
  ],
}

export const departmentMarkdowns = {
  kpis: {
    markdownUnitsSold:        2668,
    totalLossUnits:           1669,
    totalLossDollars:         5832,
    markdownEffectiveness:    68.9,
    totalLossUnitsNoMarkdown: 722,
  },
  departments: [
    { dept: '40', name: 'Bakery',           mdUnits: 349,  lossUnits: 609, totalLoss: 1351.11, mdEffectiveness: 65.6, lossUnitsNoMd: 116 },
    { dept: '19', name: 'Fresh Produce',    mdUnits: 518,  lossUnits: 70,  totalLoss: 1253.91, mdEffectiveness: 88.1, lossUnitsNoMd: 70  },
    { dept: '09', name: 'Meat',             mdUnits: 379,  lossUnits: 285, totalLoss: 978.72,  mdEffectiveness: 57.1, lossUnitsNoMd: 108 },
    { dept: '19', name: 'Fresh Produce',    mdUnits: 107,  lossUnits: 10,  totalLoss: 828.06,  mdEffectiveness: 91.6, lossUnitsNoMd: 10  },
    { dept: '95', name: 'Dairy',            mdUnits: 373,  lossUnits: 164, totalLoss: 428.84,  mdEffectiveness: 69.5, lossUnitsNoMd: 157 },
    { dept: '10', name: 'Deli Packaged',    mdUnits: 129,  lossUnits: 53,  totalLoss: 186.84,  mdEffectiveness: 77.9, lossUnitsNoMd: 17  },
    { dept: '02', name: 'Refrig Grocery',   mdUnits: 129,  lossUnits: 83,  totalLoss: 164.09,  mdEffectiveness: 60.8, lossUnitsNoMd: 73  },
    { dept: '15', name: 'Deli',             mdUnits: null, lossUnits: 31,  totalLoss: 158.48,  mdEffectiveness: null, lossUnitsNoMd: 31  },
    { dept: '71', name: 'Pkg Meat',         mdUnits: 254,  lossUnits: 8,   totalLoss: 126.48,  mdEffectiveness: 96.9, lossUnitsNoMd: 6   },
    { dept: '69', name: 'Seafood',          mdUnits: 46,   lossUnits: 140, totalLoss: 106.87,  mdEffectiveness: 24.7, lossUnitsNoMd: 101 },
    { dept: '73', name: 'Fresh Food Dest',  mdUnits: 68,   lossUnits: 11,  totalLoss: 88.31,   mdEffectiveness: 86.1, lossUnitsNoMd: 2   },
    { dept: '70', name: 'Pkg Seafood',      mdUnits: 17,   lossUnits: 9,   totalLoss: 83.90,   mdEffectiveness: 65.4, lossUnitsNoMd: 0   },
    { dept: '56', name: 'Salad Sandwich',   mdUnits: 6,    lossUnits: 16,  totalLoss: 56.64,   mdEffectiveness: 31.6, lossUnitsNoMd: 7   },
    { dept: '49', name: 'Specialty Chs',    mdUnits: 201,  lossUnits: 179, totalLoss: 15.81,   mdEffectiveness: 52.9, lossUnitsNoMd: 23  },
    { dept: '07', name: 'Package Produce',  mdUnits: 34,   lossUnits: 1,   totalLoss: 3.76,    mdEffectiveness: 97.1, lossUnitsNoMd: 1   },
  ],
}

export function meetsGoal(val, goal) {
  if (!goal) return null
  if (goal.dir === 'gt')  return val > goal.value
  if (goal.dir === 'gte') return val >= goal.value
  if (goal.dir === 'lt')  return val < goal.value
  if (goal.dir === 'lte') return val <= goal.value
  return null
}

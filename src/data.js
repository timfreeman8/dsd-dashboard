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
  { label: 'Vendor Not\nChecked In',       valueDisplay: '6',    subLabel: 'Goal ≤ 2',     subLabel2: 'Current Week',      isGood: false },
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
  },
  {
    id: 4, name: 'KDP',
    logo: LOGOS.kdp, logoBg: '#ffffff', logoScale: 1.0,
    status: 'not-checked-in', statusDetail: null, type: 'Delivery',
    outOfStock: 1, dsdCredits: 2.34, weeksWithoutCredit: 1, overDelivered: 1052, globalWorxIssues: 1, missedCheckOut: 0,
  },
  {
    id: 1, name: 'Pepsi',
    logo: LOGOS.pepsi, logoBg: '#ffffff', logoScale: 1.0,
    status: 'not-checked-in', statusDetail: null, type: 'Delivery',
    outOfStock: 38, dsdCredits: 3.77, weeksWithoutCredit: 1, overDelivered: 12416, globalWorxIssues: 2, missedCheckOut: 0,
  },
  {
    id: 2, name: 'Coca-Cola',
    logo: LOGOS.cocaCola, logoBg: '#de0b1c', logoScale: 1.0,
    status: 'not-checked-in', statusDetail: null, type: 'Merchandiser',
    outOfStock: 11, dsdCredits: 4.79, weeksWithoutCredit: 0, overDelivered: 23413, globalWorxIssues: 2, missedCheckOut: 0,
  },
  {
    id: 7, name: 'Red Bull',
    logo: LOGOS.redBull, logoBg: '#ffffff',
    status: 'not-checked-in', statusDetail: null, type: 'Delivery',
    outOfStock: 0, dsdCredits: 1.68, weeksWithoutCredit: 5, overDelivered: -550, globalWorxIssues: 0, missedCheckOut: 0,
  },
  {
    id: 10, name: "Snyder's Lance",
    logo: LOGOS.snydersLance, logoBg: '#ffffff',
    status: 'not-checked-in', statusDetail: null, type: 'Delivery',
    outOfStock: 3, dsdCredits: 0.28, weeksWithoutCredit: 3, overDelivered: 1221, globalWorxIssues: 1, missedCheckOut: 0,
  },
  {
    id: 17, name: 'Little Debbies',
    logo: LOGOS.littleDebbie, logoBg: '#ffffff',
    status: 'not-checked-in', statusDetail: null, type: 'Delivery',
    outOfStock: 4, dsdCredits: 3.01, weeksWithoutCredit: 1, overDelivered: 842, globalWorxIssues: 1, missedCheckOut: 0,
  },
  {
    id: 18, name: 'Central Pet',
    logo: LOGOS.centralPet, logoBg: '#f0f0f0',
    status: 'not-checked-in', statusDetail: null, type: 'Delivery',
    outOfStock: 0, dsdCredits: 0.00, weeksWithoutCredit: 8, overDelivered: 212, globalWorxIssues: 0, missedCheckOut: 0,
  },
  {
    id: 19, name: "Schwan's Pizza",
    logo: LOGOS.schwans, logoBg: '#ffffff',
    status: 'not-checked-in', statusDetail: null, type: 'Delivery',
    outOfStock: 0, dsdCredits: 1.13, weeksWithoutCredit: 2, overDelivered: 972, globalWorxIssues: 0, missedCheckOut: 0,
  },
  {
    id: 20, name: 'L&R',
    logo: LOGOS.lr, logoBg: '#f0f0f0',
    status: 'not-checked-in', statusDetail: null, type: 'Delivery',
    outOfStock: null, dsdCredits: null, weeksWithoutCredit: null, overDelivered: 3203, globalWorxIssues: 0, missedCheckOut: 0,
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

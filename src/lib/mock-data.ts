import type { CorporateAction } from "./types"

// Generate dates for the last 7 days
const getRecentDates = () => {
  const dates = []
  for (let i = 0; i < 7; i++) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    dates.push(date.toISOString().split("T")[0])
  }
  return dates
}

// Generate future dates (for process dates)
const getFutureDates = (startDaysFromNow: number) => {
  const dates = []
  for (let i = startDaysFromNow; i < startDaysFromNow + 7; i++) {
    const date = new Date()
    date.setDate(date.getDate() + i)
    dates.push(date.toISOString().split("T")[0])
  }
  return dates
}

const recentDates = getRecentDates()
const futureDates = getFutureDates(3) // Process dates are typically a few days after ex-date

export const mockCorporateActions: CorporateAction[] = [
  {
    id: "1",
    symbol: "AAPL",
    companyName: "Apple Inc.",
    type: "Dividend",
    dividendType: "Cash",
    details: "Quarterly cash dividend of $0.24 per share",
    date: recentDates[0],
    paymentDate: "2023-05-18",
    amount: 0.24,
  },
  {
    id: "2",
    symbol: "TSLA",
    companyName: "Tesla, Inc.",
    type: "Forward Split",
    details: "3-for-1 stock split",
    date: recentDates[1],
    processDate: futureDates[0],
    ratio: "3:1",
  },
  {
    id: "3",
    symbol: "MSFT",
    companyName: "Microsoft Corporation",
    type: "Dividend",
    dividendType: "Cash",
    details: "Quarterly cash dividend of $0.68 per share",
    date: recentDates[0],
    paymentDate: "2023-06-08",
    amount: 0.68,
  },
  {
    id: "4",
    symbol: "AMZN",
    companyName: "Amazon.com, Inc.",
    type: "Forward Split",
    details: "20-for-1 stock split",
    date: recentDates[2],
    processDate: futureDates[1],
    ratio: "20:1",
  },
  {
    id: "5",
    symbol: "META",
    companyName: "Meta Platforms, Inc.",
    type: "Dividend",
    dividendType: "Cash",
    details: "First-ever quarterly cash dividend of $0.50 per share",
    date: recentDates[1],
    paymentDate: "2023-05-26",
    amount: 0.5,
  },
  {
    id: "6",
    symbol: "NVDA",
    companyName: "NVIDIA Corporation",
    type: "Dividend",
    dividendType: "Cash",
    details: "Quarterly cash dividend of $0.04 per share",
    date: recentDates[3],
    paymentDate: "2023-06-30",
    amount: 0.04,
  },
  {
    id: "7",
    symbol: "GOOG",
    companyName: "Alphabet Inc.",
    type: "Forward Split",
    details: "20-for-1 stock split",
    date: recentDates[4],
    processDate: futureDates[2],
    ratio: "20:1",
  },
  {
    id: "8",
    symbol: "ADBE",
    companyName: "Adobe Inc.",
    type: "Merger/Acquisition",
    details: "Acquisition of Figma for $20 billion",
    date: recentDates[2],
    processDate: futureDates[3],
  },
  {
    id: "9",
    symbol: "CRM",
    companyName: "Salesforce, Inc.",
    type: "Merger/Acquisition",
    details: "Acquisition of Slack Technologies for $27.7 billion",
    date: recentDates[5],
    processDate: futureDates[4],
  },
  {
    id: "10",
    symbol: "IBM",
    companyName: "International Business Machines Corporation",
    type: "Spinoff",
    details: "Spinoff of Kyndryl Holdings, Inc.",
    date: recentDates[6],
    processDate: futureDates[5],
  },
  {
    id: "11",
    symbol: "JPM",
    companyName: "JPMorgan Chase & Co.",
    type: "Dividend",
    dividendType: "Cash",
    details: "Quarterly cash dividend of $1.00 per share",
    date: recentDates[3],
    paymentDate: "2023-07-31",
    amount: 1.0,
  },
  {
    id: "12",
    symbol: "V",
    companyName: "Visa Inc.",
    type: "Dividend",
    dividendType: "Cash",
    details: "Quarterly cash dividend of $0.45 per share",
    date: recentDates[4],
    paymentDate: "2023-06-01",
    amount: 0.45,
  },
  {
    id: "13",
    symbol: "WMT",
    companyName: "Walmart Inc.",
    type: "Dividend",
    dividendType: "Cash",
    details: "Quarterly cash dividend of $0.57 per share",
    date: recentDates[5],
    paymentDate: "2023-05-30",
    amount: 0.57,
  },
  {
    id: "14",
    symbol: "DIS",
    companyName: "The Walt Disney Company",
    type: "Spinoff",
    details: "Potential spinoff of ESPN",
    date: recentDates[6],
    processDate: futureDates[6],
  },
  {
    id: "15",
    symbol: "INTC",
    companyName: "Intel Corporation",
    type: "Dividend",
    dividendType: "Cash",
    details: "Quarterly cash dividend of $0.365 per share",
    date: recentDates[2],
    paymentDate: "2023-06-01",
    amount: 0.365,
  },
  // New corporate action types
  {
    id: "16",
    symbol: "BOND123",
    companyName: "Corporate Bond ETF",
    type: "Redemption",
    details: "Full redemption of bonds at par value",
    date: recentDates[1],
    processDate: futureDates[2],
    amount: 1000,
  },
  {
    id: "17",
    symbol: "FB",
    companyName: "Facebook, Inc.",
    type: "Name Change",
    details: "Company name changed to Meta Platforms, Inc. (META)",
    date: recentDates[3],
    processDate: futureDates[1],
  },
  {
    id: "18",
    symbol: "LEHM",
    companyName: "Lehman Brothers Holdings Inc.",
    type: "Worthless",
    details: "Securities declared worthless due to bankruptcy",
    date: recentDates[4],
    processDate: futureDates[3],
  },
  {
    id: "19",
    symbol: "BAC",
    companyName: "Bank of America Corporation",
    type: "Rights Distribution",
    details: "Distribution of rights to purchase additional shares at a discount",
    date: recentDates[2],
    processDate: futureDates[4],
    ratio: "1:10", // 1 right for every 10 shares owned
  },
  {
    id: "20",
    symbol: "BRK.B",
    companyName: "Berkshire Hathaway Inc.",
    type: "Dividend",
    dividendType: "Stock",
    details: "Special stock dividend of 0.05 shares per share held",
    date: recentDates[1],
    paymentDate: "2023-06-15",
    ratio: "0.05:1",
  },
  {
    id: "21",
    symbol: "COST",
    companyName: "Costco Wholesale Corporation",
    type: "Dividend",
    dividendType: "Stock",
    details: "Special stock dividend of 0.1 shares per share held",
    date: recentDates[3],
    paymentDate: "2023-07-10",
    ratio: "0.1:1",
  },
]

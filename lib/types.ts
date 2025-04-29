export interface CorporateAction {
  id: string
  symbol: string
  companyName: string
  type:
    | "Dividend"
    | "Forward Split"
    | "Reverse Split"
    | "Merger/Acquisition"
    | "Spinoff"
    | "Redemption"
    | "Name Change"
    | "Worthless"
    | "Rights Distribution"
  dividendType?: "Cash" | "Stock" // For categorizing dividends
  details: string
  date: string // ISO date string (ex-date)
  paymentDate?: string
  processDate?: string
  ratio?: string
  amount?: number
}

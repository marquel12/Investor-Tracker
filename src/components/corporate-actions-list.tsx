import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Badge } from "./ui/badge"
import type { CorporateAction } from "../lib/types"

interface CorporateActionsListProps {
  actions: CorporateAction[]
}

export function CorporateActionsList({ actions }: CorporateActionsListProps) {
  if (actions.length === 0) {
    return (
      <div className="text-center py-8 glass-card rounded-lg">
        <p className="text-slate-300">No corporate actions found.</p>
      </div>
    )
  }

  // Check if any of the actions are dividends
  const hasDividends = actions.some((action) => action.type === "Dividend")

  return (
    <Card className="glass-card border-slate-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-white">Corporate Actions</CardTitle>
        <CardDescription className="text-slate-300">
          {actions.length} event{actions.length !== 1 ? "s" : ""} found
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="table-header">
              <TableRow className="border-slate-700">
                <TableHead className="text-slate-300">Symbol</TableHead>
                <TableHead className="text-slate-300">Company</TableHead>
                <TableHead className="text-slate-300">Type</TableHead>
                <TableHead className="text-slate-300">Details</TableHead>
                <TableHead className="text-right text-slate-300">Ex-Date</TableHead>
                <TableHead className="text-right text-slate-300">Process Date</TableHead>
                {hasDividends && <TableHead className="text-right text-slate-300">Payment Date</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {actions.map((action) => (
                <TableRow key={action.id} className="border-slate-700 hover:bg-slate-800/50">
                  <TableCell className="font-medium text-blue-400">{action.symbol}</TableCell>
                  <TableCell className="text-white">{action.companyName}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`
                        ${action.type === "Dividend" && action.dividendType === "Cash" ? "bg-green-900/50 text-green-400 border-green-700" : ""}
                        ${action.type === "Dividend" && action.dividendType === "Stock" ? "bg-emerald-900/50 text-emerald-400 border-emerald-700" : ""}
                        ${action.type === "Forward Split" ? "bg-blue-900/50 text-blue-400 border-blue-700" : ""}
                        ${action.type === "Reverse Split" ? "bg-blue-900/50 text-blue-400 border-blue-700" : ""}
                        ${action.type === "Merger/Acquisition" ? "bg-purple-900/50 text-purple-400 border-purple-700" : ""}
                        ${action.type === "Spinoff" ? "bg-orange-900/50 text-orange-400 border-orange-700" : ""}
                        ${action.type === "Redemption" ? "bg-red-900/50 text-red-400 border-red-700" : ""}
                        ${action.type === "Name Change" ? "bg-indigo-900/50 text-indigo-400 border-indigo-700" : ""}
                        ${action.type === "Worthless" ? "bg-gray-900/50 text-gray-400 border-gray-700" : ""}
                        ${action.type === "Rights Distribution" ? "bg-yellow-900/50 text-yellow-400 border-yellow-700" : ""}
                      `}
                    >
                      {action.type === "Dividend" && action.dividendType
                        ? `${action.dividendType} ${action.type}`
                        : action.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-md truncate text-slate-300">{action.details}</TableCell>
                  <TableCell className="text-right text-slate-300">
                    {new Date(action.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right text-slate-300">
                    {action.processDate ? new Date(action.processDate).toLocaleDateString() : "N/A"}
                  </TableCell>
                  {hasDividends && (
                    <TableCell className="text-right text-slate-300">
                      {action.type === "Dividend" && action.paymentDate
                        ? new Date(action.paymentDate).toLocaleDateString()
                        : ""}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

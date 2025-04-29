"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"
import { CorporateActionsList } from "./corporate-actions-list"
import { Header } from "./header"
import { mockCorporateActions } from "../lib/mock-data"
import type { CorporateAction } from "../lib/types"

type FilterType =
  | "all"
  | "dividends"
  | "cash-dividends"
  | "stock-dividends"
  | "splits"
  | "mergers"
  | "redemptions"
  | "name-changes"
  | "worthless"
  | "rights"

export function CorporateActionsDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredActions, setFilteredActions] = useState(mockCorporateActions)
  const [filterType, setFilterType] = useState<FilterType>("all")

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      applyFilter(filterType, mockCorporateActions)
      return
    }

    const query = searchQuery.toLowerCase()
    const searchFiltered = mockCorporateActions.filter(
      (action) => action.symbol.toLowerCase().includes(query) || action.companyName.toLowerCase().includes(query),
    )

    applyFilter(filterType, searchFiltered)
    
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const applyFilter = (filter: FilterType, actions: CorporateAction[]) => {
    let result = actions

    switch (filter) {
      case "dividends":
        result = actions.filter((action) => action.type === "Dividend")
        break
      case "cash-dividends":
        result = actions.filter((action) => action.type === "Dividend" && action.dividendType === "Cash")
        break
      case "stock-dividends":
        result = actions.filter((action) => action.type === "Dividend" && action.dividendType === "Stock")
        break
      case "splits":
        result = actions.filter((action) => action.type === "Forward Split" || action.type === "Reverse Split")
        break
      case "mergers":
        result = actions.filter((action) => action.type === "Merger/Acquisition")
        break
      case "redemptions":
        result = actions.filter((action) => action.type === "Redemption")
        break
      case "name-changes":
        result = actions.filter((action) => action.type === "Name Change")
        break
      case "worthless":
        result = actions.filter((action) => action.type === "Worthless")
        break
      case "rights":
        result = actions.filter((action) => action.type === "Rights Distribution")
        break
      default:
        // "all" - no filtering needed
        break
    }

    setFilteredActions(result)
    setFilterType(filter)
  }

  const handleFilterChange = (value: string) => {
    const filter = value as FilterType
    if (searchQuery.trim()) {
      // If there's a search query, first filter by search, then by type
      const searchFiltered = mockCorporateActions.filter(
        (action) =>
          action.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
          action.companyName.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      applyFilter(filter, searchFiltered)
    } else {
      // If no search query, just filter by type
      applyFilter(filter, mockCorporateActions)
    }
  }

  // Group actions by date
  const groupedActions = filteredActions.reduce(
    (acc, action) => {
      const date = new Date(action.date).toISOString().split("T")[0]
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(action)
      return acc
    },
    {} as Record<string, typeof mockCorporateActions>,
  )

  // Sort dates in descending order
  const sortedDates = Object.keys(groupedActions).sort((a, b) => new Date(b).getTime() - new Date(a).getTime())

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold mb-2 text-white">Corporate Action Events</h1>
          <p className="text-blue-300">Track corporate actions for stocks in your portfolio</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Input
              placeholder="Search by symbol or company name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-10 bg-slate-900 border-slate-700 text-white placeholder:text-slate-400"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          </div>
          <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700">
            Search
          </Button>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-3">
            <label htmlFor="event-type-filter" className="text-white font-medium">
              Event Type:
            </label>
            <Select onValueChange={handleFilterChange} defaultValue="all">
              <SelectTrigger
                id="event-type-filter"
                className="w-[280px] bg-slate-900 border-slate-700 text-white focus:ring-blue-500"
              >
                <SelectValue placeholder="Select an event type" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-slate-700 text-white">
                <SelectGroup>
                  <SelectItem value="all" className="hover:bg-slate-800 cursor-pointer">
                    All Events
                  </SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel className="text-slate-400">Dividends</SelectLabel>
                  <SelectItem value="dividends" className="hover:bg-slate-800 cursor-pointer">
                    All Dividends
                  </SelectItem>
                  <SelectItem value="cash-dividends" className="hover:bg-slate-800 cursor-pointer pl-6">
                    Cash Dividends
                  </SelectItem>
                  <SelectItem value="stock-dividends" className="hover:bg-slate-800 cursor-pointer pl-6">
                    Stock Dividends
                  </SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel className="text-slate-400">Other Events</SelectLabel>
                  <SelectItem value="splits" className="hover:bg-slate-800 cursor-pointer">
                    Splits
                  </SelectItem>
                  <SelectItem value="mergers" className="hover:bg-slate-800 cursor-pointer">
                    Mergers & Acquisitions
                  </SelectItem>
                  <SelectItem value="redemptions" className="hover:bg-slate-800 cursor-pointer">
                    Redemptions
                  </SelectItem>
                  <SelectItem value="name-changes" className="hover:bg-slate-800 cursor-pointer">
                    Name Changes
                  </SelectItem>
                  <SelectItem value="worthless" className="hover:bg-slate-800 cursor-pointer">
                    Worthless
                  </SelectItem>
                  <SelectItem value="rights" className="hover:bg-slate-800 cursor-pointer">
                    Rights Distribution
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-6">
          {sortedDates.length > 0 ? (
            sortedDates.map((date) => (
              <div key={date} className="mb-6">
                <h2 className="text-xl font-semibold mb-3 text-blue-300">
                  {new Date(date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </h2>
                <CorporateActionsList actions={groupedActions[date]} />
              </div>
            ))
          ) : (
            <div className="text-center py-12 glass-card rounded-lg">
              <p className="text-slate-300">No corporate actions found for your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

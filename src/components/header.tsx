import { Bell, User } from "lucide-react"
import { Button } from "./ui/button"

export function Header() {
  return (
    <header className="glass-header sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="font-bold text-xl text-white">
            <span className="text-blue-400">Investor</span>Track
          </a>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <a href="/" className="text-sm font-medium text-white hover:text-blue-400 transition-colors">
            Dashboard
          </a>
        </nav>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-slate-800">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-slate-800">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}

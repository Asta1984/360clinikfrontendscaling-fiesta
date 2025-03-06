import { useState } from "react"
import { Link, Outlet, useLocation } from "react-router-dom"
import { Calendar, Clock, Home, LogOut, MapPin, Menu, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function DashboardLayout() {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Appointments", href: "/dashboard/appointments", icon: Calendar },
    { name: "Availability", href: "/dashboard/availability", icon: Clock },
    { name: "Locations", href: "/dashboard/locations", icon: MapPin },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ]

  return (
    <div className="flex h-screen bg-muted/40">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto border-r bg-white">
          <div className="flex items-center flex-shrink-0 px-4">
            <span className="text-xl font-semibold">Doctor Dashboard</span>
          </div>
          <div className="px-4 mt-6">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Dr. Jane Smith" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Dr. Jane Smith</p>
                <p className="text-xs text-muted-foreground">Cardiologist</p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-col flex-1">
            <nav className="flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    group flex items-center px-2 py-2 text-sm font-medium rounded-md
                    ${
                      location.pathname === item.href
                        ? "bg-primary text-primary-foreground"
                        : "text-gray-600 hover:bg-gray-100"
                    }
                  `}
                >
                  <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="p-2 mt-auto">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/logout">
                  <LogOut className="mr-3 h-5 w-5" />
                  Logout
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile menu */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden ml-2 mt-2">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex flex-col h-full">
            <div className="flex items-center flex-shrink-0 px-4 h-16">
              <span className="text-xl font-semibold">Doctor Dashboard</span>
            </div>
            <div className="px-4 py-4 border-b">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Dr. Jane Smith" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Dr. Jane Smith</p>
                  <p className="text-xs text-muted-foreground">Cardiologist</p>
                </div>
              </div>
            </div>
            <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    group flex items-center px-2 py-2 text-sm font-medium rounded-md
                    ${
                      location.pathname === item.href
                        ? "bg-primary text-primary-foreground"
                        : "text-gray-600 hover:bg-gray-100"
                    }
                  `}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="p-4 border-t">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/logout">
                  <LogOut className="mr-3 h-5 w-5" />
                  Logout
                </Link>
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="bg-white shadow-sm z-10 md:hidden">
          <div className="px-4 py-4 flex items-center justify-between">
            <h1 className="text-lg font-semibold">Doctor Dashboard</h1>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Dr. Jane Smith" />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-muted/20">
          <Outlet />
        </main>
      </div>
    </div>
  )
}


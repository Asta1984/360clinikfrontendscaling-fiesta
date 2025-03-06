import { useState } from "react"
import { CalendarIcon, ChevronLeft, ChevronRight, Filter, MoreHorizontal, Search } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Appointments() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const appointments = [
    {
      id: 1,
      patient: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JD",
      time: "10:00 AM",
      duration: "30 min",
      type: "Check-up",
      status: "confirmed",
      location: "City Hospital",
    },
    {
      id: 2,
      patient: "Jane Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JS",
      time: "11:30 AM",
      duration: "45 min",
      type: "Consultation",
      status: "confirmed",
      location: "City Hospital",
    },
    {
      id: 3,
      patient: "Robert Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "RJ",
      time: "2:00 PM",
      duration: "30 min",
      type: "Follow-up",
      status: "confirmed",
      location: "City Hospital",
    },
    {
      id: 4,
      patient: "Emily Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "ED",
      time: "3:30 PM",
      duration: "60 min",
      type: "New Patient",
      status: "pending",
      location: "Westside Clinic",
    },
    {
      id: 5,
      patient: "Michael Brown",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MB",
      time: "5:00 PM",
      duration: "30 min",
      type: "Check-up",
      status: "confirmed",
      location: "Westside Clinic",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
          <p className="text-muted-foreground">Manage and view your upcoming appointments</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="w-[160px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
          <Button variant="outline" size="sm">
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search appointments..." className="pl-8" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All appointments</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <Tabs defaultValue="list" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            </TabsList>
            <TabsContent value="list" className="space-y-4 mt-4">
              <Card>
                <CardHeader className="px-6 py-4">
                  <CardTitle className="text-lg">Today's Appointments</CardTitle>
                  <CardDescription>{date ? format(date, "EEEE, MMMM do, yyyy") : "Select a date"}</CardDescription>
                </CardHeader>
                <CardContent className="px-6">
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                      >
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src={appointment.avatar} alt={appointment.patient} />
                            <AvatarFallback>{appointment.initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{appointment.patient}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>{appointment.time}</span>
                              <span>•</span>
                              <span>{appointment.duration}</span>
                              <span>•</span>
                              <span>{appointment.location}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={appointment.status === "confirmed" ? "default" : "outline"}>
                            {appointment.status}
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View details</DropdownMenuItem>
                              <DropdownMenuItem>Reschedule</DropdownMenuItem>
                              <DropdownMenuItem>Cancel appointment</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="calendar" className="mt-4">
              <Card>
                <CardHeader className="px-6 py-4">
                  <CardTitle className="text-lg">Calendar View</CardTitle>
                  <CardDescription>View your appointments in a calendar format</CardDescription>
                </CardHeader>
                <CardContent className="px-6">
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">Calendar view is coming soon</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}


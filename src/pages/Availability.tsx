"use client"

import { useState } from "react"
import { CalendarIcon, Clock, Plus, Save, Trash2 } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

export default function Availability() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const weekdays = [
    { id: 1, name: "Monday", isActive: true },
    { id: 2, name: "Tuesday", isActive: true },
    { id: 3, name: "Wednesday", isActive: true },
    { id: 4, name: "Thursday", isActive: true },
    { id: 5, name: "Friday", isActive: true },
    { id: 6, name: "Saturday", isActive: false },
    { id: 7, name: "Sunday", isActive: false },
  ]

  const timeSlots = [
    { id: 1, day: "Monday", startTime: "09:00", endTime: "12:00", location: "City Hospital" },
    { id: 2, day: "Monday", startTime: "13:00", endTime: "17:00", location: "City Hospital" },
    { id: 3, day: "Tuesday", startTime: "10:00", endTime: "14:00", location: "Westside Clinic" },
    { id: 4, day: "Wednesday", startTime: "09:00", endTime: "12:00", location: "City Hospital" },
    { id: 5, day: "Wednesday", startTime: "13:00", endTime: "17:00", location: "City Hospital" },
    { id: 6, day: "Thursday", startTime: "10:00", endTime: "14:00", location: "Medical Center" },
    { id: 7, day: "Friday", startTime: "09:00", endTime: "15:00", location: "Westside Clinic" },
  ]


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Availability</h1>
        <p className="text-muted-foreground">Manage your working hours and availability</p>
      </div>

      <Tabs defaultValue="schedule">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="schedule">Weekly Schedule</TabsTrigger>
          <TabsTrigger value="exceptions">Exceptions</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Working Days</CardTitle>
              <CardDescription>Set which days of the week you work</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {weekdays.map((day) => (
                  <div key={day.id} className="flex items-center justify-between space-x-2 border p-4 rounded-lg">
                    <Label htmlFor={`day-${day.id}`} className="flex flex-col space-y-1">
                      <span>{day.name}</span>
                      <span className="text-sm font-normal text-muted-foreground">
                        {day.isActive ? "Working day" : "Day off"}
                      </span>
                    </Label>
                    <Switch id={`day-${day.id}`} checked={day.isActive} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Time Slots</CardTitle>
                <CardDescription>Set your working hours for each day</CardDescription>
              </div>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Add Slot
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timeSlots.map((slot) => (
                  <div
                    key={slot.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between border p-4 rounded-lg gap-4"
                  >
                    <div className="flex flex-col space-y-1">
                      <div className="font-medium">{slot.day}</div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        {slot.startTime} - {slot.endTime}
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <Badge variant="outline" className="w-fit">
                        {slot.location}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 ml-auto">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Button variant="outline">Cancel</Button>
              <Button>
                <Save className="h-4 w-4 mr-1" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="exceptions" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Date Exceptions</CardTitle>
                <CardDescription>Set days off or special working hours</CardDescription>
              </div>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Add Exception
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex-1">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select exception type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="day-off">Day Off</SelectItem>
                      <SelectItem value="special-hours">Special Hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="text-center py-8 text-muted-foreground">
                No exceptions added yet. Add your first exception.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


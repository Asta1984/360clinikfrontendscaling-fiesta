"use client"

import { useState } from "react"
import { Edit, MapPin, MoreHorizontal, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

export default function Locations() {
  const [open, setOpen] = useState(false)

  const locations = [
    {
      id: 1,
      name: "City Hospital",
      address: "123 Main St, City Center",
      description: "Main hospital location with full facilities",
      isActive: true,
    },
    {
      id: 2,
      name: "Westside Clinic",
      address: "456 West Ave, Westside",
      description: "Smaller clinic focused on outpatient care",
      isActive: true,
    },
    {
      id: 3,
      name: "Medical Center",
      address: "789 Health Blvd, Eastside",
      description: "Specialized center for cardiac patients",
      isActive: true,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Locations</h1>
          <p className="text-muted-foreground">Manage your consultation locations</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-1" />
              Add Location
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Location</DialogTitle>
              <DialogDescription>Add a new location where you provide consultations</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Location Name</Label>
                <Input id="name" placeholder="Enter location name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" placeholder="Enter full address" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea id="description" placeholder="Enter description" />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="active" defaultChecked />
                <Label htmlFor="active">Active Location</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Save Location</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {locations.map((location) => (
          <Card key={location.id}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div className="space-y-1">
                <CardTitle className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1 text-primary" />
                  {location.name}
                </CardTitle>
                <CardDescription>{location.address}</CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit location
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete location
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{location.description}</p>
              <Separator className="my-4" />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Label htmlFor={`active-${location.id}`}>Active</Label>
                  <Switch id={`active-${location.id}`} checked={location.isActive} />
                </div>
                <Button variant="outline" size="sm">
                  Set Availability
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}


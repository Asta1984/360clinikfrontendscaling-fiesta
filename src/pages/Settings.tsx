"use client"

import { useState } from "react"
import { Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Settings() {
  const [isPending, setIsPending] = useState(false)

  const handleSave = () => {
    setIsPending(true)
    // Simulate API call
    setTimeout(() => {
      setIsPending(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Dr. Jane Smith" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div className="space-y-2 flex-1">
                  <Label htmlFor="avatar">Profile Picture</Label>
                  <Input id="avatar" type="file" />
                  <p className="text-sm text-muted-foreground">Recommended size: 300x300px. Max file size: 2MB.</p>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="Jane" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Smith" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="dr.jane.smith@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="specialty">Specialty</Label>
                  <Select defaultValue="cardiology">
                    <SelectTrigger>
                      <SelectValue placeholder="Select specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cardiology">Cardiology</SelectItem>
                      <SelectItem value="dermatology">Dermatology</SelectItem>
                      <SelectItem value="neurology">Neurology</SelectItem>
                      <SelectItem value="orthopedics">Orthopedics</SelectItem>
                      <SelectItem value="pediatrics">Pediatrics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="bio">Professional Bio</Label>
                  <Textarea
                    id="bio"
                    rows={4}
                    defaultValue="Board-certified cardiologist with over 10 years of experience in treating cardiovascular diseases. Specializing in preventive cardiology and heart failure management."
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleSave} disabled={isPending}>
                {isPending ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-1" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Email Notifications</h3>
                <div className="grid gap-2">
                  {[
                    { id: "email-appointments", label: "New appointments" },
                    { id: "email-cancellations", label: "Appointment cancellations" },
                    { id: "email-reminders", label: "Appointment reminders" },
                    { id: "email-updates", label: "System updates" },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between space-x-2 border p-4 rounded-lg">
                      <Label htmlFor={item.id}>{item.label}</Label>
                      <Switch id={item.id} defaultChecked />
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">SMS Notifications</h3>
                <div className="grid gap-2">
                  {[
                    { id: "sms-appointments", label: "New appointments" },
                    { id: "sms-cancellations", label: "Appointment cancellations" },
                    { id: "sms-reminders", label: "Appointment reminders" },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between space-x-2 border p-4 rounded-lg">
                      <Label htmlFor={item.id}>{item.label}</Label>
                      <Switch id={item.id} defaultChecked={item.id === "sms-reminders"} />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Button variant="outline">Reset to Defaults</Button>
              <Button onClick={handleSave} disabled={isPending}>
                {isPending ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>System Preferences</CardTitle>
              <CardDescription>Customize your dashboard experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Appointment Settings</h3>
                <div className="grid gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="appointment-duration">Default Appointment Duration</Label>
                    <Select defaultValue="30">
                      <SelectTrigger id="appointment-duration">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="buffer-time">Buffer Time Between Appointments</Label>
                    <Select defaultValue="10">
                      <SelectTrigger id="buffer-time">
                        <SelectValue placeholder="Select buffer time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">No buffer</SelectItem>
                        <SelectItem value="5">5 minutes</SelectItem>
                        <SelectItem value="10">10 minutes</SelectItem>
                        <SelectItem value="15">15 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Display Settings</h3>
                <div className="grid gap-2">
                  {[
                    { id: "dark-mode", label: "Dark Mode" },
                    { id: "compact-view", label: "Compact View" },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between space-x-2 border p-4 rounded-lg">
                      <Label htmlFor={item.id}>{item.label}</Label>
                      <Switch id={item.id} defaultChecked={item.id === "compact-view"} />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Button variant="outline">Reset to Defaults</Button>
              <Button onClick={handleSave} disabled={isPending}>
                {isPending ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


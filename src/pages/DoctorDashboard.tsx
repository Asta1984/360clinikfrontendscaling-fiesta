import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, MapPin, Users } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Dr. Smith. Here's an overview of your practice.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">For this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">3 remaining</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Locations</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Across the city</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Working Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32h</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>Your next 5 appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { patient: "John Doe", time: "Today, 10:00 AM", type: "Check-up" },
                { patient: "Jane Smith", time: "Today, 11:30 AM", type: "Consultation" },
                { patient: "Robert Johnson", time: "Today, 2:00 PM", type: "Follow-up" },
                { patient: "Emily Davis", time: "Tomorrow, 9:30 AM", type: "New Patient" },
                { patient: "Michael Brown", time: "Tomorrow, 11:00 AM", type: "Check-up" },
              ].map((appointment, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">{appointment.patient}</p>
                    <p className="text-sm text-muted-foreground">{appointment.type}</p>
                  </div>
                  <div className="text-sm text-right">{appointment.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Locations</CardTitle>
            <CardDescription>Where you're currently practicing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "City Hospital", address: "123 Main St, City Center", days: "Mon, Wed, Fri" },
                { name: "Westside Clinic", address: "456 West Ave, Westside", days: "Tue, Thu" },
                { name: "Medical Center", address: "789 Health Blvd, Eastside", days: "Sat" },
              ].map((location, index) => (
                <div key={index} className="flex items-start justify-between border-b pb-2 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">{location.name}</p>
                    <p className="text-sm text-muted-foreground">{location.address}</p>
                  </div>
                  <div className="text-sm text-right">{location.days}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


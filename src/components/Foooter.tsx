import { Hexagon, Github, Twitter } from "lucide-react"
import { Footer } from "@/components/ui/footer"

function Foooter() {
  return (
    <div className="w-full">
      <Footer
        logo={<Hexagon className="h-10 w-10" />}
        brandName="360Clinik"
        socialLinks={[
          {
            icon: <Twitter className="h-5 w-5" />,
            href: "https://twitter.com",
            label: "Twitter",
          },
          {
            icon: <Github className="h-5 w-5" />,
            href: "https://github.com",
            label: "GitHub",
          },
        ]}
        mainLinks={[
          { href: "/Home", label: "Home" },
          { href: "/DoctorDashboard", label: "Doctor" },
          { href: "/PatientDashboard", label: "Patient" },
          { href: "/blog", label: "Blog" },
  
        ]}
        legalLinks={[
          { href: "/privacy", label: "Privacy" },
          { href: "/terms", label: "Terms" },
        ]}
        copyright={{
          text: "© 360Clinik",
          license: "All rights reserved",
        }}
      />
    </div>
  )
}

export { Foooter }
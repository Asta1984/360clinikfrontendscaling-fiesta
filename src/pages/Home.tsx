import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { TestimonialsSection } from "@/components/HOC/testimonials-with-marquee";
import {
    BellIcon,
    CalendarIcon,
    GlobeIcon,
    InputIcon,
    ClockIcon
  } from "@radix-ui/react-icons";
  
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";

const features = [
    {
      Icon: CalendarIcon,
      name: "Doctor Availability",
      description: "Doctors can set working hours, consultation locations, and manage their schedules in real-time.",
      href: "#availability",
      cta: "Set your availability",
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
    },
    {
      Icon: ClockIcon,
      name: "Instant Booking",
      description: "Patients can view real-time availability and book appointments with preferred doctors instantly.",
      href: "#booking",
      cta: "Find doctors",
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
    },
    {
      Icon: GlobeIcon,
      name: "Double Booking Protection",
      description: "Smart booking system prevents overlapping appointments and ensures slot exclusivity.",
      href: "#concurrency",
      cta: "How it works",
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
    },
    {
      Icon: InputIcon,
      name: "Easy Cancellation",
      description: "Patients can cancel appointments with automatic slot reopening. Doctors can manage cancellations efficiently.",
      href: "#cancellation",
      cta: "View policy",
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
    },
    {
      Icon: BellIcon,
      name: "Smart Reminders",
      description: "Automated email & SMS notifications for appointments, cancellations, and follow-up reminders.",
      href: "#notifications",
      cta: "Notification settings",
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
    },
  ];

const DoctorTestimonials = [
    {
      quote:"Dr. Alok Ranjan is a highly skilled neurosurgeon based in Hyderabad,showcasing his commitment to medical excellence and specialization. Dr. Ranjan has earned a reputation for his expertise in minimally invasive techniques ",
      name: "Dr Alok Ranjan",
      designation: "MBBS;  MCh (Neurosurgery) | Neurosurgeon",
      src: "https://drupal-cdn-hfaeddcdbng5hfbg.a01.azurefd.net/sites/default/files/2025-01/dr-alok-ranjan-neurosurgery-in-hyderabad.png",
    },
    {
      quote:
        "Dr. A Anitha is a highly experienced nephrologist based in Bangalore, As a female doctor, she combines her expertise with compassionate patient care, ensuring that every individual receives tailored treatment",
      name: "Dr A Anitha",
      designation: "MBBS, DNB (General Medicine), DNB (Nephrology) | Nephrology",
      src: "https://drupal-cdn-hfaeddcdbng5hfbg.a01.azurefd.net/sites/default/files/2025-01/dr-a-anitha-nephrology-in-bangalore.png",
    },
    {
      quote:
        "Dr. Andugulapati Sriram is a distinguished Neurologist based in Hyderabad, He is dedicated to providing top-quality care to his patients and specializes in diagnosing and treating various neurological disorders.",
      name: "Dr A Santosh Sriram",
      designation: "6+ Years Experience MBBS,MD(General Medicine),DM(Neurology) Neurology",
      src: "https://drupal-cdn-hfaeddcdbng5hfbg.a01.azurefd.net/sites/default/files/2025-02/dr-a-santosh-sriram-neurologist-in-hyderabad-apollo-hospitals-hyderguda.png",
    },
    {
      quote:
        "Dr Aamina Nahid is a distinguished Ent based at Apollo Speciality Hospitals Trichy, she has dedicated her career to providing exceptional healthcare services to patients. MS oto rhino laryngology.",
      name: "Dr Aamina Nahid ",
      designation: "4+ Years Experience MBBS, MS oto rhino laryngology | Ent Specialist",
      src: "https://drupal-cdn-hfaeddcdbng5hfbg.a01.azurefd.net/sites/default/files/2025-01/dr-aamina-nahid-ent-trichy.jpg",
    },
    {  
      quote:"Dr. Aanchal Mittal is a highly skilled ENT Specialist based in Bengaluru, She holds a Clinical Fellowship in Otology. Throughout her career, Dr. Mittal has made significant contributions. ",
      name: "Dr Aanchal Mittal ",
      designation: "6+ Years Experience Clinical Fellowship in Otology, MS-ENT, MBBS | Ent Specialist",
      src: "https://drupal-cdn-hfaeddcdbng5hfbg.a01.azurefd.net/sites/default/files/2025-02/screenshot-2025-02-21-at-3.11.44-pm.png",
    },
  ];

  const PatientTestimonials = [
    {
      author: {
        name: "Aarav Patel",
        handle: "@aaravhealth",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
      },
      text: "MedBook made finding the right specialist so easy! Got a same-day video consultation and proper prescription without leaving home.",
      href: "https://twitter.com/aaravhealth"
    },
    {
      author: {
        name: "Priya Sharma",
        handle: "@priyacare",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      text: "Excellent platform! Booked pediatric appointments for my twins within minutes. Reminder alerts and prescription history are super helpful.",
      href: "https://twitter.com/priyacare"
    },
    {
      author: {
        name: "Rajesh Kumar",
        handle: "@rajeshmed",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
      },
      text: "24/7 emergency consultation saved us during late hours. Doctor was compassionate and guided us perfectly through video call.",
      href: "https://twitter.com/rajeshmed"
    },
    {
      author: {
        name: "Anjali Gupta",
        handle: "@anjaliiyc",
        avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7b?w=150&h=150&fit=crop&crop=face"
      },
      text: "Best healthcare app I've used! Integrated medicine delivery with online consultation makes treatment seamless.",
      href: "https://twitter.com/anjaliiyc"
    },
    {
      author: {
        name: "Vikram Singh",
        handle: "@vikramwell",
        avatar: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=150&h=150&fit=crop&crop=face"
      },
      text: "Impressed with the detailed doctor profiles and patient reviews. Found perfect cardiologist for my father within our locality.",
      href: "https://twitter.com/vikramwell"
    }
  ]
  


export default function Hero() {
    return(
        <>
        <HeroGeometric badge="Book NOW" title1="Doctors anytime" title2="Patient anywhere"/>
        <div className="mx-auto flex max-w-container flex-col items-center gap-4 text-center p-20 sm:gap-16">
        <div className="flex flex-col items-center gap-4 px-4 sm:gap-8">
        <h2 className="max-w-[720px] text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight">A Hassle free Platform </h2>
        <p className="text-md max-w-[600px] font-medium text-muted-foreground sm:text-xl">
          Medical care a top priority
        </p>
        </div>
        </div>
        <BentoGrid className="container lg:grid-rows-3 p-10">
            {features.map((feature) => (
                <BentoCard key={feature.name} {...feature} />))}
        </BentoGrid>
        <AnimatedTestimonials testimonials={DoctorTestimonials}/>
        <TestimonialsSection title="Trusted by 90K+ Indians"
            description="Book your routine checkup at convinience"
            testimonials={PatientTestimonials}/>
        </>

    )
}
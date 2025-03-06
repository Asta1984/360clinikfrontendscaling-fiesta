import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useId } from "react";

export default function SignupButton() {
  const id = useId();
  const [role, setRole] = useState("doctor");
  // Common fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Patient field
  const [fullName, setFullName] = useState("");
  // Doctor fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [experience, setExperience] = useState("");
  const [locationCity, setLocationCity] = useState("");
  const [locationState, setLocationState] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setLoading(true);
    setError("");
    // Choose endpoint based on role
    const endpoint =
      role === "doctor"
        ? "https://three60clinicanimated-eureka.onrender.com/api/v1/doctors/signup"
        : "https://three60clinicanimated-eureka.onrender.com/api/v1/patients/signup";

    // Build payload based on role
    const payload =
      role === "doctor"
        ? {
          email,
          password,
          firstName,
          lastName,
          specialty,
          experience: Number(experience),
          location: {
            city: locationCity,
            state: locationState,
          },
          contactNumber,
          }
        : {
            fullName,
            email,
            password,
          };

    try {
      const { data } = await axios.post(endpoint, payload,{
        headers: { "Content-Type": "application/json" }});
      console.log("Signed up successfully", data);
      // Process successful signup (e.g., redirect or update auth state)
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Sign up</Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col w-full items-center gap-2">
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border"
            aria-hidden="true"
          >
            <svg
              className="stroke-zinc-800 dark:stroke-zinc-100"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 32 32"
              aria-hidden="true"
            >
              <circle cx="16" cy="16" r="12" fill="none" strokeWidth="8" />
            </svg>
          </div>
          <DialogHeader>
            <DialogTitle className="sm:text-center">Sign up</DialogTitle>
            <DialogDescription className="sm:text-center">
              We just need a few details to get you started.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            handleSignup();
          }}
        >
          <div className="space-y-4">
            {/* Role selection */}
            <div className="space-y-2">
              <Label htmlFor={`${id}-role`}>I am a</Label>
              <div id={`${id}-role`} className="flex gap-4">
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="doctor"
                    checked={role === "doctor"}
                    onChange={() => setRole("doctor")}
                  />
                  Doctor
                </label>
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="patient"
                    checked={role === "patient"}
                    onChange={() => setRole("patient")}
                  />
                  Patient
                </label>
              </div>
            </div>

            {/* Fields for doctor signup */}
            {role === "doctor" ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor={`${id}-firstName`}>First Name</Label>
                  <Input
                    id={`${id}-firstName`}
                    placeholder="John"
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${id}-lastName`}>Last Name</Label>
                  <Input
                    id={`${id}-lastName`}
                    placeholder="Doe"
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${id}-specialty`}>Specialty</Label>
                  <Input
                    id={`${id}-specialty`}
                    placeholder="Cardiology"
                    type="text"
                    required
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${id}-experience`}>Experience (years)</Label>
                  <Input
                    id={`${id}-experience`}
                    placeholder="5"
                    type="number"
                    required
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${id}-locationCity`}>City</Label>
                  <Input
                    id={`${id}-locationCity`}
                    placeholder="New York"
                    type="text"
                    required
                    value={locationCity}
                    onChange={(e) => setLocationCity(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${id}-locationState`}>State</Label>
                  <Input
                    id={`${id}-locationState`}
                    placeholder="NY"
                    type="text"
                    required
                    value={locationState}
                    onChange={(e) => setLocationState(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${id}-contactNumber`}>Contact Number</Label>
                  <Input
                    id={`${id}-contactNumber`}
                    placeholder="1234567890"
                    type="text"
                    required
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                  />
                </div>
              </>
            ) : (
              // Fields for patient signup
              <div className="space-y-2">
                <Label htmlFor={`${id}-name`}>Full Name</Label>
                <Input
                  id={`${id}-name`}
                  placeholder="Matt Welsh"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            )}

            {/* Common fields */}
            <div className="space-y-2">
              <Label htmlFor={`${id}-email`}>Email</Label>
              <Input
                id={`${id}-email`}
                placeholder="hi@yourcompany.com"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${id}-password`}>Password</Label>
              <Input
                id={`${id}-password`}
                placeholder="Enter your password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing up..." : "Sign up"}
          </Button>
        </form>

        <div className="flex items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
          <span className="text-xs text-muted-foreground">Or</span>
        </div>

        <Button variant="outline">Continue with Google</Button>

        <p className="text-center text-xs text-muted-foreground">
          By signing up you agree to our{" "}
          <a className="underline hover:no-underline" href="#">
            Terms
          </a>
          .
        </p>
      </DialogContent>
    </Dialog>
  );
}

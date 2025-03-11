import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom"; 
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useId } from "react";

export default function SignupButton() {
  const id = useId();
  const [role, setRole] = useState("doctor");
  const navigate = useNavigate(); 

  // Common fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Patient field
  const [pfirstName, setpFirstName] = useState("");
  const [plastName, setpLastName] = useState("");
  const [patientDateOfBirth, setPatientDateOfBirth] = useState("");
  const [patientContactNumber, setPatientContactNumber] = useState("");

  // Doctor fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [experience, setExperience] = useState("");
  const [locationCity, setLocationCity] = useState("");
  const [locationState, setLocationState] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(false); // new state
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
          email,
          password,
          firstName:pfirstName,
          lastName:plastName,
          dateOfBirth: patientDateOfBirth,
          contactNumber: patientContactNumber,
        };
    try {
      const { data } = await axios.post(endpoint, payload,{
        headers: { "Content-Type": "application/json" }});
      console.log("Signed up successfully", data);
      setIsSignedUp(true); 
      navigate("/Signin");
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <Card className=" md:w-2/5 bg-secondary/40 ">
        <CardContent>
          <div className="flex flex-col w-full items-center gap-2">
            <div
              className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border mt-8"
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
            <CardHeader>
              <CardTitle className="sm:text-center">Sign up</CardTitle>
              <CardDescription className="sm:text-center mb-8">
                We just need a few details to get you started.
              </CardDescription>
            </CardHeader>
          </div>
          {!isSignedUp ? (
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
                    <div className="grid grid-cols-2 gap-4">
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
                        <Label htmlFor={`${id}-experience`}>Experience</Label>
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
                        <Label htmlFor={`${id}-contactNumber`}>Contact</Label>
                        <Input
                          id={`${id}-contactNumber`}
                          placeholder="1234567890"
                          type="text"
                          required
                          value={contactNumber}
                          onChange={(e) => setContactNumber(e.target.value)}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  // Fields for patient signup
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`${id}-firstName`}>First Name</Label>
                      <Input
                        id={`${id}-firstName`}
                        placeholder="Jane"
                        type="text"
                        required
                        value={pfirstName}
                        onChange={(e) => setpFirstName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`${id}-lastName`}>Last Name</Label>
                      <Input
                        id={`${id}-lastName`}
                        placeholder="Doe"
                        type="text"
                        required
                        value={plastName}
                        onChange={(e) => setpLastName(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`${id}-dateOfBirth`}>Date of Birth</Label>
                      <Input
                        id={`${id}-dateOfBirth`}
                        placeholder="1990-05-15"
                        type="date"
                        required
                        value={patientDateOfBirth}
                        onChange={(e) => setPatientDateOfBirth(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`${id}-patientContactNumber`}>
                        Contact Number
                      </Label>
                      <Input
                        id={`${id}-patientContactNumber`}
                        placeholder="1234567890"
                        type="text"
                        required
                        value={patientContactNumber}
                        onChange={(e) =>
                          setPatientContactNumber(e.target.value)
                        }
                      />
                    </div>
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
          ) : (
            <div className="flex flex-col items-center gap-4">
              <p className="text-green-600">Signup successful!</p>
            </div>
          )}

          <div className="flex items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
            <span className="text-xs text-muted-foreground">Or</span>
          </div>
          <div className="flex flex-col items-center">
            <Button variant="outline">Login with Google</Button>
          </div>
          <p className="text-center text-xs text-muted-foreground">
            By signing up you agree to our{" "}
            <a className="underline hover:no-underline" href="#">
              Terms
            </a>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

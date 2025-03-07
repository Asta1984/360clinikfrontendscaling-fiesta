import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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

export default function SigninButton() {
  const id = useId();
  const [role, setRole] = useState("doctor"); // default selection
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignin = async () => {
    setLoading(true);
    setError("");
    // Choose endpoint based on role
    const endpoint =
      role === "doctor"
        ? "https://three60clinicanimated-eureka.onrender.com/api/v1/doctors/signin"
        : "https://three60clinicanimated-eureka.onrender.com/api/v1/patients/signin";

    try {
      const { data } = await axios.post(endpoint, { email, password });
      console.log("Signed in successfully", data);
      // Save token or update state as needed
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <Card className=" md:w-1/3 bg-secondary/40">
      <CardContent>
        <div className="flex flex-col items-center gap-2">
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
          <CardHeader>
            <CardTitle className="sm:text-center">Welcome back</CardTitle>
            <CardDescription className="sm:text-center mb-8">
              Enter your credentials to login to your account.
            </CardDescription>
          </CardHeader>
        </div>

        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            handleSignin();
          }}
        >
          <div className="space-y-4">
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
          <div className="flex justify-between gap-2">
            <div className="flex items-center gap-2">
              <Checkbox id={`${id}-remember`} />
              <Label htmlFor={`${id}-remember`} className="font-normal text-muted-foreground">
                Remember me
              </Label>
            </div>
            <a className="text-sm underline hover:no-underline" href="#">
              Forgot password?
            </a>
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <div className="flex items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
          <span className="text-xs text-muted-foreground">Or</span>
        </div>
         <div className="flex flex-col items-center">
         <Button variant="outline">Login with Google</Button>
         </div>
      </CardContent>
    </Card>
    </div>
  );
}

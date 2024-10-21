"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { z } from "zod"; 
import { Button } from "@/components/ui/button"; 
import { Input } from "@/components/ui/input"; 
import { Card } from "@/components/ui/card"; 
import { Typography } from "@/components/ui/typography"; 

const loginSchema = z.object({
  email: z.string().email("Email is invalid"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState<string>(""); 
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/dashboard");
    }
  }, [sessionStatus, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    // Validate form data

    const validationResult = loginSchema.safeParse({ email, password });
    if (!validationResult.success) {

    // Check for errors 
      setError(
        validationResult.error.format().email?._errors[0] ||
        validationResult.error.format().password?._errors[0] ||
        ""
      );
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      setError("");
    }
  };

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    sessionStatus !== "authenticated" && (
      <div className="flex min-h-screen flex-col items-center justify-center p-24">
        <Card className="p-8 w-96 border-2 border-[#d9ced4]">
          <h1 className="text-center  font-semibold mb-8">
            Login
          </h1>
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="email"
              className="p-2 bg-white border-2  px-3 py-3 mb-4"
              placeholder="Email"
              required
            />
            <Input
              type="password"
              name="password"
              className="p-2 bg-white border-2  px-3 py-3 mb-4"
              placeholder="Password"
              required
            />
            <Button type="submit" className="w-full bg-blue-800 text-white hover:bg-blue-500">
              Sign In
            </Button>
            {error && <p className="text-red-600 text-[16px] mb-4">{error}</p>}
          </form>
          <Button
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-400 mt-4"
            onClick={() => signIn("github")}
          >
            Sign In with GitHub
          </Button>
          <div className="text-center text-gray-400 mt-4">- OR -</div>
          <Link
            className="block text-center text-blue-800 hover:text-orange-400 mt-2"
            href="/register"
          >
            Register Here
          </Link>
        </Card>
      </div>
    )
  );
};

export default Login;

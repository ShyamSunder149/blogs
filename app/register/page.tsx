"use client";
import Image from "next/image"
import Link from "next/link"
import { useState } from 'react';
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";

// try implementing debouncing

interface AuthProps {
    title: String
}

type User = {
    email: String
    password: String
}

export default function AuthenticationPage({ ...props }: AuthProps) {
    return (
        <div>
            <div className="md:hidden">
                <Image
                    src="/examples/authentication-light.png"
                    width={1280}
                    height={843}
                    alt="Authentication"
                    className="block dark:hidden"
                />
                <Image
                    src="/examples/authentication-dark.png"
                    width={1280}
                    height={843}
                    alt="Authentication"
                    className="hidden dark:block"
                />
            </div>
            <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <Link
                    href="/login"
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "absolute right-4 top-4 md:right-8 md:top-8"
                    )}
                >
                    Login
                </Link>
                <div className="flex flex-col h-screen my-auto items-center font-sans bg-zinc-900">
                    <div className="m-auto text-center">
                        <div className="text-2xl">
                            Blog App
                        </div>
                        <div>
                            Publish your ideas to the world!
                        </div>
                    </div>
                </div>
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Register
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Enter your credentials
                            </p>
                        </div>
                        <UserAuthForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

function UserAuthForm({ className, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [user, setUser] = useState<User>({ email: "", password: "" });
    const router = useRouter();

    // add zod validation

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)
        try {
            let res = await axios.post(process.env.NEXT_PUBLIC_BASE_URL + "/api/user", user)
            console.log(res);
            router.push("/login")
        } catch(err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    async function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }))
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={onSubmit}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            id="email"
                            placeholder="name@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                            name = "email"
                            onChange={(e) => handleInputChange(e)}
                            required
                        />
                    </div>
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">
                            Password
                        </Label>
                        <Input
                            id="password"
                            placeholder="password"
                            type="password"
                            autoCapitalize="none"
                            autoComplete="none"
                            autoCorrect="off"
                            disabled={isLoading}
                            name = "password"
                            onChange={(e) => handleInputChange(e)}
                            required
                        />
                    </div>
                    <Button disabled={isLoading}>
                        Sign up
                    </Button>
                </div>
            </form>
        </div>
    )
}
"use client"

import * as React from "react"
import Link from "next/link"
import { signIn, signOut } from "next-auth/react"
import { ModeToggle } from "../ui/dark_mode_button"
import { useSession } from "next-auth/react"
import { redirect } from 'next/navigation';
import { usePathname } from 'next/navigation'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

function profile() {

}

export function Appbar() {

  const session = useSession();

  return (
    <div className="flex flex-row p-5">
      <div className="font-semibold text-2xl">
        <Link href="/">
          Blogger
        </Link>
      </div>
      <div className="ml-auto">
        <NavigationMenu>
          <NavigationMenuList>
            {session.data === null ? (
              <NavigationMenuItem>
                <NavigationMenuLink onClick={() => signIn()} className={navigationMenuTriggerStyle()}>
                  Login
                </NavigationMenuLink>
              </NavigationMenuItem>
            ) : (
              <NavigationMenuItem>
                {usePathname() !== "/" ?
                  <NavigationMenuLink onClick={() => redirect("/")} className={navigationMenuTriggerStyle()}>
                    Home
                  </NavigationMenuLink>
                  : null}
                <NavigationMenuLink onClick={() => redirect("/profile")} className={navigationMenuTriggerStyle()}>
                  Profile
                </NavigationMenuLink>
                <NavigationMenuLink onClick={() => signOut()} className={navigationMenuTriggerStyle()}>
                  Logout
                </NavigationMenuLink>
              </NavigationMenuItem>
            )}
            <NavigationMenuItem>
              <ModeToggle />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  )
}

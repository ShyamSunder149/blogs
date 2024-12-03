"use client"

import * as React from "react"
import Link from "next/link"
import { signIn, signOut } from "next-auth/react"
import { ModeToggle } from "../ui/dark_mode_button"
import { useSession } from "next-auth/react"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

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

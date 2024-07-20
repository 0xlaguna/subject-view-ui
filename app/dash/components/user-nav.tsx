"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import LogOut from "./log-out"
import useGetMe from "@/hooks/useGetMe"
import { Icons } from "@/components/icons"

export function UserNav() {

  const { getMeData, getMeLoading } = useGetMe()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative size-8 rounded-full">
          <Avatar className="size-8">
            {getMeLoading ? (
                <Icons.spinner className="mr-2 size-4 animate-spin" />
              ) : <AvatarFallback>{getMeData?.first_name.charAt(0)}{getMeData?.last_name.charAt(0)}</AvatarFallback>
            }
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>

      {getMeLoading ? (
        <Icons.spinner className="mr-2 size-4 animate-spin" />
      ) : <>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{getMeData?.first_name} {getMeData?.last_name}</p>
            <p className="text-muted-foreground text-xs leading-none">
              {getMeData?.email}
            </p>
          </div>
        </DropdownMenuLabel>
      </>}
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <LogOut />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

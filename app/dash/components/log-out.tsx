import {
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu"

import { useRouter } from "next/navigation"

export default function LogOut() {
  const router = useRouter()

  const handleSignOut = async () => {
    const res = await fetch('/api/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      router.push('/auth');
    } else {
      console.error('Failed to sign out');
    }
  };

  return (
    <DropdownMenuItem onClick={handleSignOut}>
      Log out
      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
    </DropdownMenuItem>
  )
}

"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { statuses } from "../data/data"
import { subjectSchema } from "../data/schema"
import { useQueryClient } from "@tanstack/react-query"
import useDeleteSubject from "@/hooks/useSubjectDelete"
import { useToast } from "@/components/ui/use-toast"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
  refetch: () => void
}

export function DataTableRowActions<TData>({
  row,
  refetch
}: DataTableRowActionsProps<TData>) {
  const { toast } = useToast()
  const subject = subjectSchema.parse(row.original)

  const { destroySubject } = useDeleteSubject({id: subject.id})
  const queryClient = useQueryClient()

  const onDelete = () => {
    queryClient.cancelQueries({queryKey: ["subject-list"]})
    destroySubject()

    //@ts-ignore
    queryClient.setQueryData(["subject-list"], (oldData: { list } | undefined) => {
      if (!oldData) return oldData
      return { //@ts-ignore
        list: oldData.list.filter(subject => subject.id !== subject.id)
      }
    })

    queryClient.invalidateQueries({queryKey: ["subject-list"]})
    refetch()

    toast({
      variant: "destructive",
      description: `Subject #${subject.id} deleted successfully.`,
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={subject.status}>
              {statuses.map((label) => (
                <DropdownMenuRadioItem key={label.value} value={label.value}>
                  {label.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Delete
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                subject and remove the data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}

import {
  CrossCircledIcon,
  ActivityLogIcon,
  PersonIcon,
} from "@radix-ui/react-icons"

export const statuses = [
  {
    value: "InScreening",
    label: "InScreening",
    icon: ActivityLogIcon,
  },
  {
    value: "Enrolled",
    label: "Enrolled",
    icon: PersonIcon,
  },
  {
    value: "Failed",
    label: "Failed",
    icon: CrossCircledIcon,
  },
]

export const genders = [
  {
    label: "Female",
    value: "Female",
    icon: PersonIcon,
  },
  {
    label: "Male",
    value: "Male",
    icon: PersonIcon,
  },
]

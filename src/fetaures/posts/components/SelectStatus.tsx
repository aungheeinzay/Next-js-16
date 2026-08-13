"use client"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SelectStatusProps {
  value?: string;
  onValueChange?: (value: string) => void;
}

export function SelectStatus({ value, onValueChange, ...props }: SelectStatusProps) {
  const status = [
    //IN_PROGESS"|"DONE
    { label: "Done", value: "Done" },
    { label: "In Progress", value: "IN_PROGESS" }
  ]
  console.log("status",value);
  
  return (
    <Select value={value} onValueChange={onValueChange} {...props}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select status..." />
      </SelectTrigger>
      <SelectContent className="w-full">
        {status.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
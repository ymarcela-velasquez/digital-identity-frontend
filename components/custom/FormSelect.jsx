import { cn } from "@/lib/utils"
import React from "react"
import {
  FormControl,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const FormSelect = React.forwardRef(
  ({ className, field, onChange, value = "", ...props }, ref) => {
    const { name, placeholder = "Select an option", options, disabled } = props
    const setValue = value ? { defaultValue: value } : {}
    return (
      <Select
        name={name}
        onValueChange={onChange}
        disabled={disabled}
        {...setValue}
      >
        <FormControl
          className={cn("bg-transparent", field?.className)}
          ref={ref}
        >
          <SelectTrigger className="capitalize">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={`select-option-${option.value}`}
              value={option.value}
              className="capitalize"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  },
)

FormSelect.displayName = "FormSelect"

export { FormSelect }

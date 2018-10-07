type DateInput = string | number | Date
interface TimeZoneOptions {
  timeZone: string
}

declare function formatToTimeZone (dateInput: DateInput, format: string, options: TimeZoneOptions): string

export { formatToTimeZone }

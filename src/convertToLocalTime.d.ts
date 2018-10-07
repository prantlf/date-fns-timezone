type DateInput = string | number | Date
interface TimeZoneOptions {
  timeZone: string
}

declare function convertToLocalTime (dateInput: DateInput, options: TimeZoneOptions): Date

export { convertToLocalTime }

type DateInput = string | number | Date
interface TimeZoneOptions {
  timeZone: string
}

declare function convertToTimeZone (dateInput: DateInput, options: TimeZoneOptions): Date

export { convertToTimeZone }

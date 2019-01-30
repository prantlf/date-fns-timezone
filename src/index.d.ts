type DateInput = string | number | Date
interface TimeZoneOptions {
  timeZone: string
}
interface FormatOptions {
  locale?: Object
}
interface FormatTimeZoneOptions extends FormatOptions {
  timeZone: string
}

declare function convertToLocalTime (dateInput: DateInput, options: TimeZoneOptions): Date
declare function convertToTimeZone (dateInput: DateInput, options: TimeZoneOptions): Date

declare function parseFromString (dateString: string, format: string): Date
declare function parseFromTimeZone (dateString: string, format: string, options: TimeZoneOptions): Date
declare function parseFromTimeZone (dateString: string, options: TimeZoneOptions): Date

declare function formatToTimeZone (dateInput: DateInput, format: string, options: FormatTimeZoneOptions): string

export {
  convertToLocalTime, convertToTimeZone, parseFromString, parseFromTimeZone, formatToTimeZone
}

export as namespace dateFnsTimezone;

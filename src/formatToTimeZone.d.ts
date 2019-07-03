type DateInput = string | number | Date
interface FormatOptions {
  locale?: Object
}
interface FormatTimeZoneOptions extends FormatOptions {
  timeZone: string
}

declare function formatToTimeZone (dateInput: DateInput, format: string, options: FormatTimeZoneOptions): string

export { formatToTimeZone }

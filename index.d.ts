type DateInput = string | number | Date
interface TimeZoneOptions {
  timeZone: string
}

declare function convertToLocalTime (dateInput: DateInput, options: TimeZoneOptions): Date
declare function convertToTimeZone (dateInput: DateInput, options: TimeZoneOptions): Date

declare function parseFromString (dateString: string, format: string): Date
declare function parseFromTimeZone (dateString: string, format: string | TimeZoneOptions, options?: TimeZoneOptions): Date

declare function formatToTimeZone (dateInput: DateInput, format: string, options: TimeZoneOptions): string

export {
  convertToLocalTime, convertToTimeZone, parseFromString, parseFromTimeZone, formatToTimeZone
}

declare module 'date-fns-timezone' {
  export {
    convertToLocalTime, convertToTimeZone, parseFromString, parseFromTimeZone, formatToTimeZone
  }
}

declare module 'date-fns-timezone/dist/convertToLocalTime' {
  export { convertToLocalTime }
}

declare module 'date-fns-timezone/dist/convertToTimeZone' {
  export { convertToTimeZone }
}

declare module 'date-fns-timezone/dist/parseFromString' {
  export { parseFromString }
}

declare module 'date-fns-timezone/dist/parseFromTimeZone' {
  export { parseFromTimeZone }
}

declare module 'date-fns-timezone/dist/formatToTimeZone' {
  export { formatToTimeZone }
}

export as namespace dateFnsTimezone;

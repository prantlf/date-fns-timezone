interface TimeZoneOptions {
  timeZone: string
}

declare function parseFromTimeZone (dateString: string, format: string, options: TimeZoneOptions): Date
declare function parseFromTimeZone (dateString: string, options: TimeZoneOptions): Date

export { parseFromTimeZone }

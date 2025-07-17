import moment, { type Moment } from "moment"
import "moment-timezone"

declare module "moment" {
  interface Moment {
    fromPast(this: Moment, past: Moment): string
    format(
      formatStr:
        | keyof LongDateFormatSpec
        | "short"
        | "DMYHmZ"
        | "DMYZ"
        | "DMY"
        | string,
      options?: {
        fallback?: string
        timezone?: string | "local"
      },
    ): string
  }
}

export const DATE_FORMAT = "llll"

// Convert milliseconds to date
export const millisecondsToDays = (value: any) => {
  const ms = Number(value)
  if (Number.isNaN(ms)) return ""
  return ms / (1000 * 60 * 60 * 24)
}

// Update locale with your custom relativeTimeConfig
moment.updateLocale("en", {
  longDateFormat: {
    LTS: "h:mm:ss A",
    LT: "h:mm A",
    L: "MM/DD/YYYY",
    LL: "MMMM D, YYYY",
    LLL: "MMMM D, YYYY h:mm A",
    LLLL: "dddd, MMMM D, YYYY h:mm A",
    llll: "MMM DD YYYY HH:mm:ss (Z UTC)", // Custom format
  },
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "%d secs",
    ss: "%d secs",
    m: "%d min",
    mm: "%d mins",
    h: "%d hr",
    hh: "%d hrs",
    dd: "%d days",
  },
  invalidDate: "-",
})

moment.locale("en")

const originalFromNow = moment.prototype.fromNow as Moment["fromNow"]

// Save the original format function
const originalFormat = moment.prototype.format

// Override the format function of moment
moment.prototype.format = function (
  formatStr: string,
  options?: {
    fallback?: string
    timezone?: string
  },
): string {
  const { fallback = "", timezone } = options || {}
  if (!this.isValid()) return fallback
  if (!(this.year() >= 1970)) return fallback

  let m = this.clone()
  // Nếu có timezone, convert về timezone đó
  if (timezone) {
    if (timezone === "local") {
      m = m.tz(moment.tz.guess())
    } else {
      m = m.tz(timezone)
    }
  }

  // Check for the custom format "short"
  if (formatStr === "short") {
    return originalFormat.call(m, "MMM Do YYYY, HH:mm [UTC]Z") // Format date with ordinal numbers
  }

  if (formatStr === "DMYHmZ") {
    return originalFormat.call(m, "DD-MM-YYYY, HH:mm [UTC]Z") // Format date with ordinal numbers
  }

  if (formatStr === "DMYZ") {
    return originalFormat.call(m, "DD-MM-YYYY [UTC]Z") // Format date with ordinal numbers
  }

  if (formatStr === "DMY") {
    return originalFormat.call(m, "DD-MM-YYYY") // Format date with ordinal numbers
  }

  // Use the original format function for other formats
  return originalFormat.call(m, formatStr)
}

moment.prototype.fromPast = function (
  this: moment.Moment,
  past: moment.Moment,
) {
  const duration = moment.duration(this.diff(past))
  const seconds = duration.asSeconds()
  const minutes = duration.asMinutes()
  const hours = duration.asHours()
  const days = duration.asDays()

  if (seconds < 60) {
    return seconds < 2 ? "1 sec" : `${Math.floor(seconds)} secs`
  } else if (minutes < 60) {
    return minutes < 2 ? "1 min" : `${Math.floor(minutes)} mins`
  } else if (hours < 48) {
    return hours < 2 ? "1 hr" : `${Math.floor(hours)} hrs`
  } else {
    return `${Math.floor(days)} days`
  }
}

moment.prototype.fromNow = function (
  this: moment.Moment,
  ...args: Parameters<typeof originalFromNow>
) {
  if (this.locale() !== "en") return originalFromNow.apply(this, args)

  const now = moment()

  return `${now.fromPast(this)} ago`

  // const durationInSeconds = Math.floor(now.diff(this, "seconds", true));
  // if (durationInSeconds <= 1) return `${durationInSeconds} sec ago`;
  // if (durationInSeconds < 60) return `${durationInSeconds} secs ago`;

  // const durationInHours = now.diff(this, "hours", true);

  // if (durationInHours >= 24 && durationInHours < 48) {
  //   return `${Math.floor(durationInHours)} hrs ago`;
  // }
  // if (durationInHours >= 720) {
  //   const durationInDays = Math.floor(now.diff(this, "days", true));
  //   return `${durationInDays} days ago`;
  // }

  // return originalFromNow.apply(this, args);
}

/**
 * Get client side timezone.
 *
 * @returns {(+|-)HH:mm} - Where `HH` is 2 digits hours and `mm` 2 digits minutes.
 * @example
 * // From Indian/Reunion with UTC+4
 * // '+04:00'
 * getTimeZone()
 */
export const getTimeZone = (): string => {
  const timezoneOffset = new Date().getTimezoneOffset()
  const offset = Math.abs(timezoneOffset)
  const offsetOperator = timezoneOffset < 0 ? "+" : "-"
  const offsetHours = Math.floor(offset / 60)
    .toString()
    .padStart(2, "0")
  const offsetMinutes = Math.floor(offset % 60)
    .toString()
    .padStart(2, "0")

  return `${offsetOperator}${offsetHours}:${offsetMinutes}`
}

export default moment

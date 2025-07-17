"use client"

import type { Moment, MomentInput } from "moment"
import { memo } from "react"
import moment from "utils/moment"

type Props = {
  time: MomentInput
  format?: Parameters<Moment["format"]>[0]
}

const Timezone = ({ time, format = "DMYHmZ" }: Props) => {
  return moment(time).format(format, {
    timezone: "local",
  })
}

export default memo(Timezone, (prev, next) => {
  return prev.time === next.time && prev.format === next.format
})

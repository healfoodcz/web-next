'use client'

import { useReportWebVitals } from 'next/web-vitals'

export default function WebVitals() {
  useReportWebVitals((metric) => {
    // TODO report(webVitals)
    console.log(metric)
  })

  return <></>
}

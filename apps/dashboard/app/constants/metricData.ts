export enum FCP {
  displayName = 'First Contentful Paint',
  description = 'First Contentful Paint marks the time at which the first text or image is painted.',
  documentationLink = 'https://developer.chrome.com/docs/lighthouse/performance/first-contentful-paint/',
  abbreviation = 'FCP',
}

export enum LCP {
  displayName = 'Largest Contentful Paint',
  description = 'Largest Contentful Paint marks the time at which the largest text or image is painted.',
  documentationLink = 'https://developer.chrome.com/docs/lighthouse/performance/lighthouse-largest-contentful-paint/',
  abbreviation = 'LCP',
}

export enum SI {
  displayName = 'Speed Index',
  description = 'Speed Index shows how quickly the contents of a page are visibly populated.',
  documentationLink = 'https://developer.chrome.com/docs/lighthouse/performance/speed-index/',
  abbreviation = 'SI',
}

export enum TBT {
  displayName = 'Total Blocking Time',
  description = 'Sum of all time periods between FCP and Time to Interactive, when task length exceeded 50ms, expressed in milliseconds.',
  documentationLink = 'https://developer.chrome.com/docs/lighthouse/performance/lighthouse-total-blocking-time/',
  abbreviation = 'TBT',
}

export enum CLS {
  displayName = 'Cumulative Layout Shift',
  description = 'Cumulative Layout Shift measures the movement of visible elements within the viewport.',
  documentationLink = 'https://web.dev/articles/cls',
  abbreviation = 'CLS',
}

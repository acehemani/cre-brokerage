import posthog from 'posthog-js'

export function initAnalytics() {
  if (typeof window !== 'undefined') {
    posthog.init('phc_placeholder', {
      api_host: 'https://us.i.posthog.com',
      loaded: (ph) => {
        if (import.meta.env.DEV) ph.opt_out_capturing()
      }
    })
  }
}

export { posthog }

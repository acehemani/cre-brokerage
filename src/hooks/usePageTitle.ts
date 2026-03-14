import { useEffect } from 'react'

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = `${title} | BrokerPower`
    return () => {
      document.title = 'BrokerPower'
    }
  }, [title])
}

import { useState, useEffect } from "react"

  const useDataApi = () => {
  const [apiData, setApiData] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api-eu.okotoki.com/coins')
        if (!response.ok) throw new Error(`${response.status}`)
        const data = await response.json()
        setApiData(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])

  return { apiData, loading, error }

}

export default useDataApi


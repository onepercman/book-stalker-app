import { Service } from "@/services/app.service"
import { useLocalSearchParams } from "expo-router"
import { useEffect } from "react"

export function useReadTimePost() {
  const { id } = useLocalSearchParams()

  useEffect(() => {
    const interval = setInterval(function () {
      if (id) {
        Service.readTime.post(id as string)
      }
    }, 60 * 1000)

    return () => {
      clearInterval(interval)
    }
  }, [id])
}

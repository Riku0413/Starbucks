import { useState } from 'react'

const useItemCategory = () => {
  const [itemCategory, setItemCategory] = useState("フラペチーノ®")
  const [contextAllData, setContextAllData] = useState()
  const [contextData, setContextData] = useState()
  const [contextChart, setContextChart] = useState()

  return {
    itemCategory,
    setItemCategory,
    contextAllData,
    setContextAllData,
    contextData,
    setContextData,
    contextChart,
    setContextChart
  }
}

export default useItemCategory

import { useState } from 'react'

const useItemCategory = () => {
  const [itemCategory, setItemCategory] = useState("フラペチーノ®")
  const [contextData, setContextData] = useState()
  const [contextChart, setContextChart] = useState()

  return {
    itemCategory,
    setItemCategory,
    contextData,
    setContextData,
    contextChart,
    setContextChart
  }
}

export default useItemCategory

import { useState } from 'react'

const useItemCategory = (initialItemCategory) => {
  const [itemCategory, setItemCategory] = useState(initialItemCategory)
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

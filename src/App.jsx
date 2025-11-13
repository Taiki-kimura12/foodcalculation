import { useState } from 'react'
import Navigation from './components/Navigation'
import TodayRecipes from './components/TodayRecipes'
import RecipePlanning from './components/RecipePlanning'
import Inventory from './components/Inventory'
import Orders from './components/Orders'
import DinnerRecord from './components/DinnerRecord'
import { inventoryData, recipesData, masterRecipesData, dinnerRecipesData } from './data/mockData'

function App() {
  const [activeTab, setActiveTab] = useState('recipes')
  const [inventory, setInventory] = useState(inventoryData)
  const [recipes, setRecipes] = useState(recipesData)
  const [selectedDate, setSelectedDate] = useState(null)

  // 14日分の日付を生成
  const generatePlanDates = () => {
    const dates = {}
    const today = new Date()
    for (let i = 0; i < 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      const dateStr = date.toISOString().split('T')[0]
      
      // サンプルデータ
      if (i === 0) dates[dateStr] = ['pasta', 'curry', 'ginger']
      else if (i === 3) dates[dateStr] = ['hamburg', 'fish', 'salad', 'soup', 'stir-fry']
      else if (i === 6) dates[dateStr] = ['tempura', 'rice']
      else dates[dateStr] = []
    }
    return dates
  }

  const [planDates, setPlanDates] = useState(generatePlanDates())

  const getStatus = (itemName) => {
    const item = inventory[itemName]
    const rate = item.stock / item.threshold
    if (rate < 0.5) return 'critical'
    if (rate < 1.0) return 'warning'
    return 'normal'
  }

  const completeRecipe = (recipeId) => {
    const recipe = recipes.find(r => r.id === recipeId)
    if (!recipe) return

    if (confirm(`${recipe.name}の仕込みを完了しますか？\n在庫から材料が減算されます。`)) {
      // 在庫を減算
      const newInventory = { ...inventory }
      recipe.ingredients.forEach(ing => {
        newInventory[ing.name].stock -= ing.required
        if (newInventory[ing.name].stock < 0) newInventory[ing.name].stock = 0
      })
      setInventory(newInventory)

      // レシピを完了状態に
      const newRecipes = recipes.map(r =>
        r.id === recipeId ? { ...r, completed: true } : r
      )
      setRecipes(newRecipes)

      alert(`✅ ${recipe.name}の仕込みが完了しました！\n在庫が更新されました。`)
    }
  }

  const recordDinnerServing = (recipeId, servings) => {
    const recipe = dinnerRecipesData.find(r => r.id === recipeId)
    if (!recipe) return false

    // 在庫を減算
    const newInventory = { ...inventory }
    recipe.ingredients.forEach(ing => {
      const totalRequired = ing.perServing * servings
      newInventory[ing.name].stock -= totalRequired
      if (newInventory[ing.name].stock < 0) newInventory[ing.name].stock = 0
    })
    setInventory(newInventory)

    return true
  }

  const toggleRecipe = (dateStr, recipeId) => {
    setPlanDates(prev => {
      const newDates = { ...prev }
      if (!newDates[dateStr]) newDates[dateStr] = []
      
      const index = newDates[dateStr].indexOf(recipeId)
      if (index > -1) {
        newDates[dateStr].splice(index, 1)
      } else {
        newDates[dateStr].push(recipeId)
      }
      
      return newDates
    })
  }

  const alertCount = Object.keys(inventory).filter(name => getStatus(name) !== 'normal').length

  return (
    <div className="app">
      <Navigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        alertCount={alertCount}
      />
      
      {activeTab === 'recipes' && (
        <TodayRecipes 
          recipes={recipes}
          inventory={inventory}
          completeRecipe={completeRecipe}
        />
      )}

      {activeTab === 'planning' && (
        <RecipePlanning
          planDates={planDates}
          masterRecipes={masterRecipesData}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          toggleRecipe={toggleRecipe}
        />
      )}

      {activeTab === 'dinner' && (
        <DinnerRecord
          dinnerRecipes={dinnerRecipesData}
          inventory={inventory}
          recordDinnerServing={recordDinnerServing}
        />
      )}

      {activeTab === 'inventory' && (
        <Inventory
          inventory={inventory}
          getStatus={getStatus}
        />
      )}

      {activeTab === 'orders' && (
        <Orders 
          inventory={inventory}
          getStatus={getStatus}
        />
      )}
    </div>
  )
}

export default App
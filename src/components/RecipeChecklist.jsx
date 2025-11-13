function RecipeChecklist({ selectedDate, planDates, masterRecipes, toggleRecipe }) {
  const date = new Date(selectedDate)
  const weekdays = ['日', '月', '火', '水', '木', '金', '土']
  const displayDate = `${date.getMonth() + 1}月${date.getDate()}日 (${weekdays[date.getDay()]})`
  
  const recipeIds = planDates[selectedDate] || []
  const totalTime = recipeIds.reduce((sum, id) => {
    const recipe = masterRecipes.find(r => r.id === id)
    return sum + (recipe ? recipe.prepTime : 0)
  }, 0)

  return (
    <div className="recipe-detail-section active">
      <div className="recipe-detail-header">
        <div>
          <div className="recipe-detail-title">{displayDate}の仕込み予定</div>
          <div className="recipe-detail-meta">📝 {recipeIds.length}品目 | ⏱️ 合計 {totalTime}分</div>
        </div>
      </div>
      <div className="recipe-checklist">
        {masterRecipes.map(recipe => {
          const isSelected = recipeIds.includes(recipe.id)
          return (
            <div
              key={recipe.id}
              className={`recipe-checklist-item ${isSelected ? 'selected' : ''}`}
              onClick={() => toggleRecipe(selectedDate, recipe.id)}
            >
              <input 
                type="checkbox" 
                checked={isSelected}
                onChange={() => {}}
                onClick={(e) => e.stopPropagation()}
              />
              <span className="recipe-checklist-label">{recipe.name}</span>
              <span className="recipe-checklist-time">⏱️ {recipe.prepTime}分</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RecipeChecklist
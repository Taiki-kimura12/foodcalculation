function DayCard({ dateStr, planDates, masterRecipes, isSelected, onSelect }) {
  const date = new Date(dateStr)
  const weekdays = ['日', '月', '火', '水', '木', '金', '土']
  const recipeIds = planDates[dateStr] || []
  const totalTime = recipeIds.reduce((sum, id) => {
    const recipe = masterRecipes.find(r => r.id === id)
    return sum + (recipe ? recipe.prepTime : 0)
  }, 0)
  const hasRecipes = recipeIds.length > 0

  return (
    <div 
      className={`day-card ${isSelected ? 'active' : ''} ${hasRecipes ? 'has-recipes' : ''}`}
      onClick={() => onSelect(dateStr)}
    >
      <div className="day-header">
        <span className="day-weekday">{weekdays[date.getDay()]}</span>
      </div>
      <div className="day-date">{date.getDate()}</div>
      <div className="day-month">{date.getMonth() + 1}月</div>
      <div className="day-info">
        {hasRecipes ? (
          <>
            <div className="day-recipes-count">📝 {recipeIds.length}品目</div>
            <div className="day-total-time">⏱️ {totalTime}分</div>
          </>
        ) : (
          <div className="day-empty">未設定</div>
        )}
      </div>
    </div>
  )
}

export default DayCard
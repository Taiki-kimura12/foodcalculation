import DayCard from './DayCard'
import RecipeChecklist from './RecipeChecklist'

function RecipePlanning({ planDates, masterRecipes, selectedDate, setSelectedDate, toggleRecipe }) {
  const dateStrs = Object.keys(planDates).sort()

  return (
    <div className="content active">
      <div className="section">
        <div className="section-header">
          <div>
            <h2 className="section-title">仕込み予定管理</h2>
            <div className="section-subtitle">週間カレンダーで仕込みを計画 / 日付をクリックして仕込みを選択</div>
          </div>
        </div>
        <div className="section-body">
          {/* Weekly Calendar */}
          <div className="calendar-container">
            <div className="calendar-scroll">
              {dateStrs.map(dateStr => (
                <DayCard
                  key={dateStr}
                  dateStr={dateStr}
                  planDates={planDates}
                  masterRecipes={masterRecipes}
                  isSelected={selectedDate === dateStr}
                  onSelect={setSelectedDate}
                />
              ))}
            </div>
          </div>

          {/* Recipe Detail Section */}
          {selectedDate && (
            <RecipeChecklist
              selectedDate={selectedDate}
              planDates={planDates}
              masterRecipes={masterRecipes}
              toggleRecipe={toggleRecipe}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default RecipePlanning
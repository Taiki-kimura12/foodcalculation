import { useState } from 'react'

function RecipeCard({ recipe, inventory, completeRecipe }) {
  const [expandedIngredients, setExpandedIngredients] = useState({})

  const getRecipeStatus = () => {
    if (recipe.completed) return 'completed'
    
    for (let ing of recipe.ingredients) {
      const item = inventory[ing.name]
      if (item.stock < ing.required) return 'shortage'
    }
    
    for (let ing of recipe.ingredients) {
      const item = inventory[ing.name]
      if (item.stock - ing.required < item.threshold) return 'warning'
    }
    
    return 'ok'
  }

  const toggleIngredient = (index) => {
    setExpandedIngredients(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const status = getRecipeStatus()

  let statusBadge
  if (status === 'completed') statusBadge = <span className="badge badge-normal"><span className="dot"></span>完了</span>
  else if (status === 'shortage') statusBadge = <span className="badge badge-critical"><span className="dot"></span>材料不足</span>
  else if (status === 'warning') statusBadge = <span className="badge badge-warning"><span className="dot"></span>発注基準値下回る</span>
  else statusBadge = <span className="badge badge-normal"><span className="dot"></span>材料OK</span>

  return (
    <div className={`recipe-card ${status === 'shortage' ? 'shortage' : ''} ${status === 'completed' ? 'completed' : ''}`}>
      <div className="recipe-header">
        <div>
          <h3 className="recipe-title">{recipe.name}</h3>
          <div className="recipe-meta">👥 {recipe.servings}人前 | ⏱️ {recipe.prepTime}分</div>
        </div>
        {statusBadge}
      </div>
      
      <div className="ingredients">
        <div className="ingredients-header">必要材料（クリックで詳細）</div>
        {recipe.ingredients.map((ing, idx) => {
          const item = inventory[ing.name]
          const afterStock = item.stock - ing.required
          const ingStatus = afterStock < 0 ? 'shortage' : afterStock < item.threshold ? 'warning' : ''
          const isExpanded = expandedIngredients[idx]
          
          return (
            <div key={idx} className={`ingredient ${ingStatus}`}>
              <div className="ingredient-summary" onClick={() => toggleIngredient(idx)}>
                <div className="ingredient-row">
                  <span className="ingredient-name">{ing.name}</span>
                  <span>{ing.required.toFixed(1)} {item.unit} 使用</span>
                </div>
                {!recipe.completed && <span className={`expand-icon ${isExpanded ? 'expanded' : ''}`}>▼</span>}
              </div>
              {!recipe.completed && (
                <div className={`ingredient-details ${isExpanded ? 'expanded' : ''}`}>
                  <div className="stock-detail">
                    <div className="stock-row">
                      <span>現在在庫:</span>
                      <span><strong>{item.stock.toFixed(1)} {item.unit}</strong></span>
                    </div>
                    <div className="stock-row">
                      <span>仕込み後:</span>
                      <span className={afterStock < 0 ? 'text-danger' : afterStock < item.threshold ? 'text-warning' : ''}>
                        <strong>{afterStock.toFixed(1)} {item.unit}</strong>
                      </span>
                    </div>
                    <div className="stock-row">
                      <span>発注基準:</span>
                      <span><strong>{item.threshold.toFixed(1)} {item.unit}</strong></span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
      
      {recipe.completed ? (
        <div className="completion-info">✓ 仕込み完了 - 在庫から材料を減算済み</div>
      ) : (
        <button 
          className="btn btn-primary" 
          onClick={() => completeRecipe(recipe.id)}
          disabled={status === 'shortage'}
          style={{ width: '100%' }}
        >
          {status === 'shortage' ? '❌ 材料不足で完了不可' : '✓ 仕込み完了'}
        </button>
      )}
    </div>
  )
}

export default RecipeCard
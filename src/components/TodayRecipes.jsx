import { useState } from 'react'
import RecipeCard from './RecipeCard'

function TodayRecipes({ recipes, inventory, completeRecipe }) {
  return (
    <div className="content active">
      <div className="section">
        <div className="section-header">
          <div>
            <h2 className="section-title">本日の仕込み表</h2>
            <div className="section-subtitle">仕込み完了すると在庫から自動で材料が減算されます</div>
          </div>
        </div>
        <div className="section-body">
          <div className="recipe-cards-container">
            {recipes.map(recipe => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                inventory={inventory}
                completeRecipe={completeRecipe}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TodayRecipes
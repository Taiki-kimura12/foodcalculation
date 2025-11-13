import { useState } from 'react'

function DinnerRecord({ dinnerRecipes, inventory, recordDinnerServing }) {
  // 各メニューの提供食数を管理
  const [servingCounts, setServingCounts] = useState({})
  const [todayRecords, setTodayRecords] = useState([])

  // 食数を更新
  const updateServingCount = (recipeId, count) => {
    setServingCounts(prev => ({
      ...prev,
      [recipeId]: count
    }))
  }

  // 各材料の合計使用量を計算
  const calculateTotalIngredients = () => {
    const totals = {}

    Object.entries(servingCounts).forEach(([recipeId, count]) => {
      if (!count || count <= 0) return

      const recipe = dinnerRecipes.find(r => r.id === recipeId)
      if (!recipe) return

      recipe.ingredients.forEach(ing => {
        if (!totals[ing.name]) {
          totals[ing.name] = 0
        }
        totals[ing.name] += ing.perServing * count
      })
    })

    return totals
  }

  // 記録可能かチェック
  const canRecord = () => {
    const hasAnyServings = Object.values(servingCounts).some(count => count > 0)
    if (!hasAnyServings) return false

    const totals = calculateTotalIngredients()

    // 在庫が足りるかチェック
    for (let [ingredientName, required] of Object.entries(totals)) {
      const item = inventory[ingredientName]
      if (!item || item.stock < required) {
        return false
      }
    }

    return true
  }

  // 記録処理
  const handleRecord = () => {
    if (!canRecord()) return

    const recordItems = []
    let totalServings = 0

    Object.entries(servingCounts).forEach(([recipeId, count]) => {
      if (count > 0) {
        const recipe = dinnerRecipes.find(r => r.id === recipeId)
        recordItems.push({ recipeId, recipeName: recipe.name, count })
        totalServings += count
      }
    })

    if (confirm(`以下の提供を記録しますか？\n${recordItems.map(item => `${item.recipeName}: ${item.count}食`).join('\n')}\n\n合計: ${totalServings}食\n在庫から材料が減算されます。`)) {
      // 各レシピごとに在庫を減算
      let success = true
      recordItems.forEach(item => {
        const result = recordDinnerServing(item.recipeId, item.count)
        if (!result) success = false
      })

      if (success) {
        // 記録を追加
        const now = new Date()
        const newRecords = recordItems.map(item => ({
          id: Date.now() + Math.random(),
          time: `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`,
          recipeName: item.recipeName,
          servings: item.count
        }))
        setTodayRecords([...newRecords, ...todayRecords])

        // フォームをリセット
        setServingCounts({})

        alert(`✅ ${totalServings}食の記録が完了しました！\n在庫が更新されました。`)
      }
    }
  }

  const totalIngredients = calculateTotalIngredients()
  const totalServings = Object.values(servingCounts).reduce((sum, count) => sum + (parseInt(count) || 0), 0)

  return (
    <div className="content active">
      <div className="section">
        <div className="section-header">
          <div>
            <h2 className="section-title">ディナー提供記録</h2>
            <div className="section-subtitle">レシート形式で各メニューの提供食数を記入</div>
          </div>
        </div>

        <div className="section-body">
          {/* メニュー入力テーブル */}
          <div className="recipe-card" style={{ marginBottom: '2rem' }}>
            <div className="recipe-header">
              <h3 className="recipe-title">🍽️ 本日の提供メニュー</h3>
              {totalServings > 0 && (
                <span className="badge badge-normal">
                  <span className="dot"></span>
                  合計 {totalServings}食
                </span>
              )}
            </div>

            <div style={{ padding: '1rem' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '0.95rem'
              }}>
                <thead>
                  <tr style={{
                    borderBottom: '2px solid var(--color-border)',
                    backgroundColor: '#f8f9fa'
                  }}>
                    <th style={{
                      padding: '0.75rem',
                      textAlign: 'left',
                      fontWeight: '600',
                      width: '60%'
                    }}>メニュー名</th>
                    <th style={{
                      padding: '0.75rem',
                      textAlign: 'right',
                      fontWeight: '600',
                      width: '40%'
                    }}>提供食数</th>
                  </tr>
                </thead>
                <tbody>
                  {dinnerRecipes.map(recipe => {
                    const count = servingCounts[recipe.id] || ''

                    return (
                      <tr key={recipe.id} style={{
                        borderBottom: '1px solid var(--color-border-light)'
                      }}>
                        <td style={{
                          padding: '0.75rem',
                          fontWeight: count > 0 ? '600' : '400',
                          color: count > 0 ? 'var(--color-text)' : 'var(--color-text-light)'
                        }}>
                          {recipe.name}
                        </td>
                        <td style={{
                          padding: '0.75rem',
                          textAlign: 'right'
                        }}>
                          <input
                            type="number"
                            min="0"
                            value={count}
                            onChange={(e) => updateServingCount(recipe.id, parseInt(e.target.value) || 0)}
                            placeholder="0"
                            style={{
                              width: '100px',
                              padding: '0.5rem',
                              borderRadius: '6px',
                              border: '1px solid var(--color-border)',
                              fontSize: '0.95rem',
                              textAlign: 'right',
                              backgroundColor: count > 0 ? '#f0f9ff' : 'white'
                            }}
                          />
                          <span style={{ marginLeft: '0.5rem', color: 'var(--color-text-light)' }}>食</span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* 材料使用量サマリー */}
          {Object.keys(totalIngredients).length > 0 && (
            <div className="recipe-card" style={{ marginBottom: '2rem' }}>
              <div className="recipe-header">
                <h3 className="recipe-title">📊 材料使用量サマリー</h3>
              </div>

              <div style={{ padding: '1rem' }}>
                <div className="ingredients">
                  <div className="ingredients-header">合計使用材料（全メニュー合計）</div>
                  {Object.entries(totalIngredients)
                    .sort((a, b) => a[0].localeCompare(b[0]))
                    .map(([ingredientName, totalRequired]) => {
                      const item = inventory[ingredientName]
                      const afterStock = item.stock - totalRequired
                      const status = afterStock < 0 ? 'shortage' : afterStock < item.threshold ? 'warning' : ''

                      return (
                        <div key={ingredientName} className={`ingredient ${status}`}>
                          <div className="ingredient-summary">
                            <div className="ingredient-row">
                              <span className="ingredient-name">{ingredientName}</span>
                              <span style={{ fontWeight: '600' }}>
                                {totalRequired.toFixed(2)} {item.unit} 使用
                              </span>
                            </div>
                          </div>
                          <div className="ingredient-details expanded">
                            <div className="stock-detail">
                              <div className="stock-row">
                                <span>現在在庫:</span>
                                <span><strong>{item.stock.toFixed(1)} {item.unit}</strong></span>
                              </div>
                              <div className="stock-row">
                                <span>提供後:</span>
                                <span className={afterStock < 0 ? 'text-danger' : afterStock < item.threshold ? 'text-warning' : ''}>
                                  <strong>{afterStock.toFixed(2)} {item.unit}</strong>
                                </span>
                              </div>
                              <div className="stock-row">
                                <span>発注基準:</span>
                                <span><strong>{item.threshold.toFixed(1)} {item.unit}</strong></span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                </div>

                <button
                  className="btn btn-primary"
                  onClick={handleRecord}
                  disabled={!canRecord()}
                  style={{ width: '100%', marginTop: '1rem' }}
                >
                  {totalServings === 0 ? '📝 提供食数を入力してください' :
                   !canRecord() ? '❌ 材料不足で記録不可' :
                   `✓ ${totalServings}食の提供を記録`}
                </button>
              </div>
            </div>
          )}

          {/* 本日の記録履歴 */}
          {todayRecords.length > 0 && (
            <div className="recipe-card">
              <div className="recipe-header">
                <h3 className="recipe-title">📋 本日の提供履歴</h3>
                <span className="badge badge-normal">
                  <span className="dot"></span>
                  {todayRecords.length}件の記録
                </span>
              </div>

              <div style={{ padding: '1rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{
                      borderBottom: '2px solid var(--color-border)',
                      textAlign: 'left'
                    }}>
                      <th style={{ padding: '0.75rem', fontWeight: '600' }}>時刻</th>
                      <th style={{ padding: '0.75rem', fontWeight: '600' }}>レシピ名</th>
                      <th style={{ padding: '0.75rem', fontWeight: '600', textAlign: 'right' }}>提供食数</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todayRecords.map(record => (
                      <tr key={record.id} style={{ borderBottom: '1px solid var(--color-border-light)' }}>
                        <td style={{ padding: '0.75rem' }}>{record.time}</td>
                        <td style={{ padding: '0.75rem' }}>{record.recipeName}</td>
                        <td style={{ padding: '0.75rem', textAlign: 'right', fontWeight: '600' }}>
                          {record.servings}食
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DinnerRecord
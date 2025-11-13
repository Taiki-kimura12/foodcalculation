function Inventory({ inventory, getStatus }) {
  // カテゴリごとにグループ化
  const categories = {}
  Object.entries(inventory).forEach(([name, item]) => {
    if (!categories[item.category]) {
      categories[item.category] = []
    }
    categories[item.category].push({ name, ...item })
  })

  // ステータス順にソート
  Object.keys(categories).forEach(category => {
    categories[category].sort((a, b) => {
      const statusOrder = { critical: 0, warning: 1, normal: 2 }
      return statusOrder[getStatus(a.name)] - statusOrder[getStatus(b.name)]
    })
  })

  const categoryEmojis = {
    '野菜': '🥬',
    '調味料': '🧂',
    '肉類': '🥩'
  }

  return (
    <div className="content active">
      <div className="section">
        <div className="section-header">
          <div>
            <h2 className="section-title">在庫一覧</h2>
            <div className="section-subtitle">リアルタイムで在庫を反映 / カテゴリ別表示</div>
          </div>
        </div>
        <div className="section-body">
          {Object.entries(categories).map(([category, items]) => (
            <div key={category} className="category-section">
              <div className="category-header">
                <h3 className="category-title">{categoryEmojis[category]} {category}</h3>
                <span className="category-count">{items.length}アイテム</span>
              </div>
              <div className="inventory-tickets-container">
                {items.map(item => {
                  const status = getStatus(item.name)
                  const stockRate = ((item.stock / item.threshold) * 100).toFixed(0)
                  const remaining = (item.stock - item.threshold).toFixed(1)
                  
                  let statusColor = 'var(--color-success)'
                  if (status === 'critical') statusColor = 'var(--color-danger)'
                  else if (status === 'warning') statusColor = 'var(--color-warning)'
                  
                  let statusBadge
                  if (status === 'critical') statusBadge = <span className="badge badge-critical"><span className="dot"></span>在庫切れ間近</span>
                  else if (status === 'warning') statusBadge = <span className="badge badge-warning"><span className="dot"></span>要発注</span>
                  else statusBadge = <span className="badge badge-normal"><span className="dot"></span>正常</span>
                  
                  return (
                    <div key={item.name} className={`inventory-ticket ${status}`}>
                      <div className="ticket-header">
                        <div className="ticket-name">{item.name}</div>
                      </div>
                      <div className="ticket-stock-display">
                        <div className="ticket-stock-number" style={{ color: statusColor }}>
                          {item.stock.toFixed(1)}<span className="ticket-stock-unit">{item.unit}</span>
                        </div>
                        <div className="ticket-stock-label">現在在庫</div>
                      </div>
                      <div className="ticket-progress">
                        <div className="ticket-progress-bar">
                          <div 
                            className={`ticket-progress-fill ${status}`}
                            style={{ width: `${Math.min(stockRate, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="ticket-info">
                        <div className="ticket-info-item">
                          <div className="ticket-info-label">発注基準</div>
                          <div className="ticket-info-value">{item.threshold.toFixed(1)}</div>
                        </div>
                        <div className="ticket-info-item">
                          <div className="ticket-info-label">在庫率</div>
                          <div className="ticket-info-value">{stockRate}%</div>
                        </div>
                        <div className="ticket-info-item">
                          <div className="ticket-info-label">残量</div>
                          <div className="ticket-info-value">{remaining}</div>
                        </div>
                      </div>
                      <div className="ticket-status">
                        {statusBadge}
                      </div>
                      <button 
                        className={`btn ${status === 'critical' ? 'btn-danger' : status === 'warning' ? 'btn-warning' : 'btn-secondary'}`}
                        style={{ width: '100%' }}
                      >
                        {status !== 'normal' ? '📦 発注リストに追加' : '📋 詳細を見る'}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Inventory

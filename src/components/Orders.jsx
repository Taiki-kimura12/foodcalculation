function Orders({ inventory, getStatus }) {
  // 全アイテムをステータス順にソート
  const items = Object.entries(inventory).sort((a, b) => {
    const statusOrder = { critical: 0, warning: 1, normal: 2 }
    return statusOrder[getStatus(a[0])] - statusOrder[getStatus(b[0])]
  })

  return (
    <div className="content active">
      <div className="section">
        <div className="section-header">
          <div>
            <h2 className="section-title">発注管理</h2>
            <div className="section-subtitle">在庫状況に応じた発注リスト</div>
          </div>
          <button className="btn btn-success">
            📦 一括発注処理
          </button>
        </div>
        <div className="section-body">
          <table className="spreadsheet-table">
            <thead>
              <tr>
                <th>アイテム名</th>
                <th>カテゴリ</th>
                <th>現在在庫</th>
                <th>発注基準</th>
                <th>不足量</th>
                <th>在庫率</th>
                <th>ステータス</th>
                <th>推奨発注量</th>
                <th>アクション</th>
              </tr>
            </thead>
            <tbody>
              {items.map(([name, item]) => {
                const status = getStatus(name)
                const stockRate = ((item.stock / item.threshold) * 100).toFixed(0)
                const shortage = Math.max(0, item.threshold - item.stock).toFixed(1)
                const recommendedOrder = (item.threshold * 1.5 - item.stock).toFixed(1)
                
                let statusBadge
                if (status === 'critical') statusBadge = <span className="badge badge-critical"><span className="dot"></span>緊急</span>
                else if (status === 'warning') statusBadge = <span className="badge badge-warning"><span className="dot"></span>要発注</span>
                else statusBadge = <span className="badge badge-normal"><span className="dot"></span>正常</span>
                
                return (
                  <tr key={name} className={status}>
                    <td><strong>{name}</strong></td>
                    <td>{item.category}</td>
                    <td><strong>{item.stock.toFixed(1)} {item.unit}</strong></td>
                    <td>{item.threshold.toFixed(1)} {item.unit}</td>
                    <td className={status !== 'normal' ? 'text-danger' : ''}>
                      {shortage} {item.unit}
                    </td>
                    <td><strong>{stockRate}%</strong></td>
                    <td>{statusBadge}</td>
                    <td><strong>{recommendedOrder} {item.unit}</strong></td>
                    <td>
                      {status !== 'normal' ? (
                        <button className={`btn ${status === 'critical' ? 'btn-danger' : 'btn-warning'} btn-sm`}>
                          📦 発注する
                        </button>
                      ) : (
                        <button className="btn btn-secondary btn-sm">
                          📋 詳細
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Orders
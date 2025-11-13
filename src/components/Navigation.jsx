function Navigation({ activeTab, setActiveTab, alertCount }) {
  return (
    <nav className="nav">
      <div className="nav-brand">🍽️ 在庫管理</div>
      <div className="nav-menu">
        <button 
          className={`nav-item ${activeTab === 'recipes' ? 'active' : ''}`}
          onClick={() => setActiveTab('recipes')}
        >
          今日の仕込み
        </button>
        <button
          className={`nav-item ${activeTab === 'planning' ? 'active' : ''}`}
          onClick={() => setActiveTab('planning')}
        >
          仕込み予定
        </button>
        <button
          className={`nav-item ${activeTab === 'dinner' ? 'active' : ''}`}
          onClick={() => setActiveTab('dinner')}
        >
          ディナー記録
        </button>
        <button
          className={`nav-item ${activeTab === 'inventory' ? 'active' : ''}`}
          onClick={() => setActiveTab('inventory')}
        >
          在庫一覧
          {alertCount > 0 && <span className="badge-alert">{alertCount}</span>}
        </button>
        <button 
          className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          発注管理
          {alertCount > 0 && <span className="badge-alert">{alertCount}</span>}
        </button>
      </div>
      <select className="store-select">
        <option>🏪 渋谷店</option>
        <option>🏪 新宿店</option>
        <option>🏪 池袋店</option>
      </select>
    </nav>
  )
}

export default Navigation
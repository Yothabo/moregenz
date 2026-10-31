import '../design-system/styles/design-system.css';

const metrics = [
  { label: 'Total revenue', value: 'R48,290.00', change: '+12.8%', note: 'Compared with last month' },
  { label: 'Orders', value: '284', change: '+8.2%', note: 'Compared with last month' },
  { label: 'Products', value: '36', change: '4 low', note: 'Products needing attention' },
  { label: 'Customers', value: '192', change: '+16.4%', note: 'Compared with last month' },
];

const orders = [
  { id: '#YT-1048', customer: 'Amara Nkosi', date: '31 Oct 2026', product: 'Velvet Oud · 50ml', amount: 'R1,250.00', status: 'Processing' },
  { id: '#YT-1047', customer: 'Liam Dlamini', date: '30 Oct 2026', product: 'Santal Essence · 100ml', amount: 'R1,850.00', status: 'Delivered' },
  { id: '#YT-1046', customer: 'Zanele Mokoena', date: '30 Oct 2026', product: 'Rose Élixir · 50ml', amount: 'R980.00', status: 'Pending' },
  { id: '#YT-1045', customer: 'Noah Petersen', date: '29 Oct 2026', product: 'Amber Woods · 100ml', amount: 'R1,650.00', status: 'Delivered' },
];

const products = [
  { name: 'Velvet Oud', category: 'His', price: 'R1,250', stock: 24, status: 'In stock' },
  { name: 'Rose Élixir', category: 'Hers', price: 'R980', stock: 8, status: 'Low stock' },
  { name: 'Santal Essence', category: 'His', price: 'R1,850', stock: 0, status: 'Out of stock' },
];

const navigation = ['Overview', 'Products', 'Orders', 'Customers', 'Settings'];

function Status({ value }: { value: string }) {
  const statusClass = value.toLowerCase().replace(/ /g, '-');
  return <span className={`yds-status yds-status-${statusClass}`}>{value}</span>;
}

export default function DesignSystemTest() {
  return (
    <main className="yds-app">
      <aside className="yds-sidebar">
        <a className="yds-brand" href="#">
          <span className="yds-brand-mark">Y</span>
          <span>
            <strong>YOTAABO</strong>
            <small>ADMINISTRATION</small>
          </span>
        </a>

        <div className="yds-side-label">WORKSPACE</div>
        <nav className="yds-side-nav">
          {navigation.map((item, index) => (
            <button key={item} className={index === 0 ? 'yds-nav-item active' : 'yds-nav-item'}>
              <span className="yds-nav-icon">
                {['◫', '◇', '▤', '♙', '⚙'][index]}
              </span>
              {item}
              {item === 'Orders' && <span className="yds-nav-count">6</span>}
            </button>
          ))}
        </nav>

        <div className="yds-sidebar-bottom">
          <div className="yds-help-card">
            <span className="yds-help-icon">?</span>
            <strong>Need assistance?</strong>
            <p>Get help managing your store.</p>
            <button>Contact support ↗</button>
          </div>
          <button className="yds-profile">
            <span className="yds-avatar">TS</span>
            <span className="yds-profile-info">
              <strong>Thabo Sibanda</strong>
              <small>Administrator</small>
            </span>
            <span className="yds-profile-more">···</span>
          </button>
        </div>
      </aside>

      <section className="yds-main">
        <header className="yds-topbar">
          <div className="yds-breadcrumb">Workspace <span>/</span> Overview</div>
          <div className="yds-top-actions">
            <span className="yds-store-indicator"><i /> Store operational</span>
            <button className="yds-icon-button" aria-label="Notifications">♧<i /></button>
            <span className="yds-top-avatar">TS</span>
          </div>
        </header>

        <div className="yds-content">
          <section className="yds-welcome">
            <div>
              <div className="yds-eyebrow">SATURDAY, 31 OCTOBER 2026</div>
              <h1>Good morning, Thabo<span>.</span></h1>
              <p>Here's what's happening with your store today.</p>
            </div>
            <button className="yds-button yds-button-primary">＋ Add product</button>
          </section>

          <section className="yds-metrics">
            {metrics.map((metric, index) => (
              <article className="yds-metric" key={metric.label}>
                <div className="yds-metric-top">
                  <span>{metric.label}</span>
                  <span className="yds-metric-icon">{['↗', '▤', '◇', '♙'][index]}</span>
                </div>
                <strong>{metric.value}</strong>
                <div className="yds-metric-foot">
                  <span className={metric.change.startsWith('+') ? 'yds-positive' : 'yds-neutral'}>{metric.change}</span>
                  <span>{metric.note}</span>
                </div>
              </article>
            ))}
          </section>

          <section className="yds-dashboard-grid">
            <article className="yds-panel yds-revenue-panel">
              <div className="yds-panel-heading">
                <div>
                  <span className="yds-eyebrow">PERFORMANCE</span>
                  <h2>Revenue overview</h2>
                </div>
                <select defaultValue="7 days" aria-label="Revenue period">
                  <option>7 days</option>
                  <option>30 days</option>
                  <option>12 months</option>
                </select>
              </div>
              <div className="yds-chart-summary">
                <strong>R18,420.00</strong>
                <span className="yds-positive">↗ 14.6%</span>
              </div>
              <div className="yds-chart">
                <div className="yds-chart-y">
                  <span>R5k</span><span>R4k</span><span>R3k</span><span>R2k</span><span>R1k</span><span>R0</span>
                </div>
                <div className="yds-chart-area">
                  {[34, 48, 40, 67, 55, 78, 63, 90, 70, 84, 60, 96].map((height, i) => (
                    <div className="yds-chart-column" key={i}>
                      <div style={{ height: `${height}%` }} />
                    </div>
                  ))}
                  <div className="yds-chart-gridlines"><i /><i /><i /><i /><i /></div>
                </div>
              </div>
              <div className="yds-chart-x">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
            </article>

            <article className="yds-panel yds-activity-panel">
              <div className="yds-panel-heading">
                <div>
                  <span className="yds-eyebrow">LIVE UPDATES</span>
                  <h2>Recent activity</h2>
                </div>
                <button className="yds-text-button">View all ↗</button>
              </div>
              {[
                ['＋', 'New order received', 'Order #YT-1048', '12 min ago'],
                ['✓', 'Order delivered', 'Order #YT-1047', '1 hour ago'],
                ['◇', 'Stock running low', 'Rose Élixir · 8 left', '3 hours ago'],
                ['＋', 'New customer', 'Amara Nkosi', '5 hours ago'],
              ].map(([icon, title, detail, time]) => (
                <div className="yds-activity" key={title}>
                  <span className="yds-activity-icon">{icon}</span>
                  <div><strong>{title}</strong><small>{detail}</small></div>
                  <time>{time}</time>
                </div>
              ))}
            </article>
          </section>

          <section className="yds-panel yds-table-panel">
            <div className="yds-panel-heading">
              <div>
                <span className="yds-eyebrow">ORDER MANAGEMENT</span>
                <h2>Recent orders</h2>
              </div>
              <button className="yds-button yds-button-secondary">View all orders ↗</button>
            </div>
            <div className="yds-table-wrap">
              <table className="yds-table">
                <thead><tr><th>ORDER</th><th>CUSTOMER</th><th>PRODUCT</th><th>DATE</th><th>AMOUNT</th><th>STATUS</th></tr></thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td className="yds-order-id">{order.id}</td>
                      <td>{order.customer}</td>
                      <td>{order.product}</td>
                      <td className="yds-muted">{order.date}</td>
                      <td className="yds-amount">{order.amount}</td>
                      <td><Status value={order.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="yds-panel yds-products-panel">
            <div className="yds-panel-heading">
              <div>
                <span className="yds-eyebrow">INVENTORY</span>
                <h2>Product inventory</h2>
              </div>
              <button className="yds-text-button">Manage products ↗</button>
            </div>
            <div className="yds-table-wrap">
              <table className="yds-table">
                <thead><tr><th>PRODUCT</th><th>CATEGORY</th><th>PRICE</th><th>STOCK</th><th>AVAILABILITY</th><th /></tr></thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.name}>
                      <td className="yds-product-name"><span className="yds-product-placeholder">Y</span>{product.name}</td>
                      <td>{product.category}</td>
                      <td className="yds-amount">{product.price}</td>
                      <td>{product.stock} units</td>
                      <td><Status value={product.status} /></td>
                      <td><button className="yds-row-menu">···</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="yds-component-section">
            <div className="yds-section-title">
              <span className="yds-eyebrow">DESIGN LANGUAGE</span>
              <h2>Interface components</h2>
              <p>Core controls, states and surfaces used throughout the administration.</p>
            </div>

            <div className="yds-component-grid">
              <article className="yds-component-card">
                <h3>Buttons</h3>
                <p>Primary, secondary and destructive actions.</p>
                <div className="yds-component-examples">
                  <button className="yds-button yds-button-primary">Save changes</button>
                  <button className="yds-button yds-button-secondary">Cancel</button>
                  <button className="yds-button yds-button-danger">Delete item</button>
                  <button className="yds-button yds-button-disabled" disabled>Unavailable</button>
                </div>
              </article>

              <article className="yds-component-card">
                <h3>Form controls</h3>
                <p>Clear labels, helpful descriptions and visible focus.</p>
                <label className="yds-field-label">Product name</label>
                <input className="yds-input" placeholder="e.g. Velvet Oud" />
                <label className="yds-field-label">Category</label>
                <select className="yds-input" defaultValue="">
                  <option value="" disabled>Select category</option>
                  <option>His</option><option>Hers</option><option>Spaces</option>
                </select>
                <label className="yds-checkbox"><input type="checkbox" defaultChecked /> Available for purchase</label>
              </article>

              <article className="yds-component-card">
                <h3>Statuses</h3>
                <p>Semantic feedback with text and colour.</p>
                <div className="yds-status-examples">
                  {['Pending', 'Processing', 'Delivered', 'In stock', 'Low stock', 'Out of stock'].map(value => <Status key={value} value={value} />)}
                </div>
              </article>

              <article className="yds-component-card">
                <h3>Feedback</h3>
                <p>Messages that communicate system outcomes.</p>
                <div className="yds-alert yds-alert-success"><strong>✓ Changes saved</strong><span>Your product has been updated.</span></div>
                <div className="yds-alert yds-alert-warning"><strong>! Stock running low</strong><span>Only 8 units remain.</span></div>
                <div className="yds-alert yds-alert-error"><strong>× Something went wrong</strong><span>Please try again.</span></div>
              </article>
            </div>
          </section>

          <footer className="yds-footer">
            <span>YOTAABO ADMINISTRATION</span>
            <span>DESIGN CONCEPT · 01</span>
          </footer>
        </div>
      </section>
    </main>
  );
}

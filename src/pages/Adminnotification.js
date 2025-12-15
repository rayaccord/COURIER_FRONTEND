export default function NoNotifications() {
  return (
    <div style={{
      background: 'black',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      fontFamily: 'Inter, Arial, sans-serif',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box'
    }}>
      <div className="notification-container" style={{textAlign: 'center'}}>
        <h2 style={{fontSize: '22px', fontWeight: 700, marginBottom: '8px'}}>No Notifications Yet</h2>
        <p style={{fontSize: '15px', color: '#64748b'}}>When something arrives, it will show up here.</p>
        <p style={{fontSize: '15px', color: '#64748b'}}>So, kindly go back..</p>
      </div>
    </div>
  );
}

import "./styles.css";
import "./websocket/client";

function Card({ title }: { title: string }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>Operational module initialized</p>
    </div>
  );
}

export default function App() {
  return (
    <div className="container">
      <header className="header">
        <h1>CORE SYSTEM — Trading Operations Dashboard</h1>
      </header>

      <div className="grid">
        <Card title="Portfolio" />
        <Card title="Positions" />
        <Card title="Risk Monitor" />
        <Card title="Strategy Panel" />
        <Card title="Account Summary" />
        <Card title="Kill Switch" />
        <Card title="Approval Queue" />
        <Card title="Reconciliation Status" />
      </div>
    </div>
  );
}

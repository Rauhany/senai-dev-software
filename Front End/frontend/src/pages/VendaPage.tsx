import { useState } from 'react';
import { VendaForm } from '../components/VendaForm';   
import VendaList from '../components/ClienteList'

export function VendasPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleVendaRealizada = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="page-container">
      <h2>Gestão de Vendas</h2>
      <p>Registre novas vendas e acompanhe o histórico.</p>

      {}
      <div style={{ display: 'flex', gap: '32px', marginTop: '24px', flexWrap: 'wrap' }}>
        
        <div style={{ flex: '1 1 300px' }}>
          <VendaForm onVendaRealizada={handleVendaRealizada} />
        </div>

        <div style={{ flex: '2 1 500px' }}>
          <VendaList refreshKey={refreshKey} />
        </div>

      </div>
    </div>
  );
}
export default VendasPage
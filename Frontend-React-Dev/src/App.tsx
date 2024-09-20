import React from 'react';
import Layout from './Components/Layout/Layout';

const App: React.FC = () => {
  return (
    <Layout>
      {/* Aquí puedes poner el contenido que cambiará en cada ruta */}
      <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
      <p>This is the main dashboard area.</p>
    </Layout>
  );
};

export default App;

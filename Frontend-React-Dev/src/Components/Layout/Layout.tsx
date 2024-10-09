import React, { useState } from 'react';
import Navbar from './NavBar';
import Sidebar from './Sidebar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed z-30 inset-y-0 left-0 transition-transform duration-300 ease-in-out transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } shadow-lg bg-blue-800 w-64`}
      >
        <Sidebar isOpen={sidebarOpen} />
      </div>

      {/* Main content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Navbar */}
        <Navbar onToggleSidebar={toggleSidebar} />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 bg-white shadow-sm transition-transform duration-300 ease-in-out">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;

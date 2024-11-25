import React, { useState } from 'react';
import '../pages/Referencia/Styles/ExpandableSection.css'
import '../pages/Referencia/Styles/App.css'

interface ExpandableSectionProps {
  title: string;
  children: React.ReactNode;
}

const ExpandableSection: React.FC<ExpandableSectionProps> = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSection = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="expandable-section">
      <div className="section-header" onClick={toggleSection}>
        <h3>{title}</h3>
        <span className="toggle-icon">{isExpanded ? '▲' : '▼'}</span>
      </div>
      <div
        className={`section-content ${isExpanded ? 'expanded' : 'collapsed'}`}
        aria-hidden={!isExpanded}
      >
        {children}
      </div>
    </div>
  );
};

export default ExpandableSection;

import React, { useState } from "react";

// Componente principal Tabs
export default function Tabs({ children }) {
  const [activeTab, setActiveTab] = useState(0);

  // Extraer el título de cada item
  const headers = React.Children.map(children, (child, index) => (
    <div className="me-2">
      <button
        className={`inline-block p-4 border-b-2 rounded-t-lg ${
          activeTab === index
            ? "text-blue-600 border-blue-600"
            : "hover:text-gray-600 hover:border-gray-300 border-transparent"
        }`}
        onClick={() => setActiveTab(index)}
      >
        {child.props.title}
      </button>
    </div>
  ));

  // Contenido de la pestaña activa
  const content = React.Children.toArray(children)[activeTab];

  return (
    <div className="max-w-screen-2xl mx-auto">
      <div className="flex flex-wrap text-sm font-medium text-center text-gray-500 border border-gray-300 rounded-lg">
        {headers}
      </div>
      <div>{content}</div>
    </div>
  );
}

// Definir el subcomponente Item como propiedad de Tabs
Tabs.Item = ({ children }) => {
  return <div>{children}</div>;
};

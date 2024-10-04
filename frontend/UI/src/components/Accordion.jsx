/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, { useState } from "react";

// Componente principal Accordion
export default function Accordion({ children, allowMultiple = false }) {
  const [activeIndexes, setActiveIndexes] = useState([]); // Maneja las secciones activas

  const handleItemClick = (index) => {
    if (allowMultiple) {
      // Si se permiten múltiples, agregamos o eliminamos del array
      setActiveIndexes((prevIndexes) =>
        prevIndexes.includes(index)
          ? prevIndexes.filter((i) => i !== index)
          : [...prevIndexes, index]
      );
    } else {
      // Si no se permiten múltiples, se alterna entre abierto y cerrado
      setActiveIndexes((prevIndexes) =>
        prevIndexes.includes(index) ? [] : [index]
      );
    }
  };

  return (
    <div className="space-y-2">
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          isActive: activeIndexes.includes(index),
          onClick: () => handleItemClick(index),
        })
      )}
    </div>
  );
}

Accordion.Item = ({
  header,
  children,
  isActive,
  onClick,
  className,
  ...rest
}) => {
  return (
    <div onClick={onClick} className={className}>
      {React.isValidElement(header)
        ? React.cloneElement(header, { isActive, ...rest })
        : null}
      {isActive && <div>{children}</div>}
    </div>
  );
};

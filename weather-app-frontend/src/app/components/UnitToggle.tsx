import React from 'react';
import { Units } from '../../types/weather';
import '../../styles/globals.css'

interface UnitToggleProps {
  units: Units;
  onToggle: (units: Units) => void;
}

const UnitToggle: React.FC<UnitToggleProps> = ({ units, onToggle }) => {
  return (
    <div className="mb-6 flex justify-end">
      <div className="btn-group">
        <button
          className={`btn ${units === 'metric' ? 'btn-active' : ''}`}
          onClick={() => onToggle('metric')}
        >
          °C
        </button>
        <button
          className={`btn ${units === 'imperial' ? 'btn-active' : ''}`}
          onClick={() => onToggle('imperial')}
        >
          °F
        </button>
      </div>
    </div>
  );
};

export default UnitToggle;
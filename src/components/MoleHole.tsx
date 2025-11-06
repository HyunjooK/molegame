import React from 'react';
import { Mole } from '../types';

interface MoleHoleProps {
  mole: Mole;
  onClick: () => void;
}

export const MoleHole: React.FC<MoleHoleProps> = ({ mole, onClick }) => {
  return (
    <div className="mole-hole" onClick={onClick}>
      <div className="hole-background">
        <div className="hole-opening"></div>
      </div>
      {mole.isVisible && (
        <div className="mole">
          <div className="mole-text">{mole.text}</div>
        </div>
      )}
    </div>
  );
};



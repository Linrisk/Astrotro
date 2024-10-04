import { useState } from 'react';
import styled from 'styled-components';
import Select from 'react-select';

const TeamPatch = () => {
  const [teamName, setTeamName] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [icon, setIcon] = useState('rocket');
  const [shape, setShape] = useState('circle');

  const handleSubmit = () => {
    alert(`Nom de l'équipe: ${teamName}, Icône: ${icon}, Couleur: ${backgroundColor}, Forme: ${shape}`);
  };

  return (
    <Wrapper className="wrapper-div">
      <h2>Module 0 : Choix des patches et des équipes</h2>
      <InputField placeholder="Saisir du nom de l'équipe ici" value={teamName} onChange={(e) => setTeamName(e.target.value)} />

      <div className="icon-selector w-100 h-30">
        <img  className="icon-selec" src="/icons/planet.png" alt="Planète" onClick={() => setIcon('planet')} />
        <img className="icon-selec"  src="/icons/plant.png" alt="Plant" onClick={() => setIcon('plant')} />
        <img  className="icon-selec" src="/icons/rocket.png" alt="Fusée" onClick={() => setIcon('rocket')} />
      </div>

      <div className="shape-selector w-100">
        <Shape onClick={() => setShape('circle')} shape="circle" />
        <Shape onClick={() => setShape('square')} shape="square" />
        <Shape onClick={() => setShape('triangle')} shape="triangle" />
      </div>

      <ColorPicker>
        <input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} />
        <span>Choisir couleur de fond</span>
      </ColorPicker>

      <button onClick={handleSubmit}>Valider</button>

      <PatchPreview shape={shape} backgroundColor={backgroundColor}>
        <Icon src={`/icons/${icon}.png`} alt="Icône" />
        <TeamName>{teamName}</TeamName>
      </PatchPreview>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .icon-selector {
    display: flex;
    justify-content: space-around;
  }

  .shape-selector {
    display: flex;
    justify-content: space-around;
  }
`;

const InputField = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Shape = styled.div`
  width: 50px;
  height: 50px;
  background: ${({ shape }) => (shape === 'circle' ? 'circle' : shape === 'square' ? '#ccc' : 'transparent')};
  border: 2px solid black;
`;

const ColorPicker = styled.div`
  display: flex;
  align-items: center;
`;

const PatchPreview = styled.div`
  width: 150px;
  height: 150px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: ${({ shape }) => (shape === 'circle' ? '50%' : shape === 'square' ? '0' : '0')};
`;

const Icon = styled.img`
  width: 50px;
  height: 50px;
`;

const TeamName = styled.p`
  color: #fff;
  font-weight: bold;
`;

export default TeamPatch;

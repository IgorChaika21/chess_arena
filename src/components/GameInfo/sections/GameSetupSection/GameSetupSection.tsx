import React, { useState, useCallback } from 'react';

import { useGameStore } from '@/store/useGameStore';
import { GameMode, Colors } from '@/types/types';

import { Section, SectionTitle } from '../sections.styles';

import {
  SetupOptions,
  OptionGroup,
  OptionTitle,
  GameModeSelection,
  ModeButton,
  ColorSelection,
  StartGameButton,
  ColorButtons,
  ColorButton,
  ColorSwatch,
} from './GameSetupSection.styles';

const GameSetupSection: React.FC = () => {
  const { startGame } = useGameStore();
  const [selectedColor, setSelectedColor] = useState<Colors>(Colors.WHITE);
  const [selectedMode, setSelectedMode] = useState<GameMode.PVP | GameMode.PVB>(
    GameMode.PVP
  );

  const handleModeSelect = useCallback((mode: GameMode.PVP | GameMode.PVB) => {
    setSelectedMode(mode);
    if (mode === GameMode.PVP) {
      setSelectedColor(Colors.WHITE);
    }
  }, []);

  const handleColorSelect = useCallback((color: Colors) => {
    setSelectedColor(color);
  }, []);

  const handleStartGame = useCallback(() => {
    startGame(
      selectedMode,
      selectedMode === GameMode.PVB ? selectedColor : Colors.WHITE
    );
  }, [selectedMode, selectedColor, startGame]);

  return (
    <Section>
      <SectionTitle>Game Setup</SectionTitle>
      <SetupOptions>
        <OptionGroup>
          <OptionTitle>Game Mode</OptionTitle>
          <GameModeSelection>
            <ModeButton
              $active={selectedMode === GameMode.PVP}
              onClick={() => handleModeSelect(GameMode.PVP)}
            >
              <span>👥</span>
              Player vs Player
            </ModeButton>
            <ModeButton
              $active={selectedMode === GameMode.PVB}
              onClick={() => handleModeSelect(GameMode.PVB)}
            >
              <span>🤖</span>
              Player vs Bot
            </ModeButton>
          </GameModeSelection>
        </OptionGroup>

        {selectedMode === GameMode.PVB && (
          <OptionGroup>
            <OptionTitle>Choose Your Color</OptionTitle>
            <ColorSelection>
              <ColorButtons>
                <ColorButton
                  $color="white"
                  $active={selectedColor === Colors.WHITE}
                  onClick={() => handleColorSelect(Colors.WHITE)}
                >
                  <ColorSwatch $color="white" />
                  White
                </ColorButton>
                <ColorButton
                  $color="black"
                  $active={selectedColor === Colors.BLACK}
                  onClick={() => handleColorSelect(Colors.BLACK)}
                >
                  <ColorSwatch $color="black" />
                  Black
                </ColorButton>
              </ColorButtons>
            </ColorSelection>
          </OptionGroup>
        )}
      </SetupOptions>

      <StartGameButton onClick={handleStartGame}>Start Game</StartGameButton>
    </Section>
  );
};

export default GameSetupSection;

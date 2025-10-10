import ChessBoard from '@/components/ChessBoard/ChessBoard';
import GameInfo from '@/components/GameInfo/GameInfo';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher/ThemeSwitcher';

import { AppContainer, BoardContainer, Sidebar } from './AppLayout.styles';

const AppLayout: React.FC = () => {
  return (
    <div id="root">
      <ThemeSwitcher />
      <AppContainer>
        <BoardContainer>
          <ChessBoard />
        </BoardContainer>
        <Sidebar>
          <GameInfo />
        </Sidebar>
      </AppContainer>
    </div>
  );
};

export default AppLayout;

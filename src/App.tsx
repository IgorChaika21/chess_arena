import ChessBoard from './components/ChessBoard/ChessBoard';

function App() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#1a1a1a',
      }}
    >
      <ChessBoard />
    </div>
  );
}

export default App;

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Post from './components/Post';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome to Stress Relief Whiteboard App
        </p>
        
      </header>

      <Post />

    </div>
  );
}

export default App;

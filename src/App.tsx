import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import MainRouter from './components/MainRouter/MainRouter.tsx';
import { CartProvider } from '@/contexts';

function App() {
  return (
    <CartProvider>
      <MainRouter />
    </CartProvider>
  )
}

export default App

// fetch('https://api.mobygames.com/v1/games/random?api_key=moby_8Rhj6gMiLqiDLcvWtnNrB3CluQ9', { method: "GET" }).then(res => console.log(res.json()))
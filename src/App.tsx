import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import './assets/fonts/fonts.css'
import MainRouter from './components/MainRouter/MainRouter.tsx';
import { CartProvider, PopupProvider } from '@/contexts';

function App() {
  return (
    <CartProvider>
      <PopupProvider>
        <MainRouter />
      </PopupProvider>
    </CartProvider>
  )
}

export default App

// fetch('https://api.mobygames.com/v1/games/random?api_key=moby_8Rhj6gMiLqiDLcvWtnNrB3CluQ9', { method: "GET" }).then(res => console.log(res.json()))
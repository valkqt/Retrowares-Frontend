import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import "./assets/fonts/fonts.css";
import MainRouter from "./components/MainRouter/MainRouter.tsx";
import { CartProvider, } from "@/contexts";
import { UserProvider } from "./contexts/UserContextProvider.tsx";

function App() {
  return (
    <UserProvider>
      <CartProvider>
          <MainRouter />
      </CartProvider>
    </UserProvider>
  );
}

export default App;

// fetch('https://api.mobygames.com/v1/games/random?api_key=moby_8Rhj6gMiLqiDLcvWtnNrB3CluQ9', { method: "GET" }).then(res => console.log(res.json()))

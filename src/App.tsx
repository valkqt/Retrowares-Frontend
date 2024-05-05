import './App.css'
import "./types.ts"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import { Container } from "react-bootstrap";
import { RetroNav, Footer } from './components';
import HomePage from './pages/home/HomePage';
import ProductPage from './pages/products/ProductPage';
import SearchPage from './pages/search/SearchPage/SearchPage.tsx';
import CartPage from './pages/cart/CartPage.tsx';



function App() {

  const [results, setResults] = useState<Product[]>([])

  return (
    <BrowserRouter>
      <RetroNav setResults={setResults}/>
      <Container as="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage products={ results } />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/products/:id" element={<ProductPage />} />
        </Routes>
      </Container>
      <Footer />
    </BrowserRouter>

  )
}

export default App

// fetch('https://api.mobygames.com/v1/games/random?api_key=moby_8Rhj6gMiLqiDLcvWtnNrB3CluQ9', { method: "GET" }).then(res => console.log(res.json()))
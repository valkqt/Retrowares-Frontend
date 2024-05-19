import { BrowserRouter, Routes, Route } from "react-router-dom"
import Footer from "../Footer/Footer"
import RetroNav from "../Navbar/RetroNav"
import HomePage from "@/pages/home/HomePage"
import SearchPage from "@/pages/search/SearchPage/SearchPage"
import ProductPage from "@/pages/products/ProductPage"
import { Container } from "react-bootstrap"
import { useState } from "react"
import { Product } from "@/types"
import Test from "../_temp/Test"
import CheckoutPage from "@/pages/checkout/CheckoutPage"
import SpecialOffers from "@/pages/special_offers/SpecialOffers"
import PlatformPage from "@/pages/platform/PlatformPage"
import TrackingPage from "@/pages/tracking/TrackingPage"


export default function MainRouter() {
    const [results, setResults] = useState<Product[]>([])
    

    return (<BrowserRouter>
        <div className="wrapper">
            {/* <Test /> */}
            
            <RetroNav setResults={setResults} />
            <Container as="main" className="content">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/search/:query?" element={<SearchPage products={results} setProducts={setResults}/>} />
                    <Route path="/products/:id" element={<ProductPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/test" element={<Test />} />
                    <Route path="/offers" element={<SpecialOffers />} />
                    <Route path="/platforms/:name" element={<PlatformPage />} />
                    <Route path="/tracking" element={<TrackingPage />}/>

                </Routes>
            </Container>

            <Footer />
        </div>
    </BrowserRouter >
    )
}
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useState } from "react";
import { Product } from "@/types";
// import Test from "../_temp/Test"
import { ToastContainer } from "react-toastify";

import { RetroNav, Footer } from "@/components/index.ts";
import {
  AboutUs,
  CheckoutPage,
  HomePage,
  PlatformPage,
  ProductPage,
  SearchPage,
  TrackingPage,
  SpecialOffers,
  Account,
  Recovery,
} from "@/pages/index";

export default function MainRouter() {
  const [results, setResults] = useState<Product[]>([]);

  return (
    <BrowserRouter>
      <div className="wrapper">
        <RetroNav setResults={setResults} />
        <Container as="main" className="content">
          {/* <Test /> */}
          <ToastContainer
            position="top-center"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/search/:query?"
              element={
                <SearchPage products={results} setProducts={setResults} />
              }
            />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/offers" element={<SpecialOffers />} />
            <Route path="/platforms/:name" element={<PlatformPage />} />
            <Route path="/tracking" element={<TrackingPage />} />
            <Route path="/account" element={<Account />} />
            <Route path="/account/recovery" element={<Recovery />} />

          </Routes>
        </Container>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

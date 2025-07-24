import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./layouts/Layout"

const IndexPage = lazy(() => import("./views/IndexPage"))
const FavoritesPage = lazy(() => import("./views/FavoritesPage"))
const GenerateAI = lazy(() => import("./views/GenerateAI"))

export default function AppRouter() {
  const loadingFallback = (
    <div className="animate-pulse text-center text-xl font-semibold">
      Cargando...
    </div>
  )
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route 
            index 
            element={
              <Suspense fallback={loadingFallback}>
                <IndexPage />
              </Suspense>
            } 
          />
          <Route 
            path="favoritos" 
            element={
              <Suspense fallback={loadingFallback}>
                <FavoritesPage />
              </Suspense>
            } 
          />
          <Route 
            path="generate" 
            element={
              <Suspense fallback={loadingFallback}>
                <GenerateAI />
              </Suspense>
            } 
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

import { Routes, Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import HomePage from "../pages/Home/Home"
import FoodPage from "../pages/Food/Food"

const router = () => {
  return <div className="page" >
    <div className="content" >
      <BrowserRouter >
        <Routes>
          <Route element={<HomePage />}
            path="/"
          ></Route>
          <Route element={<FoodPage />}
            path="/food"
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  </div>
}
export default router
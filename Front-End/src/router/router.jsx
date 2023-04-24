import { Routes, Route } from 'react-router'
import { BrowserRouter ,Navigate} from 'react-router-dom'
import HomePage from "../pages/Home/Home"
import FoodPage from "../pages/Restaurant/Restaurant"
import ComparePage from "../pages/Compare/Compare"
import BdMap from '../pages/Map/BdMap'

const router = () => {
  return <div className="page" >
    <div className="content" >
      <BrowserRouter >
        <Routes>
          <Route element={<FoodPage />}
            path="/food"
          ></Route>
          <Route element={<ComparePage />}
            path="/compare"
          ></Route>
          <Route element={<BdMap />}
            path="/map"
          ></Route>
          <Route element={<HomePage />}
            path="/"
          ></Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  </div>
}
export default router
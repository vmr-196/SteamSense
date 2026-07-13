import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Search from "../pages/Search";
import GameDetails from "../pages/GameDetails";
import Wishlist from "../pages/Wishlist";
import Recommendations from "../pages/Recommendations";
import Profile from "../pages/Profile";
import ProtectedRoute from "../components/common/ProtectedRoute";
import Layout from "../components/layout/Layout";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/game/:appId" element={<GameDetails />} />
        <Route path="/wishlist" element={<ProtectedRoute> <Wishlist /> </ProtectedRoute>}/>
        <Route path="/recommendations" element={<ProtectedRoute><Recommendations /> </ProtectedRoute> }/>
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
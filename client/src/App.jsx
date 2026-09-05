import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

import LoginPage from "./pages/LoginPage";
import ListingsPage from "./pages/ListingsPage";
import ItemDetailPage from "./pages/ItemDetailPage";
import SwapRequestPage from "./pages/SwapRequestPage";
import DashboardPage from "./pages/DashboardPage";
import ChatPage from "./pages/ChatPage";
// import AdminPanelPage from "./pages/AdminPanelPage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<ListingsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/item/:id" element={<ItemDetailPage />} />

          <Route
            path="/swap-request/:itemId"
            element={
              <ProtectedRoute>
                <SwapRequestPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/chat/:swapId"
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            }
          />

          {/* <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPanelPage />
              </ProtectedRoute>
            }
          /> */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardRoutes from "./routes/DashboardRoutes";
import HomePageRoutes from "./routes/HomePageRoutes";
import Error from "./views/Error/Error";
import { UseProtectedRoute } from "./hooks/ProtectedRoute ";


const App = () => {
  const { ProtectedRoute } = UseProtectedRoute();

  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/home" />} />
      <Route path="/home/*" element={<HomePageRoutes />} />
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <DashboardRoutes />
          </ProtectedRoute>
        }
      />
      <Route path="/*" element={<Error />} />
    </Routes>
  );
};

export default App;

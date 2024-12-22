import { Route, Routes } from "react-router-dom";
import DashboardLayout from "@/views/dashboard/layout/DashboardLayout";
import UsersPage from "@/views/dashboard/pages/UsersPage/UsersPage";
import InsurancesPage from "@/views/dashboard/pages/InsurancesPage/InsurancesPage";



const DashboardRoutes = () => {
  return (
    <DashboardLayout>
      <Routes>
        {/* <Route path="" element={<DashBoardHomePage />} /> */}
        <Route path="" element={<UsersPage />} />
        <Route path="insurances" element={<InsurancesPage />} />
      </Routes>
    </DashboardLayout>
  );
};
export default DashboardRoutes;

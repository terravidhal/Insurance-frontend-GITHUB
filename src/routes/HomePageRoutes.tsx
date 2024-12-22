import AboutSectionOne from "@/views/HomePage/pages/About/AboutSectionOne";
//import Accueil from "@/views/HomePage/pages/Accueil/Accueil";
import Contact from "@/views/HomePage/pages/Contact";
import HomePageLayout from "@/views/HomePage/layout/HomePageLayout";
import { Route, Routes } from "react-router-dom";
import Signin from "@/views/HomePage/pages/Signin/Signin";
import Register from "@/views/HomePage/pages/Register/Register";


const HomePageRoutes = () => {
  return (
    <HomePageLayout>
      <Routes>
        {/* <Route index element={<Accueil />} /> */}
        <Route index element={<Signin />} />
        <Route path="register" element={<Register />} />
        <Route path="about" element={<AboutSectionOne />} />
        <Route path="contact" element={<Contact />} />
      </Routes>
    </HomePageLayout>
  );
};
export default HomePageRoutes;

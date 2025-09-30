import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/common/ScrollToTop";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import PortfolioPage from "./pages/PortfolioPage";
import ContactPage from "./pages/ContactPage";
import ArticlesPage from "./pages/ArticlesPage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import BackToTop from "./components/common/BackToTop";
import AllProjectsPage from "./pages/AllProjectsPage";
import AdminLayout from "./components/admin/AdminLayout";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ServiceManagement from "./pages/admin/ServiceManagement";
import ProjectManagement from "./pages/admin/ProjectManagement";
import SiteSettings from "./pages/admin/SiteSettings";
import AuthForm from "./components/admin/AuthForm";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    // Smooth scrolling for the entire page
    document.documentElement.style.scrollBehavior = "smooth";

    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <div className="font-inter antialiased bg-cream text-charcoal relative overflow-x-hidden">
      <ScrollToTop />
      {!isAdminRoute && <Navigation />}
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/portfolio/all" element={<AllProjectsPage />} />
          <Route path="/portfolio/:slug" element={<ProjectDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:slug" element={<ArticleDetailPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AuthForm />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="home-content" element={<div className="p-8 text-center text-muted-foreground">Home Content Management - Coming Soon</div>} />
            <Route path="about-content" element={<div className="p-8 text-center text-muted-foreground">About Content Management - Coming Soon</div>} />
            <Route path="contact-content" element={<div className="p-8 text-center text-muted-foreground">Contact Content Management - Coming Soon</div>} />
            <Route path="navigation" element={<div className="p-8 text-center text-muted-foreground">Navigation Management - Coming Soon</div>} />
            <Route path="faqs" element={<div className="p-8 text-center text-muted-foreground">FAQ Management - Coming Soon</div>} />
            <Route path="seo" element={<div className="p-8 text-center text-muted-foreground">SEO Management - Coming Soon</div>} />
            <Route path="analytics" element={<div className="p-8 text-center text-muted-foreground">Analytics Dashboard - Coming Soon</div>} />
            <Route path="services" element={<ServiceManagement />} />
            <Route path="projects" element={<ProjectManagement />} />
            <Route path="articles" element={<div className="p-8 text-center text-muted-foreground">Article Management - Coming Soon</div>} />
            <Route path="testimonials" element={<div className="p-8 text-center text-muted-foreground">Testimonial Management - Coming Soon</div>} />
            <Route path="founders" element={<div className="p-8 text-center text-muted-foreground">Founder Management - Coming Soon</div>} />
            <Route path="settings" element={<SiteSettings />} />
          </Route>
        </Routes>
      </AnimatePresence>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <BackToTop />}
    </div>
  );
}

export default App;

import { useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/common/ScrollToTop";
import BackToTop from "./components/common/BackToTop";
import ChatWidget from "./components/common/ChatWidget";
import StickyCTABar from "./components/common/StickyCTABar";

const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const MVPDevelopmentPage = lazy(() => import("./pages/MVPDevelopmentPage"));
const AIAutomationPage = lazy(() => import("./pages/AIAutomationPage"));
const MobileAppPage = lazy(() => import("./pages/MobileAppPage"));
const PortfolioPage = lazy(() => import("./pages/PortfolioPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const ArticlesPage = lazy(() => import("./pages/ArticlesPage"));
const ArticleDetailPage = lazy(() => import("./pages/ArticleDetailPage"));
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetailPage"));
const ServiceDetailPage = lazy(() => import("./pages/ServiceDetailPage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const TermsOfServicePage = lazy(() => import("./pages/TermsOfServicePage"));
const AllProjectsPage = lazy(() => import("./pages/AllProjectsPage"));
const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));
const ProtectedRoute = lazy(() => import("./components/admin/ProtectedRoute"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const ArticlesManagement = lazy(() => import("./pages/admin/ArticlesManagement"));
const PortfolioManagement = lazy(() => import("./pages/admin/PortfolioManagement"));
const TestimonialsManagement = lazy(() => import("./pages/admin/TestimonialsManagement"));
const ArticleForm = lazy(() => import("./pages/admin/articles/ArticleForm"));
const ProjectForm = lazy(() => import("./pages/admin/portfolio/ProjectForm"));
const TestimonialForm = lazy(() => import("./pages/admin/testimonials/TestimonialForm"));
const SiteSettings = lazy(() => import("./pages/admin/SiteSettings"));
const AuthForm = lazy(() => import("./components/admin/AuthForm"));
const HomePageContent = lazy(() => import("./pages/admin/HomePageContent"));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      <p className="text-muted-foreground">Loading...</p>
    </div>
  </div>
);

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
      <Suspense fallback={<LoadingFallback />}>
        <AnimatePresence mode="wait">
          <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/mvp-development" element={<MVPDevelopmentPage />} />
          <Route path="/services/ai-automation" element={<AIAutomationPage />} />
          <Route path="/services/mobile-app-development" element={<MobileAppPage />} />
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
            <Route path="home-content" element={<HomePageContent />} />
            <Route path="about-content" element={<div className="p-8 text-center text-muted-foreground">About Content Management - Coming Soon</div>} />
            <Route path="contact-content" element={<div className="p-8 text-center text-muted-foreground">Contact Content Management - Coming Soon</div>} />
            <Route path="navigation" element={<div className="p-8 text-center text-muted-foreground">Navigation Management - Coming Soon</div>} />
            <Route path="faqs" element={<div className="p-8 text-center text-muted-foreground">FAQ Management - Coming Soon</div>} />
            <Route path="seo" element={<div className="p-8 text-center text-muted-foreground">SEO Management - Coming Soon</div>} />
            <Route path="analytics" element={<div className="p-8 text-center text-muted-foreground">Analytics Dashboard - Coming Soon</div>} />
            <Route path="services" element={<div className="p-8 text-center text-muted-foreground">Services Management - Static Content (No CMS)</div>} />
            <Route path="projects" element={<div className="p-8 text-center text-muted-foreground">Projects Management - Static Content (No CMS)</div>} />
            <Route path="articles" element={<ArticlesManagement />} />
            <Route path="articles/new" element={<ArticleForm />} />
            <Route path="articles/edit/:id" element={<ArticleForm />} />
            <Route path="portfolio" element={<PortfolioManagement />} />
            <Route path="portfolio/new" element={<ProjectForm />} />
            <Route path="portfolio/edit/:id" element={<ProjectForm />} />
            <Route path="testimonials" element={<TestimonialsManagement />} />
            <Route path="testimonials/new" element={<TestimonialForm />} />
            <Route path="testimonials/edit/:id" element={<TestimonialForm />} />
            <Route path="founders" element={<div className="p-8 text-center text-muted-foreground">Founder Management - Coming Soon</div>} />
            <Route path="settings" element={<SiteSettings />} />
          </Route>
        </Routes>
      </AnimatePresence>
      </Suspense>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <BackToTop />}
      {!isAdminRoute && <ChatWidget />}
      {!isAdminRoute && <StickyCTABar />}
    </div>
  );
}

export default App;

import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { Service, Project, Article, Testimonial, Founder, SiteSettings, PageContent, NavigationLink, FAQ, ActivityLog } from '../lib/supabase';

// Custom hook for fetching services
export const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return;
    }

    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setServices(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch services');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return { services, loading, error, refetch: () => window.location.reload() };
};

// Custom hook for fetching projects
export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return;
    }

    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setProjects(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading, error, refetch: () => window.location.reload() };
};

// Custom hook for fetching articles
export const useArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return;
    }

    const fetchArticles = async () => {
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .order('published_at', { ascending: false });

        if (error) throw error;
        setArticles(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch articles');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return { articles, loading, error, refetch: () => window.location.reload() };
};

// Custom hook for fetching testimonials
export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return;
    }

    const fetchTestimonials = async () => {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setTestimonials(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch testimonials');
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return { testimonials, loading, error, refetch: () => window.location.reload() };
};

// Custom hook for fetching founders
export const useFounders = () => {
  const [founders, setFounders] = useState<Founder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return;
    }

    const fetchFounders = async () => {
      try {
        const { data, error } = await supabase
          .from('founders')
          .select('*')
          .eq('active', true)
          .order('order_index', { ascending: true });

        if (error) throw error;
        setFounders(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch founders');
      } finally {
        setLoading(false);
      }
    };

    fetchFounders();
  }, []);

  return { founders, loading, error, refetch: () => window.location.reload() };
};

// Custom hook for fetching site settings
export const useSiteSettings = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return;
    }

    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('*')
          .single();

        if (error) throw error;
        setSettings(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch site settings');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return { settings, loading, error, refetch: () => window.location.reload() };
};

// Custom hook for fetching page content
export const usePageContent = (pageSlug?: string) => {
  const [pageContent, setPageContent] = useState<PageContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return;
    }

    const fetchPageContent = async () => {
      try {
        let query = supabase
          .from('page_content')
          .select('*')
          .eq('is_active', true)
          .order('section_order', { ascending: true });

        if (pageSlug) {
          query = query.eq('page_slug', pageSlug);
        }

        const { data, error } = await query;

        if (error) throw error;
        setPageContent(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch page content');
      } finally {
        setLoading(false);
      }
    };

    fetchPageContent();
  }, [pageSlug]);

  return { pageContent, loading, error, refetch: () => window.location.reload() };
};

// Custom hook for fetching navigation links
export const useNavigationLinks = (linkType?: string) => {
  const [navigationLinks, setNavigationLinks] = useState<NavigationLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return;
    }

    const fetchNavigationLinks = async () => {
      try {
        let query = supabase
          .from('navigation_links')
          .select('*')
          .eq('is_active', true)
          .order('order_index', { ascending: true });

        if (linkType) {
          query = query.eq('link_type', linkType);
        }

        const { data, error } = await query;

        if (error) throw error;
        setNavigationLinks(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch navigation links');
      } finally {
        setLoading(false);
      }
    };

    fetchNavigationLinks();
  }, [linkType]);

  return { navigationLinks, loading, error, refetch: () => window.location.reload() };
};

// Custom hook for fetching FAQs
export const useFAQs = (pageSlug?: string) => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return;
    }

    const fetchFAQs = async () => {
      try {
        let query = supabase
          .from('faqs')
          .select('*')
          .eq('is_active', true)
          .order('order_index', { ascending: true });

        if (pageSlug) {
          query = query.eq('page_slug', pageSlug);
        }

        const { data, error } = await query;

        if (error) throw error;
        setFaqs(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch FAQs');
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, [pageSlug]);

  return { faqs, loading, error, refetch: () => window.location.reload() };
};

// Custom hook for fetching activity logs
export const useActivityLogs = (limit: number = 10) => {
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return;
    }

    const fetchActivityLogs = async () => {
      try {
        const { data, error } = await supabase
          .from('activity_logs')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(limit);

        if (error) throw error;
        setActivityLogs(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch activity logs');
      } finally {
        setLoading(false);
      }
    };

    fetchActivityLogs();
  }, [limit]);

  return { activityLogs, loading, error, refetch: () => window.location.reload() };
};
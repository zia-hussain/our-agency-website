import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { 
  Article, 
  PortfolioProject,
  Testimonial,
  ContentMigration,
  Service, 
  Project, 
  Founder, 
  SiteSettings, 
  PageSection, 
  NavigationItem, 
  FAQ, 
  ActivityLog,
  MediaUpload 
} from '../lib/supabase';

// Hybrid CMS Hooks - Only for Articles, Portfolio & Testimonials
export const useArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = async () => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return;
    }

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

  useEffect(() => {
    fetchArticles();
  }, []);

  return { articles, loading, error, refetch: fetchArticles };
};

export const usePortfolioProjects = () => {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      setProjects(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return { projects, loading, error, refetch: fetchProjects };
};

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTestimonials = async () => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_active', true)
        .order('order_index', { ascending: true });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch testimonials');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return { testimonials, loading, error, refetch: fetchTestimonials };
};

// Hook for content migrations
export const useContentMigrations = () => {
  const [migrations, setMigrations] = useState<ContentMigration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMigrations = async () => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('content_migrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMigrations(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch migrations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMigrations();
  }, []);

  return { migrations, loading, error, refetch: fetchMigrations };
};

// Keep existing hooks for static content (unchanged)
export const useServices = () => {
  // This will continue to use the static data from src/data/services.ts
  // No Supabase integration needed for services as per hybrid approach
  return { services: [], loading: false, error: null, refetch: () => {} };
};

export const useProjects = () => {
  // This will continue to use the static data from src/data/projects.ts  
  // No Supabase integration needed for projects as per hybrid approach
  return { projects: [], loading: false, error: null, refetch: () => {} };
};


// Enhanced hook for site settings with real-time updates
export const useSiteSettings = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = async () => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', 1)
        .single();

      if (error) throw error;
      setSettings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch site settings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return { settings, loading, error, refetch: fetchSettings };
};

// Hook for page sections (dynamic content)
export const usePageSections = (pageSlug?: string) => {
  const [pageSections, setPageSections] = useState<PageSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPageSections = async () => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return;
    }

    try {
      let query = supabase
        .from('page_sections')
        .select('*')
        .eq('is_active', true)
        .order('section_order', { ascending: true });

      if (pageSlug) {
        query = query.eq('page_slug', pageSlug);
      }

      const { data, error } = await query;

      if (error) throw error;
      setPageSections(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch page sections');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPageSections();
  }, [pageSlug]);

  return { pageSections, loading, error, refetch: fetchPageSections };
};

// Hook for navigation items
export const useNavigationItems = (type?: string) => {
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNavigationItems = async () => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return;
    }

    try {
      let query = supabase
        .from('navigation_items')
        .select('*')
        .eq('is_active', true)
        .order('order_index', { ascending: true });

      if (type) {
        query = query.eq('type', type);
      }

      const { data, error } = await query;

      if (error) throw error;
      setNavigationItems(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch navigation items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNavigationItems();
  }, [type]);

  return { navigationItems, loading, error, refetch: fetchNavigationItems };
};

// Hook for FAQs
export const useFAQs = (pageSlug?: string) => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFAQs = async () => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return;
    }

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

  useEffect(() => {
    fetchFAQs();
  }, [pageSlug]);

  return { faqs, loading, error, refetch: fetchFAQs };
};

// Hook for activity logs with real-time updates
export const useActivityLogs = (limit: number = 10) => {
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActivityLogs = async () => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return;
    }

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

  useEffect(() => {
    fetchActivityLogs();
  }, [limit]);

  return { activityLogs, loading, error, refetch: fetchActivityLogs };
};

// Hook for media uploads
export const useMediaUploads = () => {
  const [mediaUploads, setMediaUploads] = useState<MediaUpload[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMediaUploads = async () => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('media_uploads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMediaUploads(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch media uploads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMediaUploads();
  }, []);

  return { mediaUploads, loading, error, refetch: fetchMediaUploads };
};

// Utility function to log activities
export const logActivity = async (
  actionType: string,
  tableName: string,
  recordId?: string,
  recordTitle?: string,
  changes?: Record<string, any>
) => {
  if (!isSupabaseConfigured || !supabase) return;

  try {
    await supabase
      .from('activity_logs')
      .insert({
        action_type: actionType,
        table_name: tableName,
        record_id: recordId,
        record_title: recordTitle,
        user_email: 'admin@zumetrix.com', // You can enhance this with real user data
        changes: changes || {},
        ip_address: 'localhost', // You can enhance this with real IP detection
        user_agent: navigator.userAgent,
      });
  } catch (err) {
    console.error('Failed to log activity:', err);
  }
};

// Utility function for Cloudinary uploads
export const uploadToCloudinary = async (file: File): Promise<string> => {
  // PLACEHOLDER: Replace with actual Cloudinary upload
  // For now, return high-quality Pexels images that match your site theme
  const placeholderImages = [
    'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3861458/pexels-photo-3861458.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800'
  ];
  
  return new Promise((resolve) => {
    setTimeout(() => {
      const randomImage = placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
      resolve(randomImage);
    }, 1000);
  });
};
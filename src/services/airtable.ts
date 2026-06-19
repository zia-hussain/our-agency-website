export interface ReviewFormData {
  clientName: string;
  title: string;
  companyName: string;
  companyLogo?: { url: string }[];  // Attachment format
  country: string;
  projectName: string;
  projectDescription: string;
  projectType: string;
  servicesReceived: string;
  projectStartDate: string;  // Format: YYYY-MM-DD
  projectEndDate: string;    // Format: YYYY-MM-DD
  problemSolved: string;
  outcomes: string;
  keyMetricsOrWins: string;
  writtenTestimonial: string;
  starRating: number;
  videoTestimonialUrl: string;
  videoTestimonialUpload?: { url: string }[];  // Attachment format
}

export async function submitReviewToAirtable(data: ReviewFormData): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      return { success: false, error: (err as { error?: string })?.error || 'Review submission failed' };
    }

    return { success: true };
  } catch {
    return { success: false, error: 'Network error. Please try again.' };
  }
}

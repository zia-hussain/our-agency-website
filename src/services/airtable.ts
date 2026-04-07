const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = import.meta.env.VITE_AIRTABLE_TABLE_NAME || 'Client Reviews';

export interface ReviewFormData {
  clientName: string;
  companyName: string;
  role: string;
  companyLogoUrl: string;
  projectName: string;
  whatWeBuilt: string;
  problemBefore: string;
  resultsAfter: string;
  metrics: string;
  biggestImpact: string;
  writtenTestimonial: string;
  rating: number;
  videoUrl: string;
  videoFile?: File | null;
}

export async function submitReviewToAirtable(data: ReviewFormData): Promise<{ success: boolean; error?: string }> {
  if (!AIRTABLE_API_KEY || AIRTABLE_API_KEY === 'your_airtable_personal_access_token_here') {
    console.warn('Airtable API key not configured. Submission logged to console only.');
    console.log('Review submission data:', data);
    return { success: true };
  }

  const fields: Record<string, string | number> = {
    'Client Name': data.clientName,
    'Company Name': data.companyName,
    'Role / Title': data.role,
    'Company Logo URL': data.companyLogoUrl,
    'Project Name': data.projectName,
    'What We Built': data.whatWeBuilt,
    'Problem Before': data.problemBefore,
    'Results After': data.resultsAfter,
    'Metrics': data.metrics,
    'Biggest Impact': data.biggestImpact,
    'Written Testimonial': data.writtenTestimonial,
    'Rating': data.rating,
    'Video URL': data.videoUrl,
    'Status': 'Pending Review',
    'Submitted At': new Date().toISOString(),
  };

  try {
    const encodedTable = encodeURIComponent(AIRTABLE_TABLE_NAME);
    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodedTable}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fields }),
      }
    );

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      return { success: false, error: (err as { error?: { message?: string } })?.error?.message || 'Airtable submission failed' };
    }

    return { success: true };
  } catch (e) {
    return { success: false, error: 'Network error. Please try again.' };
  }
}

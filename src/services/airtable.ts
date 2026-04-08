const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = import.meta.env.VITE_AIRTABLE_TABLE_NAME || 'Client Reviews';

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
  if (!AIRTABLE_API_KEY) {
    console.warn('Airtable API key not configured. Submission logged to console only.');
    console.log('Review submission data:', data);
    return { success: true };
  }

  const fields: Record<string, any> = {
    'Client Name': data.clientName,
    'Title': data.title,
    'Company Name': data.companyName,
    'Country': data.country,
    'Project Name': data.projectName,
    'Project Description': data.projectDescription,
    'Project Type': data.projectType,
    'Services Received': data.servicesReceived,
    'Project Start Date': data.projectStartDate,
    'Project End Date': data.projectEndDate,
    'Problem Solved': data.problemSolved,
    'Outcomes': data.outcomes,
    'Key Metrics or Wins': data.keyMetricsOrWins,
    'Written Testimonial': data.writtenTestimonial,
    'Star Rating': data.starRating,
    'Video Testimonial URL': data.videoTestimonialUrl,
    'Approved/Published': false,  // Checkbox: starts as unchecked
    'Submission Date': new Date().toISOString().split('T')[0],  // Date only: YYYY-MM-DD
  };

  // Add attachments only if provided
  if (data.companyLogo && data.companyLogo.length > 0) {
    fields['Company Logo'] = data.companyLogo;
  }
  
  if (data.videoTestimonialUpload && data.videoTestimonialUpload.length > 0) {
    fields['Video Testimonial Upload'] = data.videoTestimonialUpload;
  }

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
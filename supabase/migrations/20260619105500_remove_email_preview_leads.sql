DELETE FROM leads
WHERE source IN (
  'branded_email_pdf_preview',
  'branded_email_roi_preview'
);

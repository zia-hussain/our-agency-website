DELETE FROM leads
WHERE source IN (
  'production_contact_test',
  'production_pdf_test',
  'production_roi_test',
  'final_pdf_delivery_test',
  'final_roi_delivery_test',
  'final_contact_delivery_test'
);

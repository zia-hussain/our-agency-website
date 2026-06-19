const json = (res, status, body) => {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
};

const readRequestBody = async (req) => {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body || "{}");

  const chunks = [];
  for await (const chunk of req) chunks.push(Buffer.from(chunk));
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return json(res, 405, { success: false, error: "Method not allowed" });
  }

  try {
    const data = await readRequestBody(req);
    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableName =
      process.env.AIRTABLE_REVIEWS_TABLE ||
      "Client Reviews";

    if (!apiKey || !baseId) {
      return json(res, 503, { success: false, error: "Review delivery is not configured." });
    }

    if (!data.clientName || !data.companyName || !data.writtenTestimonial) {
      return json(res, 400, { success: false, error: "Required review fields are missing." });
    }

    const fields = {
      "Client Name": data.clientName,
      Title: data.title,
      "Company Name": data.companyName,
      Country: data.country,
      "Project Name": data.projectName,
      "Project Description": data.projectDescription,
      "Project Type": data.projectType,
      "Services Received": data.servicesReceived,
      "Project Start Date": data.projectStartDate || undefined,
      "Project End Date": data.projectEndDate || undefined,
      "Problem Solved": data.problemSolved,
      Outcomes: data.outcomes,
      "Key Metrics or Wins": data.keyMetricsOrWins,
      "Written Testimonial": data.writtenTestimonial,
      "Star Rating": data.starRating,
      "Video Testimonial URL": data.videoTestimonialUrl,
      "Approved/Published": false,
      "Submission Date": new Date().toISOString().slice(0, 10),
    };

    Object.keys(fields).forEach((key) => fields[key] === undefined && delete fields[key]);

    const response = await fetch(
      `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fields, typecast: true }),
      },
    );

    if (!response.ok) {
      const detail = await response.text();
      throw new Error(`Airtable review submission failed: ${response.status} ${detail}`);
    }

    const record = await response.json();
    return json(res, 200, { success: true, recordId: record.id });
  } catch (error) {
    console.error("Review API error:", error);
    return json(res, 500, { success: false, error: "We could not submit the review." });
  }
}

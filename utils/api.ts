import { uploadImageAsync } from "../utils/uploadImageToCloudinary";

export type IssueReportPayload = {
  description: string;
  category: string;
  image: string | null;
  location: { latitude: number; longitude: number } | null;
};

const API_URL = "https://fixmycity-backend-production.up.railway.app/api/report";

export async function submitIssueReport(payload: IssueReportPayload): Promise<boolean> {
  try {
    let photoUrl = null;

    // 👇 Upload image to Cloudinary if one exists
    if (payload.image) {
      photoUrl = await uploadImageAsync(payload.image);
      console.log("Final photoUrl sent to backend:", photoUrl); // Confirm Cloudinary URL
    }
    
    console.log("Submitting payload:", {
      category: payload.category,
      description: payload.description,
      latitude: payload.location?.latitude,
      longitude: payload.location?.longitude,
      photoUrl,
    });


    // 👇 Submit issue to your backend with the Cloudinary image URL
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category: payload.category,
        description: payload.description,
        latitude: payload.location?.latitude,
        longitude: payload.location?.longitude,
        photoUrl,
      }),
    });
    console.log("Response status:", response.status);
    console.log("Response text:", await response.text());

    if (!response.ok) {
      console.error("API response not OK:", await response.text());
      return false;
    }

    return true;
  } catch (error) {
    console.error("API submission failed:", error);
    return false;
  }
}

export async function fetchIssues() {
  try {
    const response = await fetch("https://fixmycity-backend-production.up.railway.app/api/issues");
    if (!response.ok) throw new Error("Failed to fetch issues");
    return await response.json();
  } catch (error) {
    console.error("Error fetching issues:", error);
    return [];
  }
}

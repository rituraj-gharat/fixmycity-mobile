export async function uploadImageAsync(uri: string): Promise<string | null> {
    const formData = new FormData();
    const fileName = uri.split("/").pop()!;
    const fileType = fileName.split(".").pop();
  
    // 👇 Fix starts here
    formData.append("file", {
      uri,
      type: `image/${fileType}`,
      name: fileName,
    } as unknown as Blob); // 👈 Required for React Native
  
    formData.append("upload_preset", "fixmycity_preset");
  
    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dqjsjtmux/image/upload", {
        method: "POST",
        body: formData,
      });
  
      const result = await response.json();
  
      if (!result.secure_url) {
        console.error("Upload failed:", result);
        return null;
      }
  
      return result.secure_url;
    } catch (error) {
      console.error("Image upload failed:", error);
      return null;
    }

  }



  
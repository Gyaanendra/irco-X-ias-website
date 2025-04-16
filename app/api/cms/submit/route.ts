import { NextRequest, NextResponse } from "next/server";
import { getServerStorage, getServerDatabases, BUCKET_ID, DATABASE_ID, COLLECTION_ID } from "@/lib/appwrite";
import { ID } from "appwrite";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    // Extract form fields
    const title = formData.get('title') as string;
    const subtitle = formData.get('subtitle') as string;
    
    // Get server-side services
    const storage = getServerStorage();
    const databases = getServerDatabases();
    
    if (!storage || !databases) {
      throw new Error('Failed to initialize Appwrite server services');
    }
    
    // Handle multiple images
    const imageFiles = formData.getAll('images') as File[];
    const imageUrls: string[] = [];
    
    // Process and upload each image
    if (imageFiles && imageFiles.length > 0) {
      for (const imageFile of imageFiles) {
        if (!imageFile.name) continue;
        
        // Convert file to buffer
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        // Upload to Appwrite Storage
        const fileUpload = await storage.createFile(
          BUCKET_ID,
          ID.unique(),
          buffer
        );
        
        // Get the file URL
        const fileUrl = storage.getFileView(BUCKET_ID, fileUpload.$id).toString();
        imageUrls.push(fileUrl);
      }
    }
    
    // Create document in Appwrite Database
    const document = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      {
        title,
        subtitle,
        images_url: imageUrls
      }
    );
    
    return NextResponse.json({ 
      message: "Visit created successfully", 
      data: document 
    });
    
  } catch (error: unknown) {
    console.error('Error in API route:', error);
    const errorMessage = error instanceof Error ? error.message : 'Something went wrong';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

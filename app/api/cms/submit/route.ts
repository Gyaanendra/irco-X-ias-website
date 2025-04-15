import { NextRequest, NextResponse } from "next/server";
import { storage, databases, BUCKET_ID, DATABASE_ID, COLLECTION_ID } from "@/lib/appwrite";
import { ID } from "appwrite";
import { writeFile } from 'fs/promises';
import { join } from 'path';
// Remove unused import
import { mkdir } from 'fs/promises';
import { tmpdir } from 'os';

export async function POST(req: NextRequest) {
  try {
    // Create a temporary directory to store files
    const formData = await req.formData();
    
    // Extract form fields
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const visit_date = formData.get('visit_date') as string;
    const visit_location = formData.get('visit_location') as string;
    const visit_details = formData.get('visit_details') as string;
    
    // Handle multiple images
    const imageFiles = formData.getAll('images') as File[];
    const imagePaths: string[] = [];
    
    // Process and upload each image
    if (imageFiles && imageFiles.length > 0) {
      for (const imageFile of imageFiles) {
        if (!imageFile.name) continue;
        
        // Create a temporary file
        const tempDir = join(tmpdir(), 'upload-images');
        await mkdir(tempDir, { recursive: true });
        const tempFilePath = join(tempDir, imageFile.name);
        
        // Write the file to disk temporarily
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(tempFilePath, buffer);
        
        // Generate a unique filename - removed unused variable
        
        // Upload to Appwrite Storage
        const fileUpload = await storage.createFile(
          BUCKET_ID,
          ID.unique(),
          buffer
        );
        
        // Store the file ID for database reference
        imagePaths.push(fileUpload.$id);
      }
    }
    
    // Create document in Appwrite Database
    const document = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      {
        title,
        content,
        image_paths: imagePaths,
        visit_date,
        visit_location,
        visit_details
      }
    );
    
    return NextResponse.json({ 
      message: "Post created successfully", 
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

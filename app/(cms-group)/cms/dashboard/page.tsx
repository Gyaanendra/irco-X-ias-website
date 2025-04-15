"use client";
import { useState, useEffect } from "react";
import { databases, storage, DATABASE_ID, COLLECTION_ID, BUCKET_ID } from "@/lib/appwrite";
import { Query } from "appwrite";

interface Post {
  $id: string;
  title: string;
  content: string;
  image_paths: string[] | null;
  visit_date?: string;
  visit_location?: string;
  visit_details?: string;
}

export default function Home() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [visitDate, setVisitDate] = useState<string>("");
  const [visitLocation, setVisitLocation] = useState<string>("");
  const [visitDetails, setVisitDetails] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);

  // Fetch posts on load
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await databases.listDocuments(
          DATABASE_ID,
          COLLECTION_ID,
          [Query.orderDesc('$createdAt')]
        );
        setPosts(response.documents as unknown as Post[]);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("visit_date", visitDate);
    formData.append("visit_location", visitLocation);
    formData.append("visit_details", visitDetails);
    images.forEach((image) => formData.append("images", image));

    try {
      const res = await fetch("/api/cms/submit", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      setMessage(result.message || result.error);
      
      // Clear form fields on success
      if (!result.error) {
        setTitle("");
        setContent("");
        setVisitDate("");
        setVisitLocation("");
        setVisitDetails("");
        setImages([]);
        
        // Refresh posts after submission
        const response = await databases.listDocuments(
          DATABASE_ID,
          COLLECTION_ID,
          [Query.orderDesc('$createdAt')]
        );
        setPosts(response.documents as unknown as Post[]);
      }
    } catch (error: any) {
      setMessage(error.message || "An error occurred");
    }
  };

  // Function to get image URL from Appwrite
  const getImageUrl = (fileId: string) => {
    return storage.getFileView(BUCKET_ID, fileId);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Create a Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            style={{ width: "100%", marginBottom: "10px", minHeight: "100px" }}
          />
        </div>
        
        {/* Visit Information Section */}
        <div style={{ marginBottom: "20px", padding: "15px", backgroundColor: "#f5f5f5", borderRadius: "5px" }}>
          <h3 style={{ marginTop: "0" }}>Visit Information</h3>
          <div>
            <label>Visit Date:</label>
            <input
              type="date"
              value={visitDate}
              onChange={(e) => setVisitDate(e.target.value)}
              style={{ width: "100%", marginBottom: "10px" }}
            />
          </div>
          <div>
            <label>Visit Location:</label>
            <input
              type="text"
              value={visitLocation}
              onChange={(e) => setVisitLocation(e.target.value)}
              style={{ width: "100%", marginBottom: "10px" }}
            />
          </div>
          <div>
            <label>Visit Details:</label>
            <textarea
              value={visitDetails}
              onChange={(e) => setVisitDetails(e.target.value)}
              style={{ width: "100%", marginBottom: "10px", minHeight: "80px" }}
            />
          </div>
        </div>
        
        <div>
          <label>Images (select multiple):</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) =>
              setImages(e.target.files ? Array.from(e.target.files) : [])
            }
            style={{ marginBottom: "10px" }}
          />
        </div>
        <button 
          type="submit"
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px 15px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Submit
        </button>
      </form>
      {message && <p style={{ color: message.includes("error") ? "red" : "green" }}>{message}</p>}

      <h2>Posts</h2>
      {posts.map((post) => (
        <div key={post.$id} style={{ marginBottom: "20px", padding: "15px", border: "1px solid #ddd", borderRadius: "5px" }}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          
          {/* Display Visit Information */}
          {(post.visit_date || post.visit_location || post.visit_details) && (
            <div style={{ marginTop: "10px", padding: "10px", backgroundColor: "#f9f9f9", borderRadius: "4px" }}>
              <h4 style={{ marginTop: "0" }}>Visit Information</h4>
              {post.visit_date && <p><strong>Date:</strong> {new Date(post.visit_date).toLocaleDateString()}</p>}
              {post.visit_location && <p><strong>Location:</strong> {post.visit_location}</p>}
              {post.visit_details && <p><strong>Details:</strong> {post.visit_details}</p>}
            </div>
          )}
          
          {post.image_paths && post.image_paths.length > 0 && (
            <div style={{ marginTop: "15px" }}>
              <h4>Images</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {post.image_paths.map((fileId, index) => (
                  <img
                    key={index}
                    src={getImageUrl(fileId).toString()}
                    alt={`${post.title} - Image ${index + 1}`}
                    style={{ maxWidth: "200px", maxHeight: "150px", objectFit: "cover" }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

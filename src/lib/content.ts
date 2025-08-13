import { type Content } from "@/types/content";
import { useState, useEffect } from "react";

export async function loadContent(): Promise<Content> {
  try {
    const response = await fetch('/content/content.json');
    if (!response.ok) {
      throw new Error(`Failed to load content: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error loading content:", error);
    throw error;
  }
}

export function useContent() {
  const [content, setContent] = useState<Content | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await loadContent();
        setContent(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load content");
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  return { content, error, isLoading };
}

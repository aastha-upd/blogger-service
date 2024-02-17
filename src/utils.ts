import { v4 as uuidv4 } from 'uuid';

// Method to generate a slug with a random UUID suffix
export function generateSlug(title: string): string {
  const slug = title.toLowerCase().replace(/\s+/g, '-'); // Convert title to lowercase and replace spaces with hyphens
  const uuid = uuidv4(); // Generate a random UUID
  return `${slug}-${uuid}`; // Append UUID to the slug
}

// Method to calculate the estimated reading time in minutes
export function calculateMinRead(content: string): number {
  const wordsPerMinute = 200; // Average reading speed in words per minute
  const wordCount = content.split(/\s+/).length; // Count words by splitting content at spaces
  return Math.ceil(wordCount / wordsPerMinute); // Calculate the estimated reading time
}
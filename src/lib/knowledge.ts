import fs from "fs";
import path from "path";

let cachedKnowledge: string | null = null;

/**
 * Loads all Markdown (.md) knowledge base files from src/knowledge/
 * and returns a unified system prompt context string.
 */
export function getSystemKnowledge(): string {
  if (cachedKnowledge && process.env.NODE_ENV === "production") {
    return cachedKnowledge;
  }

  try {
    const knowledgeDir = path.join(process.cwd(), "src", "knowledge");

    if (!fs.existsSync(knowledgeDir)) {
      console.warn("Knowledge directory not found at:", knowledgeDir);
      return "";
    }

    const files = fs.readdirSync(knowledgeDir);
    const mdFiles = files.filter((file) => file.endsWith(".md"));

    const knowledgeChunks = mdFiles.map((file) => {
      const filePath = path.join(knowledgeDir, file);
      const content = fs.readFileSync(filePath, "utf-8");
      return `=== FILE: ${file} ===\n${content}`;
    });

    cachedKnowledge = knowledgeChunks.join("\n\n" + "=".repeat(40) + "\n\n");
    return cachedKnowledge;
  } catch (error) {
    console.error("Error reading Markdown Knowledge Base files:", error);
    return "";
  }
}

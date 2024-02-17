"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateMinRead = exports.generateSlug = void 0;
const uuid_1 = require("uuid");
// Method to generate a slug with a random UUID suffix
function generateSlug(title) {
    const slug = title.toLowerCase().replace(/\s+/g, '-'); // Convert title to lowercase and replace spaces with hyphens
    const uuid = (0, uuid_1.v4)(); // Generate a random UUID
    return `${slug}-${uuid}`; // Append UUID to the slug
}
exports.generateSlug = generateSlug;
// Method to calculate the estimated reading time in minutes
function calculateMinRead(content) {
    const wordsPerMinute = 200; // Average reading speed in words per minute
    const wordCount = content.split(/\s+/).length; // Count words by splitting content at spaces
    return Math.ceil(wordCount / wordsPerMinute); // Calculate the estimated reading time
}
exports.calculateMinRead = calculateMinRead;

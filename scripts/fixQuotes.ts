import fs from 'fs';
import path from 'path';

interface RawQuote {
  _id?: string;
  id?: string;
  content?: string;
  text?: string;
  author?: string;
  tags?: string[];
}

const filePath = path.resolve('services/data/quotes.json');
const raw = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as RawQuote[];

const cleaned = raw
  .map((q, i) => ({
    _id: q._id || q.id || `fallback-${i}`,
    text: q.content || q.text || '',
    author: q.author || 'Unknown',
    tags: Array.isArray(q.tags) ? q.tags : []
  }))
  .filter(q => q._id && q.text && q.author); 
fs.writeFileSync(filePath, JSON.stringify(cleaned, null, 2));
console.log(`✅ Fixed ${cleaned.length} quotes in ${filePath}`);

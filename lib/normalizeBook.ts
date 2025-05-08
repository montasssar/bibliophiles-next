export interface Book {
    id: string;
    volumeInfo: {
      title: string;
      authors?: string[];
      imageLinks?: { thumbnail?: string };
      previewLink?: string;
    };
  }
  
  export function normalizeBook(raw: any): Book {
    return {
      id: raw.id || raw.etag || crypto.randomUUID(),
      volumeInfo: {
        title: raw.volumeInfo?.title || 'Untitled',
        authors: raw.volumeInfo?.authors || ['Unknown'],
        imageLinks: {
          thumbnail:
            raw.volumeInfo?.imageLinks?.thumbnail ||
            raw.volumeInfo?.imageLinks?.smallThumbnail ||
            '',
        },
        previewLink: raw.volumeInfo?.previewLink || '#',
      },
    };
  }
  
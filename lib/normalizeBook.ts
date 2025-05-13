// services/utils/normalizeBook.ts
export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    imageLinks?: { thumbnail?: string };
    previewLink?: string;
  };
}

export function normalizeBook(raw: Record<string, unknown>): Book {
  const volumeInfo = raw.volumeInfo as Record<string, unknown> || {};

  return {
    id: String(raw.id || raw.etag || crypto.randomUUID()),
    volumeInfo: {
      title: String(volumeInfo.title || 'Untitled'),
      authors: Array.isArray(volumeInfo.authors) ? volumeInfo.authors as string[] : ['Unknown'],
      imageLinks: {
        thumbnail: typeof volumeInfo.imageLinks === 'object' && volumeInfo.imageLinks !== null
          ? String(
              (volumeInfo.imageLinks as Record<string, unknown>).thumbnail ||
              (volumeInfo.imageLinks as Record<string, unknown>).smallThumbnail ||
              ''
            )
          : '',
      },
      previewLink: String(volumeInfo.previewLink || '#'),
    },
  };
}

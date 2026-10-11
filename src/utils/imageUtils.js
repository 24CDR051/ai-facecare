/**
 * Client-Side Image Privacy & Compression Utilities
 * Ensures photos remain 100% on the user's device and fit safely within LocalStorage limits.
 */

export const compressImageClientSide = (file, maxWidth = 600, maxHeight = 600, quality = 0.82) => {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      reject(new Error('Please select a valid image file (JPEG, PNG, WebP).'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate aspect-ratio preserved dimensions
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas 2D context.'));
          return;
        }

        // Smooth image rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to lightweight data URI
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve({
          dataUrl: compressedDataUrl,
          width,
          height,
          originalSize: file.size,
          compressedSize: Math.round(compressedDataUrl.length * 0.75) // approximate bytes
        });
      };

      img.onerror = () => reject(new Error('Failed to load image into browser canvas.'));
      img.src = readerEvent.target.result;
    };

    reader.onerror = () => reject(new Error('Failed to read image file locally.'));
    reader.readAsDataURL(file);
  });
};

/**
 * Calculates approximate total size of localStorage usage in KB
 */
export const calculateLocalStorageUsage = () => {
  try {
    let totalBytes = 0;
    for (let key in localStorage) {
      if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
        totalBytes += (localStorage[key].length + key.length) * 2; // UTF-16 character = 2 bytes
      }
    }
    return {
      bytes: totalBytes,
      kilobytes: (totalBytes / 1024).toFixed(1),
      megabytes: (totalBytes / (1024 * 1024)).toFixed(2)
    };
  } catch {
    return { bytes: 0, kilobytes: '0.0', megabytes: '0.00' };
  }
};

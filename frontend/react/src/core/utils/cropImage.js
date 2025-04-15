export default function getCroppedImg(imageSrc, crop) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = imageSrc;
      image.crossOrigin = 'anonymous';
  
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');
  
        ctx.drawImage(
          image,
          crop.x,
          crop.y,
          crop.width,
          crop.height,
          0,
          0,
          crop.width,
          crop.height
        );
  
        canvas.toBlob((blob) => {
          if (!blob) return reject(new Error('Canvas is empty'));
          const croppedUrl = URL.createObjectURL(blob);
          blob.arrayBuffer().then(buffer => {
            resolve({ url: croppedUrl, buffer, blob });
          });
        }, 'image/jpeg');
      };
  
      image.onerror = reject;
    });
  }
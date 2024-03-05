import axios from "axios";

export const handleDownload = async (mediaType, item, selectedSize) => {
  try {
    let url;
    let fileName;
    let targetWidth;
    let sizeName;

    const sizeMappings = {
      photos: {
        0: { property: "small", sizeName: "Small" },
        1: { property: "medium", sizeName: "Medium" },
        2: { property: "large", sizeName: "Large" },
        3: { property: "portrait", sizeName: "portrait" },
        4: { property: "landscape", sizeName: "landscape" },
      },
      videos: {
        0: { targetWidth: 640, sizeName: "Small" },
        1: { targetWidth: 720, sizeName: "Medium" },
        2: { targetWidth: 1440, sizeName: "Large" },
      },
    };

    const sizeMapping = sizeMappings[mediaType][selectedSize];

    if (!sizeMapping) {
      alert(`Invalid size selected for ${mediaType}`);
      return;
    }

    if (mediaType === "photos") {
      url = item.src[sizeMapping.property];
      sizeName = sizeMapping.sizeName;
      fileName = `pexels_photo${item.photographer}_${item.id}_${sizeName}.jpeg`;
    } else if (mediaType === "videos") {
      targetWidth = sizeMapping.targetWidth;


      const selectedVideo = item.video_files.find(
        (video) => video.width >= targetWidth && video.width < targetWidth * 2 // video size range
      );

      const videoWidth = selectedVideo.width;
      if (selectedVideo) {
        url = selectedVideo.link;
        fileName = `pexels_video_${item.user.name}_${item.id}_${videoWidth}.mp4`;
      } else {
        alert("No matching video file found for the selected size");
        return;
      }
    } else {
      alert(`Invalid ${mediaType}`);

      return;
    }

    const response = await axios.get(url, { responseType: "arraybuffer" });

    if (response.status === 200) {
      const blob = new Blob([response.data], {
        type: response.headers["Content-Type"],
      });

      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = fileName;

      document.body.appendChild(downloadLink);
      downloadLink.click();

      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(downloadLink.href);
    } else {
      console.error(`Failed to fetch ${mediaType} content`);
    }
  } catch (error) {
    console.error(`Error while handling download for ${mediaType}:`, error);
  }
};

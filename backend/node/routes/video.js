
const express = require('express');
const router = express.Router();

// Generate random video info
const generateVideoInfo = (url) => {
  const platforms = ['YouTube', 'TikTok', 'Facebook', 'Instagram', 'Twitter', 'Vimeo'];
  const qualities = ['240p', '360p', '480p', '720p', '1080p', '2K', '4K'];
  const formats = ['mp4', 'webm', 'mkv', 'avi'];
  
  const platform = platforms[Math.floor(Math.random() * platforms.length)];
  const id = `video-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  
  const availableFormats = [];
  const qualityCount = Math.floor(Math.random() * 5) + 2; // 2-6 quality options
  
  for (let i = 0; i < qualityCount; i++) {
    const quality = qualities[Math.min(i, qualities.length - 1)];
    const format = formats[Math.floor(Math.random() * formats.length)];
    const fileSize = `${Math.floor(Math.random() * 500) + 10}MB`;
    
    availableFormats.push({
      id: `format-${i}`,
      label: `${quality} - ${format}`,
      quality,
      format,
      fileSize
    });
  }
  
  return {
    id,
    url,
    title: `Video from ${platform} - ${id.substring(0, 8)}`,
    description: `This is a sample video from ${platform} for testing purposes.`,
    thumbnailUrl: `https://picsum.photos/seed/${id}/640/360`,
    platform,
    author: 'Content Creator',
    duration: `${Math.floor(Math.random() * 10)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
    viewCount: `${Math.floor(Math.random() * 1000000)}`,
    availableFormats
  };
};

// Fetch video info endpoint
router.post('/info', (req, res) => {
  const { url } = req.body;
  
  if (!url) {
    return res.status(400).json({
      message: 'URL is required'
    });
  }
  
  // Generate random video info based on the URL
  const videoInfo = generateVideoInfo(url);
  
  return res.status(200).json(videoInfo);
});

module.exports = router;

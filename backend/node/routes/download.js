
const express = require('express');
const router = express.Router();

// In-memory store for downloads
let userDownloads = [];

// Download video endpoint
router.post('/', (req, res) => {
  const { videoId, formatId, videoUrl } = req.body;
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({
      message: 'Authentication required to download videos. Please log in.'
    });
  }
  
  if (!videoId || !formatId) {
    return res.status(400).json({
      message: 'Video ID and format ID are required'
    });
  }
  
  // In a real implementation, we would verify the token
  
  // Generate video info
  const videoInfo = {
    id: videoId,
    url: videoUrl,
    title: `Video ${videoId}`,
    description: 'Video description',
    thumbnailUrl: `https://picsum.photos/seed/${videoId}/640/360`,
    platform: 'YouTube',
    author: 'Content Creator',
    duration: '3:45',
    viewCount: '12345',
    availableFormats: [
      {
        id: formatId,
        label: '720p - mp4',
        quality: '720p',
        format: 'mp4',
        fileSize: '25MB'
      }
    ]
  };
  
  // Create download record
  const downloadRecord = {
    id: `dl-${Date.now()}`,
    videoInfo,
    downloadDate: new Date().toISOString(),
    format: videoInfo.availableFormats[0],
    status: 'completed'
  };
  
  // Add to downloads
  userDownloads.unshift(downloadRecord);
  
  return res.status(200).json(downloadRecord);
});

// Get user downloads with filtering and pagination
router.get('/', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({
      message: 'Not authenticated'
    });
  }
  
  const { page = 1, limit = 10, platform, status } = req.query;
  
  // Filter downloads
  let filteredDownloads = [...userDownloads];
  
  if (platform && platform !== 'all') {
    filteredDownloads = filteredDownloads.filter(d => d.videoInfo.platform === platform);
  }
  
  if (status && status !== 'all') {
    filteredDownloads = filteredDownloads.filter(d => d.status === status);
  }
  
  // Paginate
  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const startIndex = (pageNum - 1) * limitNum;
  const endIndex = startIndex + limitNum;
  const paginatedDownloads = filteredDownloads.slice(startIndex, endIndex);
  
  return res.status(200).json({
    downloads: paginatedDownloads,
    total: filteredDownloads.length
  });
});

// Delete a download
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({
      message: 'Not authenticated'
    });
  }
  
  // Remove download
  userDownloads = userDownloads.filter(d => d.id !== id);
  
  return res.status(204).send();
});

// Add sample downloads for testing
for (let i = 0; i < 10; i++) {
  const platforms = ['YouTube', 'TikTok', 'Facebook', 'Instagram', 'Twitter', 'Vimeo'];
  const platform = platforms[Math.floor(Math.random() * platforms.length)];
  const status = Math.random() > 0.2 ? 'completed' : 'failed';
  const id = `sample-${i}`;
  
  userDownloads.push({
    id: `dl-${Date.now()}-${i}`,
    videoInfo: {
      id,
      url: `https://example.com/${id}`,
      title: `Sample ${platform} Video ${i+1}`,
      description: `This is a sample ${platform} video for testing.`,
      thumbnailUrl: `https://picsum.photos/seed/${id}/640/360`,
      platform,
      author: 'Content Creator',
      duration: `${Math.floor(Math.random() * 10)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
      viewCount: `${Math.floor(Math.random() * 1000000)}`,
      availableFormats: [
        {
          id: `format-${i}`,
          label: '720p - mp4',
          quality: '720p',
          format: 'mp4',
          fileSize: `${Math.floor(Math.random() * 100) + 10}MB`
        }
      ]
    },
    downloadDate: new Date(Date.now() - (i * 86400000)).toISOString(),
    format: {
      id: `format-${i}`,
      label: '720p - mp4',
      quality: '720p',
      format: 'mp4',
      fileSize: `${Math.floor(Math.random() * 100) + 10}MB`
    },
    status
  });
}

module.exports = router;

import './style.css'

const apiKey = process.env.API_KEY
const playlistId = process.env.PLAYLIST_ID
const apiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=10&playlistId=${playlistId}&key=${apiKey}`

;(async () => {
  try {
    const response = await fetch(apiUrl)
    const data = await response.json()
    const videos = data.items

    for (const video of videos) {
      const title = video.snippet.title
      const videoId = video.snippet.resourceId.videoId
      const channelId = video.snippet.videoOwnerChannelId
      const channelName = video.snippet.videoOwnerChannelTitle
      const publishedAt = video.snippet.publishedAt
      const thumbnail = video.snippet.thumbnails.medium.url
      const thumbnailWidth = video.snippet.thumbnails.medium.width
      const thumbnailHeight = video.snippet.thumbnails.medium.height

      const details = await _getDetails(videoId)

      // Get channel information
      const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${apiKey}`
      const channelResponse = await fetch(channelUrl)
      const channelData = await channelResponse.json()
      const channelImage = channelData.items[0].snippet.thumbnails.default.url
      const youtubeChannelUrl = `https://www.youtube.com/channel/${channelId}`
      const youtubeVideoUrl = `https://www.youtube.com/watch?v=${videoId}`

      // Create new HTML element
      const videoHtml = /*html*/`  
        <div class="flex flex-col gap-07">
          <a href=${youtubeVideoUrl} target="_blank" class="relative w-full h-[180px]" width=${thumbnailWidth} height=${thumbnailHeight}>
            <img src=${thumbnail} alt=${title} class="rounded w-full object-contain">
            <span class="absolute bottom-[5px] right-[5px] bg-transparent-gray px-[2px] py-[1px] rounded text-xs font-bold text-white tracking-wide">${details.duration}</span>
          </a>
          <div class="flex gap-07">
            <a href=${youtubeChannelUrl} target="_blank" class="video-channel" title=${channelName}>
              <img src="${channelImage}" alt="${channelName}" class="rounded-full w-9 h-9">
            </a>
            <div>
              <a href=${youtubeVideoUrl} target="_blank" class="text-white font-semibold lines-ellipsis">${title}</a>
              <div class="text-gray text-[.9rem] mt-2 leading-snug [$_*]:text-gray">
                <a href=${youtubeChannelUrl} target="_blank" class="video-channel-name">${channelName}</a>
                <div class="flex gap-[.3rem] items-center">
                  <p>${details.views} views</p>
                  <p class="text-[.5rem]">•</p>
                  <p>${_formatPublishedAt(publishedAt)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      `

      // Add new HTML element to container
      const container = document.querySelector('main')
      container.insertAdjacentHTML('beforeend', videoHtml)
    }
  } catch (error) {
    console.error(error)
  }
})()

async function _getDetails (videoId) {
  const detailUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoId}&key=${apiKey}`
  const detailResponse = await fetch(detailUrl)
  const detailData = await detailResponse.json()
  const duration = _formatDuration(detailData.items[0].contentDetails.duration)
  const views = _formatViewCount(detailData.items[0].statistics.viewCount)
  return { duration, views }
}

function _formatDuration (duration) {
  const match = duration.match(/PT(\d+)M(\d*)S?/)
  if (match) {
    const minutes = match[1]
    const seconds = match[2]
    return `${minutes}:${seconds.padStart(2, '0')}`
  } else {
    return duration
  }
}

function _formatViewCount (count) {
  const suffixes = ['', 'K', 'M', 'B', 'T']
  const num = parseInt(count)
  const tier = (Math.log10(num) / 3) | 0
  if (tier == 0) return num
  const suffix = suffixes[tier]
  const scale = Math.pow(10, tier * 3)
  const scaled = num / scale
  const formatted = scaled.toFixed(1) + suffix
  return formatted
}

function _formatPublishedAt (publishedAt) {
  const now = new Date()
  const publishedAtDate = new Date(publishedAt)
  const diff = now.getTime() - publishedAtDate.getTime()
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(months / 12)

  if (years > 0) {
    return years === 1 ? '1 year ago' : `${years} years ago`
  } else if (months > 0) {
    return months === 1 ? '1 month ago' : `${months} months ago`
  } else if (days > 0) {
    return days === 1 ? '1 day ago' : `${days} days ago`
  } else if (hours > 0) {
    return hours === 1 ? '1 hour ago' : `${hours} hours ago`
  } else if (minutes > 0) {
    return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`
  } else {
    return seconds < 10 ? 'just now' : `${seconds} seconds ago`
  }
}

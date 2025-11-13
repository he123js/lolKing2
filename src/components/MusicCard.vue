<template>
  <n-card class="music-card" title="最近播放">
    <div class="music-content">
      <div v-if="recentTracks.length === 0" class="empty-state">
        <n-icon size="48" class="empty-icon">
          <svg viewBox="0 0 24 24">
            <path fill="currentColor" d="M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A9,9 0 0,0 21,12A9,9 0 0,0 12,3M9,8.5A1.5,1.5 0 0,1 10.5,10A1.5,1.5 0 0,1 9,11.5A1.5,1.5 0 0,1 7.5,10A1.5,1.5 0 0,1 9,8.5M15,8.5A1.5,1.5 0 0,1 16.5,10A1.5,1.5 0 0,1 15,11.5A1.5,1.5 0 0,1 13.5,10A1.5,1.5 0 0,1 15,8.5M9,13C10.85,13 12.5,14.5 12.5,16.5V18H9V13M15,13C16.85,13 18.5,14.5 18.5,16.5V18H15V13Z"/>
          </svg>
        </n-icon>
        <p>暂无播放记录</p>
      </div>
      
      <div v-else class="tracks-list">
        <div 
          v-for="track in recentTracks" 
          :key="track.id" 
          class="track-item"
          @click="playTrack(track)"
        >
          <div class="track-cover">
            <img :src="track.cover" :alt="track.name" />
            <div class="play-overlay">
              <n-icon size="24">
                <svg viewBox="0 0 24 24">
                  <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z"/>
                </svg>
              </n-icon>
            </div>
          </div>
          <div class="track-info">
            <div class="track-name">{{ track.name }}</div>
            <div class="track-artist">{{ track.artist }}</div>
            <div class="track-time">{{ track.time }}</div>
          </div>
          <div class="track-actions">
            <n-button quaternary circle size="small">
              <template #icon>
                <n-icon>
                  <svg viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z"/>
                  </svg>
                </n-icon>
              </template>
            </n-button>
          </div>
        </div>
      </div>
      
      <div class="music-stats">
        <div class="stat">
          <span>本周播放</span>
          <span>{{ musicStats.weeklyPlays }} 次</span>
        </div>
        <div class="stat">
          <span>最爱歌手</span>
          <span>{{ musicStats.topArtist }}</span>
        </div>
      </div>
    </div>
  </n-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { NCard, NIcon, NButton } from 'naive-ui'

const recentTracks = ref([])
const musicStats = ref({
  weeklyPlays: 0,
  topArtist: '暂无'
})

// 模拟音乐数据
const mockTracks = [
  {
    id: 1,
    name: '晴天',
    artist: '周杰伦',
    cover: 'https://picsum.photos/80/80?random=1',
    time: '3天前'
  },
  {
    id: 2,
    name: '七里香',
    artist: '周杰伦',
    cover: 'https://picsum.photos/80/80?random=2',
    time: '1周前'
  },
  {
    id: 3,
    name: '青花瓷',
    artist: '周杰伦',
    cover: 'https://picsum.photos/80/80?random=3',
    time: '2周前'
  },
  {
    id: 4,
    name: '夜曲',
    artist: '周杰伦',
    cover: 'https://picsum.photos/80/80?random=4',
    time: '3周前'
  },
  {
    id: 5,
    name: '稻香',
    artist: '周杰伦',
    cover: 'https://picsum.photos/80/80?random=5',
    time: '1月前'
  }
]

const fetchMusicData = async () => {
  try {
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // 实际项目中这里会调用音乐API
    // 例如：网易云音乐API 或 Last.fm API
    
    recentTracks.value = mockTracks
    musicStats.value = {
      weeklyPlays: Math.floor(Math.random() * 50) + 20,
      topArtist: '周杰伦'
    }
  } catch (error) {
    console.error('获取音乐数据失败:', error)
  }
}

const playTrack = (track) => {
  console.log('播放音乐:', track.name)
  // 实际项目中这里会集成音乐播放功能
}

onMounted(() => {
  fetchMusicData()
})
</script>

<style scoped>
.music-card {
  height: 100%;
}

.music-content {
  padding: 8px 0;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #999;
}

.empty-icon {
  margin-bottom: 16px;
  opacity: 0.5;
}

.tracks-list {
  margin-bottom: 20px;
}

.track-item {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background-color 0.2s;
}

.track-item:hover {
  background-color: #f8f9fa;
  border-radius: 8px;
  margin: 0 -12px;
  padding: 12px;
}

.track-item:last-child {
  border-bottom: none;
}

.track-cover {
  position: relative;
  width: 50px;
  height: 50px;
  margin-right: 12px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.track-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.play-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
  color: white;
}

.track-item:hover .play-overlay {
  opacity: 1;
}

.track-info {
  flex: 1;
  min-width: 0;
}

.track-name {
  font-weight: 600;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.track-artist {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 4px;
}

.track-time {
  font-size: 0.8rem;
  color: #999;
}

.track-actions {
  opacity: 0;
  transition: opacity 0.2s;
}

.track-item:hover .track-actions {
  opacity: 1;
}

.music-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

.stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: #f8f9fa;
  border-radius: 6px;
  font-size: 0.9rem;
}

.stat span:first-child {
  color: #666;
}

.stat span:last-child {
  font-weight: 600;
  color: #1890ff;
}
</style>
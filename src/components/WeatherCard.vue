<template>
  <n-card class="weather-card" title="天气信息">
    <div class="weather-content">
      <div class="current-weather">
        <div class="weather-icon">
          <n-icon size="48">
            <svg viewBox="0 0 24 24">
              <path fill="currentColor" d="M6,16A5,5 0 0,1 1,11A5,5 0 0,1 6,6C7,3.65 9.3,2 12,2C15.43,2 18.24,4.66 18.5,8.03L19,8A4,4 0 0,1 23,12A4,4 0 0,1 19,16H18A1,1 0 0,1 17,15A1,1 0 0,1 18,14H19A2,2 0 0,0 21,12A2,2 0 0,0 19,10H17V9A5,5 0 0,0 12,4C9.5,4 7.45,5.82 7.06,8.19C6.73,8.07 6.37,8 6,8A3,3 0 0,0 3,11A3,3 0 0,0 6,14H7A1,1 0 0,1 8,15A1,1 0 0,1 7,16H6M12,11H15L12.5,15H15L11,21V16H8L10.5,12H8L12,11Z"/>
            </svg>
          </n-icon>
        </div>
        <div class="weather-info">
          <div class="temperature">{{ weatherData.temperature }}°C</div>
          <div class="description">{{ weatherData.description }}</div>
          <div class="location">{{ weatherData.location }}</div>
        </div>
      </div>
      
      <div class="forecast">
        <div v-for="day in weatherData.forecast" :key="day.day" class="forecast-item">
          <div class="day">{{ day.day }}</div>
          <div class="forecast-temp">{{ day.temp }}°C</div>
          <div class="forecast-desc">{{ day.description }}</div>
        </div>
      </div>
      
      <div class="weather-stats">
        <div class="stat">
          <span>湿度</span>
          <span>{{ weatherData.humidity }}%</span>
        </div>
        <div class="stat">
          <span>风速</span>
          <span>{{ weatherData.windSpeed }} km/h</span>
        </div>
        <div class="stat">
          <span>气压</span>
          <span>{{ weatherData.pressure }} hPa</span>
        </div>
      </div>
    </div>
  </n-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { NCard, NIcon } from 'naive-ui'

const weatherData = ref({
  location: '北京',
  temperature: 22,
  description: '晴朗',
  humidity: 65,
  windSpeed: 12,
  pressure: 1013,
  forecast: [
    { day: '今天', temp: 22, description: '晴' },
    { day: '明天', temp: 24, description: '多云' },
    { day: '后天', temp: 20, description: '小雨' },
    { day: '周三', temp: 18, description: '阴' }
  ]
})

// 模拟获取天气数据
const fetchWeatherData = async () => {
  // 这里可以集成真实的天气API
  // 例如：OpenWeatherMap API 或 和风天气API
  try {
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 实际项目中这里会调用真实的天气API
    // const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Beijing&appid=YOUR_API_KEY&units=metric')
    // const data = await response.json()
    
    // 使用模拟数据
    weatherData.value = {
      location: '北京',
      temperature: Math.floor(Math.random() * 10) + 18,
      description: ['晴朗', '多云', '小雨', '阴'][Math.floor(Math.random() * 4)],
      humidity: Math.floor(Math.random() * 30) + 50,
      windSpeed: Math.floor(Math.random() * 10) + 5,
      pressure: Math.floor(Math.random() * 50) + 1000,
      forecast: [
        { day: '今天', temp: Math.floor(Math.random() * 10) + 18, description: '晴' },
        { day: '明天', temp: Math.floor(Math.random() * 10) + 20, description: '多云' },
        { day: '后天', temp: Math.floor(Math.random() * 10) + 16, description: '小雨' },
        { day: '周三', temp: Math.floor(Math.random() * 10) + 15, description: '阴' }
      ]
    }
  } catch (error) {
    console.error('获取天气数据失败:', error)
  }
}

onMounted(() => {
  fetchWeatherData()
})
</script>

<style scoped>
.weather-card {
  height: 100%;
}

.weather-content {
  padding: 8px 0;
}

.current-weather {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
}

.weather-icon {
  margin-right: 16px;
  color: #1890ff;
}

.weather-info {
  flex: 1;
}

.temperature {
  font-size: 2rem;
  font-weight: 600;
  color: #1890ff;
  line-height: 1;
}

.description {
  font-size: 1rem;
  color: #666;
  margin: 4px 0;
}

.location {
  font-size: 0.9rem;
  color: #999;
}

.forecast {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}

.forecast-item {
  text-align: center;
  padding: 8px;
  background: #f8f9fa;
  border-radius: 8px;
}

.day {
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 4px;
}

.forecast-temp {
  font-size: 1rem;
  font-weight: 600;
  color: #1890ff;
}

.forecast-desc {
  font-size: 0.7rem;
  color: #999;
}

.weather-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
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
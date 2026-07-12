import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 호스팅 사이트의 하위 경로(sub-directory)에 배포할 때 필수적인 설정입니다.
  base: '/public/simulation/acid-base/',
})

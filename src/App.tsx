import './App.css'
import Dashboard from './Dashboard'
import axios from 'axios'
import useSWR from 'swr'
import { Box } from '@mui/material'
//랜덤 컬러 생성
export const randomPastelColor = () => {
  const hue = Math.floor(Math.random() * 360)
  const saturation = 70 + Math.floor(Math.random() * 30)
  const lightness = 70 + Math.floor(Math.random() * 30)
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}

function App() {
  // App에서 위젯리스트에 있는 객체 값들을 먼저 불러옴.
  const fetcher = (url: string) => axios.get(url).then(res => res.data)
  const {
    data: widgetList,
    error,
    isLoading,
  } = useSWR('http://localhost:4000/teamList_t1', fetcher)

  if (error) return <Box>에러가 발생했습니다.</Box>
  if (!widgetList) return <Box>위젯이 비었습니다.</Box>
  if (isLoading) return <Box>로딩중...</Box>

  return (
    <>
      <Dashboard widgetList={widgetList} />
    </>
  )
}

export default App

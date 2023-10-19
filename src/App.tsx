import { useEffect, useState } from 'react'
import './App.css'
import Dashboard from './Dashboard'
import axios from 'axios'
import useSWR from 'swr'
//랜덤 컬러 생성
export const randomPastelColor = () => {
  const hue = Math.floor(Math.random() * 360)
  const saturation = 70 + Math.floor(Math.random() * 30)
  const lightness = 70 + Math.floor(Math.random() * 30)
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}

// const widgetList = [
//   {
//     widgetId: 0,
//     widgetType: 'todo-widget',
//     widgetTitle: 'Weather Widget',
//     widgetContent: "Today's weather: Sunny",
//     widgetColor: randomPastelColor(),
//     contents: [
//       'Tasks: Buy groceries, Finish project',
//       '할 일 많음',
//       '왜 많지?',
//     ],
//   },
//   {
//     widgetId: 1,
//     widgetType: 'board-widget',
//     widgetTitle: 'board-widget',
//     widgetContent: "Today's weather: Sunny",
//     widgetColor: randomPastelColor(),
//     contents: [
//       '오늘 저녁 10시에 같이 스터디 할 사람',
//       ' 야나두 할 수 있니?',
//       '아니 아마 못할걸 ㅋㅋ',
//     ],
//   },
//   {
//     widgetId: 2,
//     widgetType: 'teamInfo-widget',
//     widgetTitle: 'teamInfo-widget',
//     widgetContent: "Today's weather: Sunny",
//     widgetColor: randomPastelColor(),
//     teamName: '42황차',
//     teamImae: 'image42.jpeg',
//     tags: ['hi', 'hello', 'bye'],
//     time: '2021-10-20',
//   },
//   {
//     widgetId: 3,
//     widgetType: 'notice-widget',
//     widgetTitle: 'notice-widget',
//     widgetContent: "Today's weather: Sunny",
//     widgetColor: randomPastelColor(),
//     title: '공지사항',
//     writer: '김민수',
//     content: '이번 주 회의록 업로드 해주세요',
//   },
//   {
//     widgetId: 4,
//     widgetType: 'link-widget',
//     widgetTitle: 'link-widget',
//     widgetContent: "Today's weather: Sunny",
//     widgetColor: randomPastelColor(),
//     linkList: [
//       { imageUrl: 'google.com', linkTitle: 'google' },
//       { imageUrl: 'naver.com', linkTitle: 'Slack' },
//     ],
//   },

//   // {
//   //   widgetId: 1,
//   //   widgetTitle: 'News Widget',
//   //   widgetContent: 'Latest news: React 18 Released!',
//   //   widgetColor: randomPastelColor(),
//   // },
//   // {
//   //   widgetId: 2,
//   //   widgetTitle: 'Stock Widget',
//   //   widgetContent: 'AAPL: $150.25 (+0.5%)',
//   //   widgetColor: randomPastelColor(),
//   // },
//   // {
//   //   widgetId: 3,
//   //   widgetTitle: 'Todo List Widget',
//   //   widgetContent: 'Tasks: Buy groceries, Finish project',
//   //   widgetColor: randomPastelColor(),
//   // },
//   // {
//   //   widgetId: 4,
//   //   widgetTitle: 'Calendar Widget',
//   //   widgetContent: 'Upcoming events: Meeting at 3 PM, Dinner with friends',
//   //   widgetColor: randomPastelColor(),
//   // },
//   // {
//   //   widgetId: 5,
//   //   widgetTitle: 'Fitness Tracker Widget',
//   //   widgetContent: "Today's steps: 7500, Calories burned: 300",
//   //   widgetColor: randomPastelColor(),
//   // },
// ]

interface Widget {
  widgetId: number
  widgetType: string
  widgetColor: string
}

function App() {
  const fetcher = (url: string) => axios.get(url).then(res => res.data)
  const {
    data: widgetList,
    error,
    isLoading,
  } = useSWR('http://localhost:4000/teamList_t1', fetcher)

  if (error) return <div>에러가 발생했습니다.</div>
  if (!widgetList) return <div>위젯이 비었습니다.</div>
  if (isLoading) return <div>로딩중...</div>

  return (
    <div>
      <Dashboard widgetList={widgetList} />
    </div>
  )
}

export default App

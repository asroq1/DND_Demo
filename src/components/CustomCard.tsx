import React from 'react'
import { Card, CardContent } from '@mui/material'
const CustomCard = ({ type, handleDragStart }: any) => {
  return (
    <Card
      style={{
        width: '100px',
        alignItems: 'center',
        margin: 10,
      }}
      //드롭 가능한 요소 표시
      className='droppable-element'
      //드래그 가능한 요소 표시
      draggable={true}
      //요소의 type을 id로 지정
      id={type}
      //드래그가 시작될 때 실행되는 함수
      onDragStart={handleDragStart}
    >
      <CardContent>
        <h3>{type}</h3>
      </CardContent>
    </Card>
  )
}

export default CustomCard

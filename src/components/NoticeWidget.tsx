import React from 'react'

const NoticeWidget = ({ widgetData }: any) => {
  return (
    <div className='notice-widget'>
      <h2>{widgetData.title}</h2>
      <p>작성자: {widgetData.writer}</p>
      <p>{widgetData.content}</p>
    </div>
  )
}

export default NoticeWidget

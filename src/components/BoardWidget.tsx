import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'

interface Notice {
  title: string
  writer: string
  content: string
}

const BoardWdiget = ({ widgetData }: any) => {
  return (
    <Card>
      <CardContent>
        <Typography variant='h5' component='div'>
          {widgetData.widgetTitle}
        </Typography>
        <Typography variant='subtitle1' color='textSecondary'>
          {widgetData.widgetTitle}
        </Typography>
        {widgetData.contents.map((content: any) => (
          <Typography variant='body2' color='textSecondary' key={content}>
            - {content}
          </Typography>
        ))}
      </CardContent>
    </Card>
  )
}

export default BoardWdiget

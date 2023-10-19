import React from 'react'
import { Paper, Typography, Chip, Avatar, Box } from '@mui/material'

// interface TeamInformationProps {
//   teamName: string
//   teamImage: string
//   tags: string[]
//   time: string
// }

function TeamInformationWidget({ widgetData }: any) {
  return (
    <Paper
      elevation={3}
      style={{ width: '90', height: '100%', padding: '16px' }}
    >
      <div
        style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}
      >
        <Avatar alt={widgetData.widgetTitle} src={widgetData.widgetTitle} />
        <Typography variant='h5' style={{ marginLeft: '16px' }}>
          {widgetData.widgetTitle}
        </Typography>
      </div>
      <Typography variant='body1' gutterBottom>
        Date: {widgetData.time}
      </Typography>
      <Typography variant='body1' gutterBottom>
        Tags:
        {widgetData.tags.map((tag: any, index: any) => (
          <Chip key={index} label={tag} style={{ marginRight: '8px' }} />
        ))}
      </Typography>
    </Paper>
  )
}

export default TeamInformationWidget

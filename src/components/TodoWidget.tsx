import { Box, FormControlLabel, FormGroup, Typography } from '@mui/material'
import React from 'react'
import Checkbox from '@mui/material/Checkbox'

const TodoWidget = (widgetData: any) => {
  return (
    <Box>
      <Typography variant='h6'>{widgetData.widgetData.widgetTitle}!</Typography>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox />}
          label={widgetData.widgetData.widgetContent}
        />
      </FormGroup>
      {/* <Checkbox /> */}
    </Box>
  )
}

export default TodoWidget

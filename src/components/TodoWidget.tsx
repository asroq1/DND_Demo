import { FormControlLabel, FormGroup, Typography } from '@mui/material'
import React from 'react'
import Checkbox from '@mui/material/Checkbox'

const TodoWidget = (widgetData: any) => {
  return (
    <div>
      아녕하세요
      <Typography variant='h6'>{widgetData.widgetData.widgetTitle}!</Typography>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox />}
          label={widgetData.widgetData.widgetContent}
        />
      </FormGroup>
      {/* <Checkbox /> */}
    </div>
  )
}

export default TodoWidget

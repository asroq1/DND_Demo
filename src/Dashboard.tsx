import React, { useEffect, useState } from 'react'
import { Responsive, WidthProvider, Layout } from 'react-grid-layout'
import Grid from '@mui/material/Grid'
import WidgetCard from './WidgetCard'
import { Box, Button } from '@mui/material'
import { randomPastelColor } from './App'
import TodoWidget from './components/TodoWidget'
import CustomCard from './components/CustomCard'
import TeamInformationWidget from './components/TeamInformationWidget'
import BoardWdiget from './components/BoardWidget'
import NoticeWidget from './components/NoticeWidget'
import axios from 'axios'

interface DashboardProps {
  widgetList: Array<any>
}

//반응형 그리드 레이아웃 사용
//여러 브레이크 포인트에 대한 레이아웃을 정의할 수 있다.
const ResponsiveGridLayout = WidthProvider(Responsive)

//고정된 그리드를 기준으로 부모요소의 너비에 따라 반응한다.
//const ResponsiveGridLayout = WidthProvider(React-grid-layout);

const Dashboard: React.FC<DashboardProps> = ({ widgetList }) => {
  const [isEditMode, setIsEditMode] = useState(false)

  //현재 break point
  const [currentBreakpoint, setCurrentBreakpoint] = useState('lg')

  //아이템 추가시의 index값
  const [index, setIndex] = useState(widgetList.length)

  //그리드 영역이 꽉 차면 더이상 drop할 수 없음
  const [droppable, setDroppable] = useState(true)

  //drag-drop중 onLayoutChange막기위함
  const [isDroppaing, setIsDropping] = useState(false)
  //droppable item 속성 설정
  const [droppingItem, setDroppingItem] = useState({
    i: '__dropping-elem__',
    w: 1,
    h: 1,
  })

  // 여기서 활용하는 get요청은 서버에서 받아온 위치 좌표 데이터를 state에 저장하는 것이다.
  // layout_1은 죄표 값.

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/layout_1')
        const jsonData = response.data
        setState(jsonData.state)
        console.log('받아온 layout 좌표', jsonData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    console.log('before', state)
    getData()
    console.log('현재 위젯 좌표', state)
  }, [])

  console.log('on Dashboard widgetList', widgetList)
  const [widgets, setWidgets] = useState(widgetList)
  const [state, setState] = useState<{
    breakpoints: string
    layouts: {
      [key: string]: {
        x: number
        y: number
        w: number
        h: number
        i: string
        minW?: number
        minH?: number
        type: string
      }[]
    }
  }>({
    breakpoints: 'lg',
    layouts: {
      lg: [
        { x: 0, y: 0, w: 1, h: 1, i: '0', type: 'todo-widget' },
        { x: 2, y: 0, w: 1, h: 1, i: '1', type: 'board-widget' },
        { x: 0, y: 1, w: 1, h: 1, i: '2', type: 'teamInfo-widget' },
        { x: 2, y: 1, w: 1, h: 1, i: '3', type: 'notice-widget' },
        { x: 0, y: 2, w: 1, h: 1, i: '4', type: 'link-widget' },
      ],
      md: [
        { x: 0, y: 0, w: 1, h: 1, i: '0', type: 'todo-widget' },
        { x: 2, y: 0, w: 1, h: 1, i: '1', type: 'board-widget' },
        { x: 0, y: 1, w: 1, h: 1, i: '2', type: 'teamInfo-widget' },
        { x: 2, y: 1, w: 1, h: 1, i: '3', type: 'notice-widget' },
        { x: 0, y: 2, w: 1, h: 1, i: '4', type: 'link-widget' },
      ],
      sm: [
        { x: 0, y: 0, w: 1, h: 1, i: '0', type: 'todo-widget' },
        { x: 2, y: 0, w: 1, h: 1, i: '1', type: 'board-widget' },
        { x: 0, y: 1, w: 1, h: 1, i: '2', type: 'teamInfo-widget' },
        { x: 2, y: 1, w: 1, h: 1, i: '3', type: 'notice-widget' },
        { x: 0, y: 2, w: 1, h: 1, i: '4', type: 'link-widget' },
      ],
      xs: [
        { x: 0, y: 0, w: 1, h: 1, i: '0', type: 'todo-widget' },
        { x: 2, y: 0, w: 1, h: 1, i: '1', type: 'board-widget' },
        { x: 0, y: 1, w: 1, h: 1, i: '2', type: 'teamInfo-widget' },
        { x: 2, y: 1, w: 1, h: 1, i: '3', type: 'notice-widget' },
        { x: 0, y: 2, w: 1, h: 1, i: '4', type: 'link-widget' },
      ],
      xxs: [
        { x: 0, y: 0, w: 1, h: 1, i: '0', type: 'todo-widget' },
        { x: 2, y: 0, w: 1, h: 1, i: '1', type: 'board-widget' },
        { x: 0, y: 1, w: 1, h: 1, i: '2', type: 'teamInfo-widget' },
        { x: 2, y: 1, w: 1, h: 1, i: '3', type: 'notice-widget' },
        { x: 0, y: 2, w: 1, h: 1, i: '4', type: 'link-widget' },
      ],
    },
  })
  // const [updatedLayouts, setupdatedLayouts] = useState<{
  //   breakpoints: string
  //   layouts: {
  //     [key: string]: {
  //       x: number
  //       y: number
  //       w: number
  //       h: number
  //       i: string
  //       minW?: number
  //       minH?: number
  //       type: string
  //     }[]
  //   }
  // }>()
  //레이아웃 공간 계산
  useEffect(() => {
    let totalVol = 0
    if (widgets) {
      widgets.map(
        (widget: any, index: number) =>
          (totalVol +=
            state.layouts[currentBreakpoint][index].w *
            state.layouts[currentBreakpoint][index].h)
      )
    }

    if (totalVol >= 30) {
      console.log('grid is full!')
      setDroppable(false)
    }
    // setWidgets(widgetList)
    // widgetList.map((widget: any, index: number) => {})
  }, [state, widgetList, widgets, currentBreakpoint])

  //레이아웃이 변경될 때, 그 정보를 업데이트 한다.
  const onLayoutChange = (layout: any, layouts: any) => {
    // console.log('layout', layouts)

    // setupdatedLayouts(layout)
    //아이템이 dropping중 이라면 return
    if (isDroppaing) {
      return
    }
    // 모든 breakpoint에 동일한 변경 사항을 반영
    const updatedLayouts = Object.keys(layouts).reduce(
      (acc: any, breakpoint) => {
        acc[breakpoint] = layout
        return acc
      },
      {}
    )
    setState(prevState => ({
      ...prevState,
      layouts: updatedLayouts,
    }))

    setState(prevWidgets => ({
      ...prevWidgets,
      ...widgets,
    }))

    // setWidgets(prevWidgets => [...prevWidgets, ...widgets])

    console.log('updated layouts: ', updatedLayouts)
    console.log('changed state: ', state)
    console.log('changed widgets: ', widgets)
  }

  //Drag시작할 때
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    //isDropping state 변경
    setIsDropping(true)

    //drag하는 item 종류 (id)에 따라 dropping item 속성 변경
    if (event.currentTarget.id === 'todo-widget') {
      setDroppingItem({ i: 'todo-widget', w: 2, h: 1 })
    } else if (event.currentTarget.id === 'board-widget') {
      setDroppingItem({ i: 'board-widget', w: 2, h: 1 })
    } else if (event.currentTarget.id === 'teaminfo-widget') {
      setDroppingItem({ i: 'teaminfo-widget', w: 2, h: 1 })
    } else if (event.currentTarget.id === 'notice-widget') {
      setDroppingItem({ i: 'notice-widget', w: 2, h: 1 })
    } else if (event.currentTarget.id === 'link-widget') {
      setDroppingItem({ i: 'link-widget', w: 2, h: 1 })
    }
    //drag 하는 item의 종류를 나중에 판별할 수 있도록 setData
    event.dataTransfer.setData('text/plain', event.currentTarget.id)
  }

  //onDrop함수!!!!
  const onDrop = (layout: Layout[], layoutItem: Layout, event: Event) => {
    //레이아웃 업데이트
    console.log('item:', layoutItem)
    //console.log("event:", event);

    //drop하는 element의 종류(id) 가져옴 - handleDragStart에서 set했던 data를 get
    const droppedElementId = (event as any).dataTransfer.getData('text/plain')
    console.log('Dropped element ID:', droppedElementId)

    //drop의 위치가 grid 벗어날 경우
    if (layoutItem.x + layoutItem.w > 5 || layoutItem.y + layoutItem.h > 6) {
      console.log('wrong-drop!')
      return
    }

    setState((prevState: any) => {
      const newLayouts = { ...prevState.layouts }
      const newItem = {
        x: layoutItem.x,
        y: layoutItem.y,
        w: layoutItem.w,
        h: layoutItem.h,
        i: String(index),
        type: droppedElementId,
        //text-input의 최소 크기 2 * 1
        ...(droppedElementId === 'text-input' ? { minW: 2 } : {}),
        //image-input의 최소 크기 2 * 2
        ...(droppedElementId === 'image-input' ? { minW: 2, minH: 2 } : {}),
        // 여기서 widget종류에 따라 위젯의 크기를 설정할 수 있음
        ...(droppedElementId === 'todo-widget'
          ? { x: 0, y: 0, w: 2, h: 2 }
          : {}),
      }
      if (newLayouts[currentBreakpoint]) {
        newLayouts[currentBreakpoint].push(newItem)
      }
      // 모든 breakpoint에 대해 동일한 항목 추가
      Object.keys(newLayouts).forEach(breakpoint => {
        if (newLayouts[breakpoint]) {
          newLayouts[breakpoint].push(newItem)
        }
      })
      return {
        ...prevState,
        layouts: newLayouts,
      }
    })

    //위젯내용 업데이트
    setWidgets((prevWidgets: any) => [
      ...prevWidgets,
      {
        widgetId: index,
        widgetType: droppedElementId,
        widgetColor: randomPastelColor(),
      },
    ])
    setIndex(index + 1)
    //drag-drop 종료
    setIsDropping(false)
  }

  //브레이크포인트가 변경될 때
  const onBreakpointChange = (breakpoint: string) => {
    setCurrentBreakpoint(breakpoint)
    setState((prevState: any) => ({
      ...prevState,
      breakpoints: breakpoint,
    }))
    console.log('breakpoint change!: ', breakpoint)
  }

  // 편집 버튼 클릭 이후 확인 버튼을 클릭하면 동작하는 함수.
  // 변경된 위치 좌표 값이 잘 반영 안돼서 새로운 객체로 만들어서 updatedLayouts로 넣어줌

  const onLayoutReset = async () => {
    // 레이아웃 정보를 초기 레이아웃으로 설정합니다.
    console.log('서버에 날라가는 값 보기', state)
    //FIXME: state에서 추가된 객체 obj값도 넣어주기
    alert('레이아웃을 수정합니다.')
    try {
      const updatedLayouts = {
        breakpoints: 'lg',
        layouts: {
          ...state.layouts,
        },
      }

      console.log('업데이트된 데이터', updatedLayouts)
      const response = await axios.put('http://localhost:4000/layout_1', {
        state: updatedLayouts,
      })

      console.log('PATCH request successful:', response.data)
    } catch (error) {
      console.error('Error making PATCH request:', error)
    }
  }

  // ...

  return (
    <>
      <Box
        style={{
          display: 'flex',
          padding: '10px',
          maxWidth: '1200px',
        }}
      >
        <h1>Dashboard</h1>
        {/* 편집 버튼 */}
        <Button
          onClick={() => {
            setIsEditMode(!isEditMode)
            console.log('isEditMode: ', isEditMode)
            if (isEditMode) {
              // "편집" 모드를 끝내고 "확인" 모드로 전환 시 초기 레이아웃을 설정합니다.
              onLayoutReset()
            }
          }}
          size='large'
          sx={{ fontWeight: 'bold' }}
        >
          {isEditMode ? '확인' : '편집'}
        </Button>
      </Box>
      {/* 툴박스 영역 */}
      <Box
        style={{
          backgroundColor: 'skyblue',
          borderRadius: '5px',
          padding: 10,
          display: 'flex',
          maxWidth: '1185px',
        }}
      >
        {/* 드롭할 수 있는 요소1 - 텍스트 박스 놓기 */}
        <CustomCard type={'todo-widget'} handleDragStart={handleDragStart} />
        <CustomCard type={'board-widget'} handleDragStart={handleDragStart} />
        <CustomCard
          type={'teamInfo-widget'}
          handleDragStart={handleDragStart}
        />
        <CustomCard type={'notice-widget'} handleDragStart={handleDragStart} />
        <CustomCard type={'link-widget'} handleDragStart={handleDragStart} />
      </Box>
      {/* 그리드 영역 */}
      <ResponsiveGridLayout
        layouts={state.layouts}
        //브레이크 포인트 기준
        breakpoints={{
          lg: 1200,
          md: 996,
          sm: 768,
          xs: 480,
          xxs: 0,
        }}
        //한 행이나 열에서 아이템 배치에 따라 컴팩트하게 재배치되는 것을 방지
        compactType={null}
        //하나의 그리드 아이템이 다른 아이템 위로 드래그되거나 리사이즈되는 것을 방지
        preventCollision={true}
        //브레이크 포인트마다의 column 개수
        cols={{ lg: 5, md: 5, sm: 5, xs: 5, xxs: 5 }}
        //각 행의 높이 (px)
        rowHeight={150}
        //그리드 너비
        width={1200}
        //최대 행 개수
        maxRows={6}
        //isEditMode일때만 grid내의 resize, drag가능
        //그리드 아이템의 resize 가능 여부
        isResizable={isEditMode}
        //그리드 아이템의 drag 가능 여부
        isDraggable={isEditMode}
        //그리드에 외부요소 drop 가능 여부
        isDroppable={droppable}
        //그리드에 drop되는 item의 속성 default => {i: "__dropping-elem__", h: 1, w: 1}
        droppingItem={droppingItem}
        //그리드 크기 제한
        style={{
          //너비는 reponsive에 맞게 최소 480~1200
          maxWidth: '1200px',
          minWidth: '480px',
          //높이 고정 (행이 6개일 때 기준, 150 * 6 + margin, padding 값 포함)
          minHeight: '970px',
          maxHeight: '970px',
          borderRadius: '5px',
          border: '2px solid #3a3a3a',
        }}
        //그리드 내에 변화가 생겼을 때 호출되는 함수
        onLayoutChange={onLayoutChange}
        //화면상의 그리드의 너비에 따라 breakpoint가 바뀌었을 때 호출되는 함수
        onBreakpointChange={onBreakpointChange}
        //외부 요소가 drop 되었을 때 호출되는 함수
        onDrop={onDrop}
      >
        {widgets &&
          widgets.map((widget: any, index: number) => (
            // 초기 위젯 위치와 높이 설정
            // 위젯의 인덱스 값 -> state의 layout index값으로 찾아옴
            // console.log('sm', sm)

            <Box
              key={widget.widgetId}
              data-grid={{
                x: state.layouts[currentBreakpoint][index].x,
                y: state.layouts[currentBreakpoint][index].y,
                w: state.layouts[currentBreakpoint][index].w,
                h: state.layouts[currentBreakpoint][index].h,
                minW: state.layouts[currentBreakpoint][index].minW,
                minH: state.layouts[currentBreakpoint][index].minH, // default grid configuration
              }}
            >
              <Grid
                item
                sx={{ width: '100%', height: '100%', backgroundColor: 'green' }}
              >
                <WidgetCard widgetInfo={widget}>
                  {widget.widgetType === 'todo-widget' && (
                    <TodoWidget widgetData={widget} />
                  )}
                  {widget.widgetType === 'board-widget' && (
                    <BoardWdiget widgetData={widget} />
                  )}
                  {widget.widgetType === 'teamInfo-widget' && (
                    <TeamInformationWidget widgetData={widget} />
                  )}
                  {widget.widgetType === 'notice-widget' && (
                    <NoticeWidget widgetData={widget} />
                  )}
                  {widget.widgetType === 'link-widget' && (
                    <TodoWidget widgetData={widget} />
                  )}
                  todo-widget
                </WidgetCard>
              </Grid>
            </Box>
          ))}
      </ResponsiveGridLayout>
    </>
  )
}

export default Dashboard

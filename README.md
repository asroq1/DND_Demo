### 현재 진행상황

![Screen Recording 2023-10-25 at 6 10 07 PM](https://github.com/asroq1/DND_Demo/assets/62472550/565d7c23-6cf9-4d9e-8fe2-f66602a79205)

- DND에서 좌표 값 및 위젯 객체의 값들을 따로 관리해서 원래 존재하던 위젯의 값들을 화면에 렌더링 하고 위치를 수정한 이후에 서버에 좌표 위치를 업데이트 하는 거까지 작동.


<br/>

### 문제사항
![Screen Recording 2023-10-25 at 6 14 18 PM](https://github.com/asroq1/DND_Demo/assets/62472550/328b47f3-18c5-4b2d-bd81-ba1361c46b5f)

- DND에서 새로운 위젯을 추가하고 난 이후에 편집에서 확인 버튼을 누르면 현재 새로 추가된 위젯의 좌표 값은 백엔드 서버에 추가되는데, 이후에 새로운 위젯 객체의 값이 추가되지 않아 보이지 않는 문제가 발생함.

```ts
// 아래의 코드가 수정을 하는 코드인데, 아래 이미지에 첨부한 형태로 위젯 데이터가 날라가서 widgetList api에도 동일하게 put요청을 해야하는 상황

 const onLayoutReset = async () => {
    // 레이아웃 정보를 초기 레이아웃으로 설정합니다.
    console.log('서버에 날라가는 값 보기', state)

    // state안에 새로 업데이트된 위젯 객체 값도 put으로 teamList_t1 api에 업데이트 해주면 될 거 같습니다.

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
```
#### 현재 날아가는 state객체 값
<img width="725" alt="Screenshot 2023-10-25 at 6 21 20 PM" src="https://github.com/asroq1/DND_Demo/assets/62472550/958fb9e4-9b1e-46ef-b34d-e5f28dae4fbd">

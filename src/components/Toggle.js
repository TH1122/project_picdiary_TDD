import { useState } from 'react';
import styled from 'styled-components';


//#8b8b8b
const ToggleContainer = styled.div`
  position: relative;
  margin-top: 8rem;
  left: 47%;
  cursor: pointer;

  > .toggle-container {
    width: 50px;
    height: 24px;
    border-radius: 30px;
    background-color: #8b8b8b;
    // TODO : .toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현합니다.
  }

  > .toggle-container.toggle--checked{
    width: 50px;
    height: 24px;
    border-radius: 30px;
    background-color: #4000c7;
    // TODO : .toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현합니다.
  }

  > .toggle-circle {
    transition: all 0.5s ease;
    position: absolute;
    top: 1px;
    left: 1px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: #ffffff;
    // TODO : .toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현합니다.
  }

  > .toggle-circle.toggle--checked {
    transition: all 0.5s ease;
    position: absolute;
    top: 1px;
    left: 27px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: #ffffff;
    // TODO : .toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현합니다.
  }
`;

const Desc = styled.div`
position: relative;
left: 47%;
`;

export const Toggle = () => {
  const [isOn, setisOn] = useState(false);

  const toggleHandler = () => {
    setisOn(!isOn)
  };

  return (
    <>
      <ToggleContainer
        onClick={toggleHandler}
      >
        {/* TODO : 아래에 div 엘리먼트 2개가 있습니다. 각각의 클래스를 'toggle-container', 'toggle-circle' 로 지정하세요. */}
        {/* TIP : Toggle Switch가 ON인 상태일 경우에만 toggle--checked 클래스를 div 엘리먼트 2개에 모두 추가합니다. 조건부 스타일링을 활용하세요. */}
        <div className={isOn? 'toggle-container toggle--checked' :'toggle-container'} />
        <div className={isOn? 'toggle-circle toggle--checked' :'toggle-circle'} />
      </ToggleContainer>
      {/* TODO : Desc 컴포넌트를 활용해야 합니다. */}
      {(isOn)?'Toggle Switch ON':'Toggle Switch OFF'}
    </>
  );
};
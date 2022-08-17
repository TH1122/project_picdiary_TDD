import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Menubar = () => {
  const MenuBar_container = styled.section`
    width: 100%;
    height: 76px;
    display: flex;
    justify-content: space-between;
    background-color: #b5d8dd;
  `;

  const Logo_wrapper = styled.div`
    flex-grow: 3;
    display: flex;
    justify-content: center;
    align-items: center;

    .logo_icon {
      width: 100px;
      padding: 5px 30px;
      border: 2px solid black;
      background-color: #f3e4e4;
      font-size: 20px;
    }
  `;

  const Icon_wrapper = styled.div`
    flex-grow: 4;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .menu_icon {
      height: 30px;
      margin: 0px 5px;
    }
  `;

  return (
    <>
      <MenuBar_container>
        <Logo_wrapper>
          <Link to="/">
            <span className="logo_icon">Pic_Diary</span>
          </Link>
        </Logo_wrapper>
        <Icon_wrapper>
          <Link to="/list">
            <button className="menu_icon">리스트보기</button>
          </Link>
          <Link to="/add">
            <button className="menu_icon">다이어리추가</button>
          </Link>
        </Icon_wrapper>
      </MenuBar_container>
    </>
  );
};

export default Menubar;

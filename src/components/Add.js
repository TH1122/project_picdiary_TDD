import React, { useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Add = ({ picData, setPicData }) => {
  const dateRef = useRef(null);
  let navigate = useNavigate();
  const Add_container = styled.div`
    width: 390px;
    height: 100%;
    display: flex;
    flex-direction: column;
  `;
  const Info_container = styled.form`
    height: 76px;
    background-color: #f4eee2;
    margin-bottom: 20px;
    display: flex;

    > .info_wrapper {
      flex-grow: 5;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: stretch;
    }
    > .icon_wrapper {
      flex-grow: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `;

  const handleSubmit = (e) => {
    const getRandomNumber = (min, max) => {
      return parseInt(Math.random() * (Number(max) - Number(min) + 2));
    };
    // setPicData([
    //   ...picData,
    //   {
    //     id: picData.length,
    //     date: e.target[0].value,
    //     title: e.target[1].value,
    //     content: [
    //       {
    //         date_id: 0,
    //         picture: `https://picsum.photos/id/${getRandomNumber(
    //           1,
    //           98
    //         )}/300/300`,
    //         text: "",
    //       },
    //     ],
    //   },
    // ]);
    fetch("http://localhost:3001/diary/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: picData.length,
        date: e.target[0].value,
        title: e.target[1].value,
        content: [
          {
            date_id: 0,
            picture: `https://picsum.photos/id/${getRandomNumber(
              1,
              98
            )}/300/300`,
            text: "",
          },
        ],
      }),
    });

    navigate(`/add/${e.target[0].value}`);
  };

  const onFocus = () => {
    fetch(`http://localhost:3001/diary/?date=${dateRef.current.value}`)
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((data) => {
        if (data.length > 0) {
          alert("해당 날짜 데이터로 이동합니다");
          navigate(`/add/${dateRef.current.value}`);
        }
      });
  };

  return (
    <>
      <Add_container>
        <Info_container onSubmit={handleSubmit}>
          <div className="info_wrapper">
            <label>
              날짜 :<input type="date" ref={dateRef}></input>
            </label>
            <label>
              제목 :<input onFocus={onFocus}></input>
            </label>
          </div>
          <div className="icon_wrapper">
            <button>사진추가</button>
          </div>
        </Info_container>
      </Add_container>
    </>
  );
};

export default Add;

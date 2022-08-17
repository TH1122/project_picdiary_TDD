import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import PicAdd from "../UI_components/PicAdd";

const AddByDate = ({
  picData,
  setPicData,
  setIsPending,
  rawCategoryData,
  categories,
  setRawCategoryData,
  setCategories,
  isChanged,
  setIsChanged,
}) => {
  const { date } = useParams();
  const [newPicData, setNewPicData] = useState([]);
  const [title, setTitle] = useState("");
  // const [data, setData] = useState(null);
  const [options, setOptions] = useState([]);
  const [rawData, setRawData] = useState(null);
  // const [isChanged, setIsChanged] = useState(false);
  useEffect(() => {
    fetch("http://localhost:3001/categories/")
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data, "data");
        setRawCategoryData(data);
        setCategories(data.map((el) => el.category));
      });
  }, []);

  useEffect(() => {
    setIsPending(true);
    fetch(`http://localhost:3001/diary/?date=${date}`)
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((data) => {
        setNewPicData(data[0].content);
        setTitle(data[0].title);
        setIsPending(false);
        setRawData(data);
      });
    setOptions(["---", ...categories]);
  }, [categories]);

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
  const Picadd_wrapper = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  const handleSubmit = (e) => {
    const getRandomNumber = (min, max) => {
      return parseInt(Math.random() * (Number(max) - Number(min) + 2));
    };
    fetch(`http://localhost:3001/diary/${rawData[0].id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: [
          ...rawData[0].content,
          {
            date_id: `${rawData[0].content.length}`,
            picture: `https://picsum.photos/id/${getRandomNumber(
              1,
              98
            )}/300/300`,
            text: "",
          },
        ],
      }),
    });
    // setData(
    //   (data.content[data.content.length] = {
    //     date_id: data.content.length,
    //     picture: `https://picsum.photos/id/${getRandomNumber(1, 98)}/300/300`,
    //     text: "",
    //   })
    // );
  };
  // useEffect(() => {
  //   setNewPicData(
  //     ...picData.filter((el) => el.date === date).map((el) => el.content)
  //   );
  //   setData(...picData.filter((el) => el.date === date));
  //   setTitle(...picData.filter((el) => el.date === date).map((el) => el.title));
  //   picData.forEach((el) => {
  //     el.content.forEach((content) => {
  //       console.log(content.category);
  //       if (
  //         !options.includes(content.category) &&
  //         content.category !== undefined
  //       ) {
  //         options.push(content.category);
  //       }
  //     });
  //   });
  //   setOptions(options);
  // }, []);

  // useEffect(() => {
  //   setNewPicData(
  //     ...picData.filter((el) => el.date === date).map((el) => el.content)
  //   );
  // }, [picData]);

  // useEffect(() => {
  //   setNewPicData(
  //     ...picData.filter((el) => el.date === date).map((el) => el.content)
  //   );
  //   setData(...picData.filter((el) => el.date === date));
  // }, [data]);

  return (
    <>
      <Add_container>
        <Info_container onSubmit={handleSubmit}>
          <div className="info_wrapper">
            <label>
              날짜 :<input type="date" value={date} readOnly="true"></input>
            </label>
            <label>
              제목 :<input value={title} readOnly="true"></input>
            </label>
          </div>
          <div className="icon_wrapper">
            <button>사진추가</button>
          </div>
        </Info_container>
        <Picadd_wrapper>
          {newPicData.map((el) => {
            return (
              <PicAdd
                key={el.id}
                date={date}
                data={el}
                picture={el.picture}
                content={el.picture}
                picData={picData}
                setPicData={setPicData}
                options={options}
                newPicData={newPicData}
                rawData={rawData}
                isChanged={isChanged}
                setIsChanged={setIsChanged}
              ></PicAdd>
            );
          })}
        </Picadd_wrapper>
      </Add_container>
    </>
  );
};

export default AddByDate;

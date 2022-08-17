import React, { useState, useEffect } from "react";
import PicCategory from "./PicCategory";
import styled from "styled-components";

const Home = ({
  picData,
  rawCategoryData,
  categories,
  setRawCategoryData,
  setCategories,
}) => {
  // const [rawCategoryData, setRawCategoryData] = useState([]);
  // const [categories, setCategories] = useState([]);
  const [categoryData, setCategoryData] = useState({});
  const [isSetting, setIsSetting] = useState(false);
  // useEffect(() => {
  //   fetch("http://localhost:3001/categories/")
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw Error("could not fetch the data for that resource");
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setRawCategoryData(data);
  //       setCategories(data.map((el) => el.category));
  //     });
  // }, []);

  // useEffect(() => {
  //   //카테고리데이터가 배열일 경우
  //   categories.forEach((el) => {
  //     categoryData.push([el, []]);
  //   });
  //   setCategoryData(categoryData);
  // }, [categories]);

  // useEffect(() => {
  //   // 카테고리데이터가 배열일 경우
  //   picData.forEach((el) => {
  //     el.content.forEach((content) => {
  //       if (categories.includes(content.category)) {
  //         categoryData[categories.indexOf(content.category)][1].push({
  //           date: el.date,
  //           picture: content.picture,
  //           text: content.text,
  //           title: el.title,
  //         });
  //       }
  //     });
  //   });
  //   setCategoryData(categoryData);
  // }, [categories]);

  useEffect(() => {
    //카테고리데이터가 객체일 경우
    categories.forEach((el) => {
      categoryData[el] = [];
    });
    setCategoryData(categoryData);
  }, [categories]);

  useEffect(() => {
    // 카테고리데이터가 객체일 경우
    picData.forEach((el) => {
      el.content.forEach((content) => {
        if (categories.includes(content.category)) {
          categoryData[content.category].push({
            date: el.date,
            picture: content.picture,
            text: content.text,
            title: el.title,
          });
        }
      });
    });
    setCategoryData(categoryData);
  }, [categories]);

  const SettingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin: 10px;
  `;

  const CategoryContainer = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;

  const onSet = () => {
    setIsSetting(!isSetting);
  };
  return (
    <>
      <SettingContainer>
        <button onClick={onSet}>카테고리 설정</button>
      </SettingContainer>
      <CategoryContainer>
        {categories.map((el, idx) => {
          return (
            <PicCategory key={idx} categoryData={categoryData} category={el} />
          );
        })}
      </CategoryContainer>
    </>
  );
};

export default Home;

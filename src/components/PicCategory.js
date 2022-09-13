import React, { useState, useEffect, Component } from "react";
import styled from "styled-components";
import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const PicContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 30px;
  margin: 10px 0px 30px 0px;
`;

const PicWrapper = styled.div`
  background-color: #f2f2f2;
  width: 330px;
  height: 400px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  > .photoContainer {
    margin: 15px 0px;
    width: 300px;
    height: 300px;
  }
  > .storyWrapper {
    margin: 15px 0px;
    width: 300px;
    height: 40px;
    background-color: #c2c2c2;
    display: flex;
    flex-direction: column;
  }
`;
const Date = styled.span`
  width: 300px;
  height: 20px;
  background-color: #c2c2c2;
`;
const Content = styled.span`
  width: 300px;
  height: 20px;
  background-color: #c2c2c2;
`;

const Wrap = styled.div`
  width: 390px;
  height: 520px;

  > .category_title {
    display: flex;
    justify-content: flex-start;
    width: 210px;
    background-color: grey;
    margin: 10px 10px 10px 30px;
    padding: 10px;
    vertical-align: middle;
    font-weight: bold;
  }
`;

const PicCategory = ({
  category,
  categories,
  picData,
  categoryDataChanged,
}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const [storyCategory, setStoryCategory] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/categories/")
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((data) => {
        setStoryCategory(
          data.filter((el) => el.category === category)[0].content
        );
      });
  }, [categories, categoryDataChanged]);

  class SimpleSlider extends Component {
    render() {
      const Slider_wrapper = styled.div`
        display: flex;
        justify-content: center;
      `;
      return (
        <>
          <Slider {...settings}>
            {storyCategory.map((el) => {
              return (
                <>
                  <Slider_wrapper>
                    <PicWrapper>
                      <div className="photoContainer">
                        <img src={el.picture} />
                      </div>
                      <div className="storyWrapper">
                        <Date>{el.date}</Date>
                        <Content>{`${el.title} / ${el.text}`}</Content>
                      </div>
                    </PicWrapper>
                  </Slider_wrapper>
                </>
              );
            })}
          </Slider>
        </>
      );
    }
  }
  return (
    <>
      <PicContainer>
        <Wrap>
          <span className="category_title">{category}</span>
          <SimpleSlider className="carousel" />
        </Wrap>
      </PicContainer>
    </>
  );
};
export default PicCategory;

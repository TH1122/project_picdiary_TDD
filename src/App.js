import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MenuBar from "./components/MenuBar";
import Home from "./components/Home";
import Add from "./components/Add";
import List from "./components/List";
import AddByDate from "./components/AddByDate";

function App() {
  const [picData, setPicData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [rawCategoryData, setRawCategoryData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/diary/")
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((data) => {
        setIsPending(false);
        setPicData(data);
      });
  }, [isPending, isChanged]);

  useEffect(() => {
    fetch("http://localhost:3001/categories/")
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((data) => {
        setRawCategoryData(data);
        setCategories(data.map((el) => el.category));
      });
  }, []);

  return (
    <>
      <BrowserRouter>
        <div className="App">
          <div className="safeBox"></div>
          <main>
            <MenuBar />
            <section className="main">
              <Routes>
                <Route
                  path="/"
                  element={
                    !isPending && (
                      <Home
                        picData={picData}
                        rawCategoryData={rawCategoryData}
                        setRawCategoryData={setRawCategoryData}
                        categories={categories}
                        setCategories={setCategories}
                      />
                    )
                  }
                />
                <Route path="/list" element={<List picData={picData} />} />
                <Route
                  path="/add"
                  element={<Add picData={picData} setPicData={setPicData} />}
                />
                <Route
                  path="/add/:date"
                  element={
                    <AddByDate
                      picData={picData}
                      setPicData={setPicData}
                      setIsPending={setIsPending}
                      rawCategoryData={rawCategoryData}
                      setRawCategoryData={setRawCategoryData}
                      categories={categories}
                      setCategories={setCategories}
                      isChanged={isChanged}
                      setIsChanged={setIsChanged}
                    />
                  }
                />
              </Routes>
            </section>
          </main>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;

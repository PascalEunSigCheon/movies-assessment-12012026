import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Navbar from "../components/Navbar";
import DynamicForm from "../components/DynamicForm";
import { movieApi } from "../constants/axios";
import { movieRequests } from "../constants/requests";
import useAppStateContext from "../hooks/useAppStateContext";
import Row from "../components/Row";
import { useDispatch, useSelector } from "react-redux";
import {
  getMovies,
  selectAllMovies,
  selectMoviesStatus,
} from "../slices/movieSlice";
import { SkeletonWrapper } from "react-skeletonify";
import "react-skeletonify/dist/index.css";


const HomePage = () => {

  const { appState } = useAppStateContext();


  const dispatch = useDispatch();
  const status = useSelector(selectMoviesStatus);
  const movies = useSelector(selectAllMovies);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getMovies());
    }
  });
  console.log(appState.isDarkMode)

  return (
    <div
      className="page"
      style={{ backgroundColor: appState.isDarkMode ? "#111" : "grey", overflow: "hidden" }}
    >
      <DynamicForm field1_name={"abc"} field1_height={50} field1_width={5} />
      <Navbar />
      <Banner />
      {Object.keys(movies).map((title) => (
        <Row key={title} title={title} movies={movies[title]} />
      ))}
    </div>
  );
};

export default HomePage;

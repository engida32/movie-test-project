"use client";
import { Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const API_KEY = process.env.API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const MovieListPage = () => {
  const getMovies = useQuery({
    queryKey: ["movies"],
    queryFn: () =>
      axios.get(
        `${process.env.BASE_URL}/account/null/lists?page=1`,

        {
          headers: {
            Authorization: `Bearer ${process.env.TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      ),

    enabled: Boolean(process.env.TOKEN),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
  React.useEffect(() => {
    getMovies.refetch();
  }, []);
  return (
    <Stack
      sx={{
        //style this page
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      this is move list page
    </Stack>
  );
};

export default MovieListPage;

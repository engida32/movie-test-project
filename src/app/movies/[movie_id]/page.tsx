"use client";
import { Box, Button, LinearProgress, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

const MovieDetail = ({ params }: { params: { movie_id: string } }) => {
  const router = useRouter();
  const getMovie = useQuery({
    queryKey: ["movie", params.movie_id],
    queryFn: () =>
      axios.get(`${process.env.API_URL}/movie/${params.movie_id}`, {
        params: {
          api_key: process.env.API_KEY,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
      }),

    enabled: Boolean(process.env.ACCESS_TOKEN),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  React.useEffect(() => {
    getMovie.refetch();
  }, [params.movie_id]);
  return (
    <div>
      {getMovie.isLoading && (
        <LinearProgress
          sx={{
            width: "100%",
            "& > * + *": {
              marginTop: "20px",
            },
          }}
        />
      )}
      {getMovie.isError && "Error"}
      {getMovie.isSuccess && (
        <Stack
          sx={{
            width: "50%",
            height: "100%",
            margin: "auto",

            justifyContent: "center",
            padding: "20px",
          }}
        >
          <Button
            sx={{
              backgroundColor: "black",
              color: "white",
              width: "fit-content",
              px: "20px",
              "&:hover": {
                backgroundColor: "black",
                color: "white",
              },
            }}
            onClick={() => router.push("/")}
          >
            Go Back
          </Button>
          <Typography
            sx={{
              color: "black",
              fontSize: "1.5rem",
              fontWeight: "bold",
              textAlign: "center",
              margin: "20px",
            }}
          >
            {getMovie.data?.data?.title}
          </Typography>
          <img
            src={`https://image.tmdb.org/t/p/w500${getMovie.data?.data?.poster_path}`}
            alt={getMovie.data?.data?.title}
            style={{ width: "100%", height: "500px", objectFit: "contain" }}
          />
          <p>{getMovie.data?.data?.overview}</p>
          <Box>
            <h2>Genres</h2>
            <Stack>
              {getMovie.data?.data?.genres.map((genre: any) => (
                <span key={genre.id}>{genre.name}</span>
              ))}
            </Stack>
            <h2>Runtime</h2>
            <p>{getMovie.data?.data?.runtime} minutes</p>
          </Box>
        </Stack>
      )}
    </div>
  );
};

export default MovieDetail;

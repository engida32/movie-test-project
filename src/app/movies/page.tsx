"use client";
import {
  Box,
  Grid,
  LinearProgress,
  Pagination,
  PaginationItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
export const paginationItemStyle = {
  width: "40px",
  height: "40px",
  color: "#828282",
  fontFamily: "Ubuntu",
  borderRadius: "4px",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 700,
  lineHeight: "19.6px",

  "&.Mui-selected": {
    color: "#FFFFFF",
    backgroundColor: "#DB1F72",
    border: "none",
  },
  "&:not(.Mui-selected):not(.MuiPaginationItem-icon)": {
    border: "1px solid #828282",
  },
};

const MovieListPage = () => {
  const [movies, setMovies] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [page, setPage] = React.useState(1);

  const getMovies = useQuery({
    queryKey: ["movies"],
    queryFn: () =>
      axios.get(`${process.env.API_URL}/search/movie?page=${page}`, {
        params: {
          api_key: process.env.API_KEY,
          query: search.length > 0 ? search : "popular",
          page: page,
          limit: 10,
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
    getMovies.refetch();
    getMovies.isLoading && setLoading(true);
    getMovies.isFetched && setMovies(getMovies.data?.data?.results);
    getMovies.isError && setError(true);
  }, [search, page]);
  const router = useRouter();
  return (
    <Stack
      sx={{
        width: "98vw",
        justifyContent: "center",
        padding: "20px",
        height: "100%",
        overflowY: "auto",
      }}
    >
      <TextField
        variant="filled"
        placeholder="Search Movies"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          width: "100%",
          maxWidth: "500px",
          my: "20px",
          mx: "auto",
        }}
        //add clear button
        InputProps={{
          endAdornment: search.length > 0 && (
            <Box
              sx={{
                cursor: "pointer",
                "&:hover": {
                  color: "grey.700",
                },
              }}
              onClick={() => setSearch("")}
            >
              x
            </Box>
          ),
        }}
      />

      {loading && (
        <Box sx={{ width: "100%", py: 2, my: 2 }}>
          <LinearProgress color="secondary" sx={{ width: "100%" }} />
        </Box>
      )}
      {(error || getMovies.data?.data?.results?.length === 0) && (
        <Typography
          sx={{
            color: "red",
          }}
        >
          movie not found
        </Typography>
      )}

      <Grid container spacing={2}>
        {getMovies.data?.data.results?.map((movie: any) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={movie.id}
            onClick={() => {
              router.push(`/movies/${movie.id}`);
            }}
            sx={{
              maxWidth: "500px",
              cursor: "pointer",
              // height: "500px",
            }}
          >
            <Stack
              spacing={2}
              sx={{
                boxShadow: 1,
                borderRadius: "12px",
                border: "1px solid #e0e0e0",

                p: 2,
                "&:hover": {
                  boxShadow: 2,
                  borderColor: "grey.700",
                  transform: "scale(1.05)",
                },
              }}
            >
              <img
                src={
                  `https://image.tmdb.org/t/p/w500${movie.poster_path}` ??
                  "https://via.placeholder.com/500"
                }
                alt={movie.title}
                style={{ width: "100%" }}
              />
              <h3>{movie.title}</h3>
            </Stack>
          </Grid>
        ))}
      </Grid>
      <Stack
        direction="row"
        justifyContent="center"
        display={movies?.length === 0 ? "none" : "flex"}
        py={5}
        spacing={2}
        sx={{
          //align to the end of the page
          alignItems: "center",
          mr: 6,
          maxWidth: "92%",
        }}
      >
        <Pagination
          count={getMovies.data?.data?.total_pages}
          page={page}
          onChange={(e, page) => setPage(page)}
          sx={{
            display: "flex",
            borderRadius: "4px",

            justifyContent: "center",
            "& .MuiPaginationItem-root": {
              border: "1px solid #828282",
            },
          }}
          renderItem={(item: any) => (
            <PaginationItem
              page={page}
              {...item}
              sx={{
                ...paginationItemStyle,
              }}
            />
          )}
        />
      </Stack>
    </Stack>
  );
};

export default MovieListPage;

import { Box, Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
interface MovieCardProps {
  movie: any;
}
const MovieCard = ({ movie }: MovieCardProps) => {
  const [wishlist, setWishlist] = React.useState([]);

  const addToWishlist = (movie: any) => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    if (wishlist.includes(movie.id)) {
      wishlist = wishlist.filter((id: number) => id !== movie.id);
    } else {
      wishlist.push(movie.id);
    }
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    setWishlist(wishlist);
  };

  const router = useRouter();
  React.useEffect(() => {
    setWishlist(JSON.parse(localStorage.getItem("wishlist") || "[]"));
  }, []);

  return (
    <Stack>
      <Stack
        spacing={2}
        sx={{
          boxShadow: 1,
          // borderRadius: "12px",
          border: "1px solid #e0e0e0",
          cursor: "pointer",
          height: "200px",
          width: "100%",
          backgroundImage:
            // movie.poster_path &&
            // ?
            `url(https://image.tmdb.org/t/p/w500${movie.poster_path}) `,
          // : "url(https://via.placeholder.com/400)",

          p: 2,
          "&:hover": {
            boxShadow: 2,
            borderColor: "grey.700",
            transform: "scale(1.05)",
          },
          //write image not found if poster_path is null
          // content: !movie.poster_path && `"Image not found"`,
          // backgroundSize: "cover",
          // backgroundPosition: "center",
        }}
        onClick={() => {
          router.push(`/movies/${movie.id}`);
        }}
      >
        {movie.poster_path ? null : (
          <Typography
            sx={{
              color: "red",
              fontSize: "1.5rem",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Image not found
          </Typography>
        )}
        {/* <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/400"
        }
        alt={movie.title}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "12px",
        }}
      /> */}
      </Stack>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          alignContent: "flex-end",

          width: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: "1.5rem",
            fontWeight: "bold",
            textShadow: "1px 1px 2px black",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {movie.title}
        </Typography>
        <Button
          variant="text"
          onClick={() => {
            addToWishlist(movie);
          }}
          sx={{
            // backgroundColor: wishlist.includes(movie.id) ? "red" : "green",
            background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
            color: "white",
            fontSize: "0.8rem",
            textTransform: "capitalize",
            width: "fit-content",

            "&:hover": {
              backgroundColor: "red",
            },
          }}
        >
          {localStorage.getItem("wishlist")?.includes(movie.id)
            ? "Remove from Watchlist"
            : "Add to Watchlist"}
        </Button>
      </Box>
    </Stack>
  );
};

export default MovieCard;

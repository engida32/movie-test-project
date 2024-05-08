This is a [Next.js](https://nextjs.org/) project bootstrapped with Material UI and TypeScript. It uses [The Movie Database API](https://www.themoviedb.org/documentation/api) to fetch popular movies and display them in a grid with search functionality. and movie details page.

 with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started


First, create .env.local file in the root of the project and add the following environment variables:

```bash
NEXT_PUBLIC_API_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_API_KEY=YOUR_API_KEY
```

Then, install the dependencies:
  
  ```bash 
  yarn install
  ```
Then, run the development server:

```bash
yarn dev
```


 

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

 
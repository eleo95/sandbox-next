import { createClient } from "contentful";
import Head from "next/head";
import RecipeCard from "../components/RecipeCard";

export const getStaticProps = async () => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY
  });

  const res = await client.getEntries({ content_type: "recipe" });
  return {
    props: {
      recipes: res.items
    },
    revalidate: 1
  };
};

const Recipes = ({ recipes }) => {
  // console.log(recipes);
  return (
    <>
      <Head>
        <title>Just Add Marmite</title>
      </Head>
      <div className="recipe-list">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.sys.id} recipe={recipe} />
        ))}
        <style jsx>{`
          .recipe-list {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 20px 60px;
          }
        `}</style>
      </div>
    </>
  );
};

export default Recipes;

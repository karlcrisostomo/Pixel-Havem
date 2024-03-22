import { fetchDataFromPexels } from "@/api/requestManager";
import { curatedPhotos } from "@/constant";
import { MediaResponseHandler } from "@/components";


const Home = ({ data, initialData }) => {
  const wrapCuratedPhotos = (_, items) => {
    return curatedPhotos(items);
  };

  return (
    <MediaResponseHandler
      data={data}
      initialData={initialData}
      propURL={wrapCuratedPhotos}
      mediaType={"photos"}
    />
  );
};

export const getServerSideProps = async () => {
  const initialData = 20;

  const apiUrl = curatedPhotos(initialData);
  try {
    const data = await fetchDataFromPexels(apiUrl);

    return {
      props: {
        data,
        initialData,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      props: {
        data: [],
      },
    };
  }
};

export default Home;

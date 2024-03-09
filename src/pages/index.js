import { fetchDataFromPexels } from "@/api/requestManager";
import { curatedPhotos } from "@/constant";
import { Loader, MediaResponseHandler } from "@/components";

const Home = ({ data, initialData }) => {
  const wrapCuratedPhotos = (_, items) => {
    return curatedPhotos(items);
  };

  if (!data) {
    return <Loader />;
  }

  return (
    <section>
      <MediaResponseHandler
        data={data}
        initialData={initialData}
        propURL={wrapCuratedPhotos}
        mediaType={"photos"}
      />
    </section>
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

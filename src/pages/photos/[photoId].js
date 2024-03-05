import { fetchDataFromPexels } from "@/api/requestManager";
import { photoResources } from "@/constant";
import { MediaResponseHandler, NoResultComponent } from "@/components";

const Page = ({ data, initialData, photoId }) => {
  const mediaType = "photos";
  return data.length > 0 ? (
    <MediaResponseHandler
      data={data}
      initialData={initialData}
      itemId={photoId}
      propURL={photoResources}
      mediaType={mediaType}
    />
  ) : (
    <NoResultComponent />
  );
};

export const getServerSideProps = async ({ params }) => {
  const initialData = 20;
  const photoId = params.photoId;

  const apiUrl = photoResources(photoId, initialData);

  try {
    const data = await fetchDataFromPexels(apiUrl, "photos");

    return {
      props: {
        data,
        initialData,
        photoId,
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

export default Page;

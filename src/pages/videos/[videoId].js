import { fetchDataFromPexels } from "@/api/requestManager";
import { videoResources } from "@/constant";
import { MediaResponseHandler } from "@/components";

const Page = ({ data, initialData, videoId }) => {
  const mediaType = "videos";
  return (
    <MediaResponseHandler
      data={data}
      initialData={initialData}
      propURL={videoResources}
      itemId={videoId}
      mediaType={mediaType}
    />
  );
};

export const getServerSideProps = async ({ params }) => {
  const initialData = 20;
  const videoId = params.videoId;

  const apiUrl = videoResources(videoId, initialData);

  try {
    const data = await fetchDataFromPexels(apiUrl, "videos");

    return {
      props: {
        data,
        initialData,
        videoId,
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

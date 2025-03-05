import { Helmet } from "react-helmet-async";
import { useVideos } from "../features/Media/useVideos";
import ImageGallery from "../ui/ImageGallery";
import PageTitle from "../ui/PageTitle";
import Spinner from "../ui/Spinner";

function Videos() {
  const { videos, isLoading } = useVideos();

  if (isLoading) return <Spinner />;
  return (
    <>
      <Helmet>
        <title>Climbing Videos</title>
      </Helmet>
      <PageTitle title="Videos" />
      <ImageGallery medias={videos} mediaType="video" />
    </>
  );
}

export default Videos;

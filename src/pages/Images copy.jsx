import ImageGallery from "../ui/ImageGallery";
import { useImages } from "../features/Database/useImages";
import PageTitle from "../ui/PageTitle";
import Spinner from "../ui/Spinner";
import { Helmet } from "react-helmet-async";

function Images() {
  const { isLoading, data: images } = useImages();
  if (isLoading) return <Spinner />;
  return (
    <>
      <Helmet>
        <title>Climbing Images</title>
      </Helmet>
      <PageTitle title="Image Gallery" />
      <ImageGallery medias={images} />
    </>
  );
}

export default Images;

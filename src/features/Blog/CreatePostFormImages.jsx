import FormRow from "../../ui/FormRow";
import { useImages } from "../Database/useImages";
import Spinner from "../../ui/Spinner";

function CreatePostFormImages({ setImages, addImagesFrom, setAddImagesFrom }) {
  const { data: images, isLoading } = useImages();

  function getImage(e) {
    const imageFile = e.target.files;
    setImages(imageFile);
  }

  if (isLoading) return <Spinner />;

  return (
    <>
      <label htmlFor="add-images">Add Images</label>
      <select
        defaultValue={addImagesFrom}
        name="add-images"
        onChange={(e) => setAddImagesFrom(e.target.value)}
        id="add-images"
      >
        <option disabled={true} value="">
          Choose
        </option>
        <option value="db">From DB</option>
        <option value="device">From Device</option>
      </select>

      {addImagesFrom === "device" && (
        <FormRow>
          <input
            onChange={getImage}
            type="file"
            multiple
            style={{ marginLeft: "2rem" }}
          />
        </FormRow>
      )}
      {addImagesFrom === "db" && (
        <div>
          <select name="" id="" multiple>
            {images?.map((image) => (
              <option
                // onClick={() => setSelected((prev) => [...prev, image])}
                onClick={() => setImages((prev) => [...prev, image])}
                key={image.id}
                value={image.name}
              >
                {image.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  );
}

export default CreatePostFormImages;

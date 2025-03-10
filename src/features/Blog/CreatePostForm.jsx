import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import { useCreatePost } from "./useCreatePost";
import ButtonGroup from "../../ui/ButtonGroup";
import { useUpdatePost } from "./useUpdatePost";
import FormTitle from "../../ui/FormTitle";
import CreatePostFormImages from "./CreatePostFormImages";
import { useState } from "react";
import Spinner from "../../ui/Spinner";

function CreatePostForm({ postToUpdate = {}, onCloseModal }) {
  const [formLoading, setFormLoading] = useState(false);
  const { isCreating, createPost } = useCreatePost();
  const { isUpdating, updatePost } = useUpdatePost();
  const [images, setImages] = useState([]);
  const [addImagesFrom, setAddImagesFrom] = useState("");

  const { id: editId, ...editValues } = postToUpdate;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors, isSubmitting } = formState;

  function onSubmit(data) {
    setFormLoading(true);
    if (isEditSession)
      updatePost(
        { id: editId, newPost: { ...data } },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
            setFormLoading(false);
          },
        }
      );
    else
      createPost(
        { data, images, addImagesFrom },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
            setFormLoading(false);
          },
        }
      );
  }

  function onError(errors) {
    console.log(errors);
  }

  const isLoading = isCreating || isUpdating || isSubmitting || formLoading;

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormTitle>{isEditSession ? "Edit Post" : "Create Post"}</FormTitle>
      <FormRow label="Title" error={errors?.title?.message}>
        <Input
          type="text"
          id="title"
          disabled={isLoading}
          {...register("title", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Content" error={errors?.content?.message}>
        <Textarea
          rows="5"
          id="content"
          disabled={isLoading}
          {...register("content", { required: "This field is required" })}
        />
      </FormRow>

      {!isEditSession && (
        <CreatePostFormImages
          setImages={setImages}
          setAddImagesFrom={setAddImagesFrom}
          addImagesFrom={addImagesFrom}
        />
      )}

      <ButtonGroup>
        <Button color="primary" disabled={isLoading}>
          {isEditSession ? "Edit Post" : "Create Post"}
        </Button>
      </ButtonGroup>
    </Form>
  );
}

export default CreatePostForm;

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

function CreatePostForm({ postToUpdate = {}, onCloseModal }) {
  const { isCreating, createPost } = useCreatePost();
  const { isUpdating, updatePost } = useUpdatePost();

  const isLoading = isCreating || isUpdating;

  const { id: editId, ...editValues } = postToUpdate;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    if (isEditSession)
      updatePost(
        { id: editId, newPost: { ...data } },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createPost(data, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      });
  }

  function onError(errors) {
    console.log(errors);
  }

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

      <ButtonGroup>
        <Button color="primary">
          {isEditSession ? "Edit Post" : "Create Post"}
        </Button>
      </ButtonGroup>
    </Form>
  );
}

export default CreatePostForm;

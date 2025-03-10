import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import ButtonGroup from "../../ui/ButtonGroup";

import FormTitle from "../../ui/FormTitle";
import { useCreateClimb } from "./useCreateClimb";
import { useUpdateClimb } from "./useUpdateClimb";
import FileInput from "../../ui/FileInput";
import styled from "styled-components";

const ImagesDiv = styled.div`
  display: flex;
  gap: 1.2rem;
  margin-left: 1.7rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  color: var(--color-nature-700);
`;

function CreateClimbForm({ climbToUpdate = {}, onCloseModal }) {
  const { isUpdating, updateClimb } = useUpdateClimb();
  const { isCreating, createClimb } = useCreateClimb();

  const isLoading = isCreating || isUpdating;

  const { id: editId, ...editValues } = climbToUpdate;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    const capitalizedData = {
      name:
        data.name.charAt(0).toUpperCase() + data.name.slice(1).toLowerCase(),
      city:
        data.city.charAt(0).toUpperCase() + data.city.slice(1).toLowerCase(),
      area:
        data.area.charAt(0).toUpperCase() + data.area.slice(1).toLowerCase(),
      subArea:
        data.subArea.charAt(0).toUpperCase() +
        data.subArea.slice(1).toLowerCase(),
      country:
        data.country.charAt(0).toUpperCase() +
        data.country.slice(1).toLowerCase(),
      grade: Number(data.grade),
    };

    if (isEditSession)
      updateClimb(
        { id: editId, newClimb: capitalizedData },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createClimb(
        { climb: capitalizedData, images: data.image, video: data.video },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormTitle>{isEditSession ? "Edit Problem" : "Create Problem"}</FormTitle>
      <FormRow label="Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isLoading}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Grade" error={errors?.grade?.message}>
        <Input
          type="number"
          id="grade"
          disabled={isLoading}
          {...register("grade", {
            required: "This field is required",
            min: { value: 0, message: "Grade must be between 0-17" },
            max: { value: 20, message: "Grade must be between 0-17" },
          })}
        />
      </FormRow>
      <FormRow label="City" error={errors.city?.message}>
        <Input
          type="text"
          id="city"
          disabled={isLoading}
          {...register("city", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Area" error={errors.area?.message}>
        <Input
          type="text"
          id="area"
          disabled={isLoading}
          {...register("area", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Sub-area" error={errors.subArea?.message}>
        <Input
          type="text"
          id="subArea"
          disabled={isLoading}
          {...register("subArea", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Country" error={errors.country?.message}>
        <Input
          type="text"
          id="country"
          disabled={isLoading}
          {...register("country", { required: "This field is required" })}
        />
      </FormRow>

      {!isEditSession && (
        <>
          <ImagesDiv>
            <p>Images</p>
            <FileInput
              id="image"
              accept="image/*"
              multiple
              disabled={isLoading}
              {...register("image")}
            />
          </ImagesDiv>
          <FormRow label="Video" error={errors?.name?.message}>
            <Input
              type="text"
              id="video"
              disabled={isLoading}
              {...register("video")}
            />
          </FormRow>
        </>
      )}
      <ButtonGroup>
        <Button color="primary" style={{ marginRight: "0.5rem" }}>
          {isEditSession ? "Edit Problem" : "Create Problem"}
        </Button>
      </ButtonGroup>
    </Form>
  );
}

export default CreateClimbForm;

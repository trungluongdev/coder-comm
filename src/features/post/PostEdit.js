import * as React from "react";
import {
  Box,
  Card,
  alpha,
  Stack,
  Dialog,
  DialogTitle,
  Typography,
  Button,
} from "@mui/material";

import { FormProvider, FTextField, FUploadImage } from "../../components/form";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { editPost } from "./postSlice";
import { LoadingButton } from "@mui/lab";

const yupSchema = Yup.object().shape({
  content: Yup.string(),
});

function PostEdit({ open, setIdPost, id, content, image }) {
  const defaultValues = {
    newContent: content,
    newImage: image ? image : null,
  };
  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const content = data.newContent;
    const image = data.newImage;
    const postId = id;
    dispatch(editPost({ postId, content, image })).then(() => reset());
    handleClose();
  };
  const handleClose = () => {
    setIdPost("");
  };
  const handleDrop = React.useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "newImage",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );
  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      {" "}
      <DialogTitle>Editing Post</DialogTitle>
      <Card sx={{ p: 3 }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Typography>Content of the post:</Typography>
            <FTextField
              name="newContent"
              multiline
              fullWidth
              rows={4}
              placeholder={content}
              sx={{
                "& fieldset": {
                  borderWidth: `1px !important`,
                  borderColor: alpha("#919EAB", 0.32),
                },
              }}
            />
            {image ? (
              <>
                <Typography>Editing your image:</Typography>
                <FUploadImage
                  name="newImage"
                  accept="image/*"
                  maxSize={3145728}
                  onDrop={handleDrop}
                />
              </>
            ) : (
              <>
                <Typography>Add an image for your post</Typography>
                <FUploadImage
                  name="newImage"
                  accept="image/*"
                  maxSize={3145728}
                  onDrop={handleDrop}
                />
              </>
            )}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Button onClick={handleClose}>Cancel</Button>
              <LoadingButton
                type="submit"
                variant="contained"
                size="small"
                loading={isSubmitting}
              >
                Update
              </LoadingButton>
            </Box>
          </Stack>
        </FormProvider>
      </Card>
    </Dialog>
  );
}

export default PostEdit;

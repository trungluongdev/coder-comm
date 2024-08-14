import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import { deleteComment } from "./commentSlice";
import { useDispatch } from "react-redux";

function CommentDeleteConfirm({ open, setCommentId, commentId, postId }) {
  const handleClose = () => {
    setCommentId("");
  };
  const dispatch = useDispatch();

  const handleDeleteComment = () => {
    dispatch(deleteComment(commentId, postId));
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this comment?"}
        </DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              handleDeleteComment();
              handleClose();
            }}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CommentDeleteConfirm;

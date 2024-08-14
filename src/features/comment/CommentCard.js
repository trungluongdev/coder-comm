import React, { useState } from "react";
import {
  Avatar,
  Box,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { fDate } from "../../utils/formatTime";
import CommentReaction from "./CommentReaction";
import DeleteIcon from "@mui/icons-material/Delete";
import CommentDeleteConfirm from "./CommentDeleteConfirm";
import useAuth from "../../hooks/useAuth";

function CommentCard({ comment, postId }) {
  const [commentId, setCommentId] = useState("");
  const { user } = useAuth();
  return (
    <>
      <Stack direction="row" spacing={2}>
        <Avatar alt={comment.author?.name} src={comment.author?.avatarUrl} />
        <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: "background.neutral" }}>
          <Stack
            direction="row"
            alignItems={{ sm: "center" }}
            justifyContent="space-between"
            sx={{ mb: 0.5 }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              {comment.author?.name}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.disabled" }}>
              {fDate(comment.createdAt)}
            </Typography>
          </Stack>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {comment.content}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            {comment.author._id === user._id && (
              <IconButton
                onClick={() => {
                  setCommentId(comment._id);
                  console.log(commentId);
                }}
              >
                <DeleteIcon sx={{ color: "grey" }} />
              </IconButton>
            )}
            <CommentReaction comment={comment} />
          </Box>
        </Paper>
      </Stack>
      {!!commentId && (
        <CommentDeleteConfirm
          open={!!commentId}
          setCommentId={setCommentId}
          commentId={commentId}
          postId={postId}
        />
      )}
    </>
  );
}

export default CommentCard;

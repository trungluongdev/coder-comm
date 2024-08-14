import React from "react";
import {
  Box,
  Link,
  Card,
  Stack,
  Avatar,
  Typography,
  CardHeader,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { fDate } from "../../utils/formatTime";

import PostReaction from "./PostReaction";
import CommentForm from "../comment/CommentForm";
import CommentList from "../comment/CommentList";
import PostMenu from "./PostMenu";
import useAuth from "../../hooks/useAuth";

function PostCard({ post }) {
  // const [open, setOpen] = React.useState(false);

  // const handlePostMenuOpen = () => {
  //   console.log("click");
  //   setOpen(true);
  // };
  const { user } = useAuth();
  return (
    <Card>
      <CardHeader
        disableTypography
        avatar={
          <Avatar
            src={post?.author?.avatarUrl || user.avatarUrl}
            alt={post?.author?.name || user.name}
          />
        }
        title={
          <Link
            variant="subtitle2"
            color="text.primary"
            component={RouterLink}
            sx={{ fontWeight: 600 }}
            to={`/user/${post.author._id}`}
          >
            {post?.author?.name || user.name}
          </Link>
        }
        subheader={
          <Typography
            variant="caption"
            sx={{ display: "block", color: "text.secondary" }}
          >
            {fDate(post.createdAt)}
          </Typography>
        }
        action={
          (user._id === post.author._id || user._id === post.author) && (
            <PostMenu post={post} />
          )
        }
      />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography>{post.content}</Typography>

        {post.image && (
          <Box
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              height: 300,
              "& img": { objectFit: "cover", width: 1, height: 1 },
            }}
          >
            <img src={post.image} alt="post" />
          </Box>
        )}

        <PostReaction post={post} />
        <CommentList postId={post._id} />
        <CommentForm postId={post._id} />
      </Stack>
    </Card>
  );
}

export default PostCard;

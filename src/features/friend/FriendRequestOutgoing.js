import * as React from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import SearchInput from "../../components/SearchInput";
import { outgoingRequest } from "./friendSlice";

function FriendRequestOutgoing({ open, setOutgoingRequestOpen }) {
  const [filterName, setFilterName] = React.useState("");
  const [page, setPage] = React.useState(1);
  const { currentPageUsers, usersById, totalUsers, totalPages } = useSelector(
    (state) => state.friend
  );
  const handleSubmit = (searchQuery) => {
    setFilterName(searchQuery);
  };
  const users = currentPageUsers.map((userId) => usersById[userId]);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(outgoingRequest({ filterName, page }));
  }, [filterName, page, dispatch]);

  const handleClose = () => {
    setOutgoingRequestOpen(false);
  };
  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      {" "}
      <DialogTitle>Your Outgoing Friend Requests:</DialogTitle>
      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack direction={{ xs: "column", md: "row" }} alignItems="center">
          <SearchInput handleSubmit={handleSubmit} />

          <Box sx={{ flexGrow: 1 }} />

          <Typography
            variant="subtitle"
            sx={{ color: "text.secondary", ml: 1 }}
          >
            {totalUsers > 1
              ? `${totalUsers} friends found`
              : totalUsers === 1
              ? `${totalUsers} friend found`
              : "No friend found"}
          </Typography>

          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, page) => setPage(page)}
          />
        </Stack>
      </Stack>
      <Grid container spacing={3} my={1} p={3}>
        {users.map((user) => (
          <Grid key={user._id} item sx={{ width: "100%" }}>
            <UserCard profile={user} />
          </Grid>
        ))}
      </Grid>
    </Dialog>
  );
}

export default FriendRequestOutgoing;

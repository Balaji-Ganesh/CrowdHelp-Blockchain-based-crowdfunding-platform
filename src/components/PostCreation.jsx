import React from "react";

function PostCreation() {
  return (
    <>
      <Tooltip
        title="Add"
        arrow
        position="fixed"
        sx={{
          bottom: 20,
          left: {
            xs: "calc(50% -25px)",
            md: 30,
          },
        }}
      >
        <Fab color="primary" aria-label="add" sx={{ bottom: 50, left: 5 }}>
          <AddIcon />
        </Fab>
      </Tooltip>
    </>
  );
}

export default PostCreation;

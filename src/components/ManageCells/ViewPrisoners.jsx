import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue, orange, grey } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material";

const prisoners = ["Joey Diaz", "Nancy Crane"];

function SimpleDialog({ onClose, selectedValue, open, cellNumber }) {
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#F37D3D",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Prisoners in cell #{cellNumber}</DialogTitle>
        <List sx={{ pt: 0 }}>
          {prisoners.map((email) => (
            <ListItem disableGutters key={email}>
              <ListItemButton onClick={() => handleListItemClick(email)}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: grey[900], color: orange[600] }}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={email} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Dialog>
    </ThemeProvider>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
  cellNumber: PropTypes.number.isRequired,
};

export default function SimpleDialogDemo({ cellNumber }) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(prisoners[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#F37D3D",
      },
    },
  });

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Button variant='outlined' onClick={handleClickOpen}>
          View Prisoners
        </Button>
        <SimpleDialog
          selectedValue={selectedValue}
          open={open}
          onClose={handleClose}
          cellNumber={cellNumber}
        />
      </ThemeProvider>
    </div>
  );
}

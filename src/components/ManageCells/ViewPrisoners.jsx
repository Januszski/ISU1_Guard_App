import * as React from "react";
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
import { orange, grey } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material";
import { useAtom } from "jotai";
import { headerButtonAtom, currentPrisonerIdAtom } from "../../atom";
import { getCellNameFromCellIdDb } from "repo/cellsRepo";
import { getPrisonersFromCellIdDb } from "repo/prisonerRepo";

function SimpleDialog({ onClose, selectedValue, open, cellNumber, prisoners }) {
  const [buttonSelected, setButtonSelected] = useAtom(headerButtonAtom);
  const [prisonerIdSelected, setPrisonerIdSelected] = useAtom(
    currentPrisonerIdAtom
  );
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    setButtonSelected("prisoners");
    setPrisonerIdSelected(value);

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
        <DialogTitle>Prisoners in cell {cellNumber}</DialogTitle>
        <List sx={{ pt: 0 }}>
          {prisoners.map((prisoner) => (
            <ListItem disableGutters key={prisoner.id}>
              <ListItemButton onClick={() => handleListItemClick(prisoner.id)}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: grey[900], color: orange[600] }}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={prisoner.firstname} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Dialog>
    </ThemeProvider>
  );
}

export default function SimpleDialogDemo({ cellId }) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState();
  const [prisoners, setPrisoners] = React.useState([]);
  const [currentCell, setCurrentCell] = React.useState("");

  const handleClickOpen = async () => {
    const prisoners = await getPrisonersFromCellIdDb(cellId);
    const cell = await getCellNameFromCellIdDb(cellId);
    setCurrentCell(cell);
    setPrisoners(prisoners);
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
          //@ts-ignore
          cellNumber={currentCell[0]?.cell_number}
          prisoners={prisoners}
        />
      </ThemeProvider>
    </div>
  );
}

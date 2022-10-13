import React, { useState } from "react";
import {
  Button,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import ClearIcon from "@mui/icons-material/Clear";
import AddBoxIcon from "@material-ui/icons/AddBox";
import DoneIcon from "@material-ui/icons/Done";
import Alert from "@mui/material/Alert";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField } from "@mui/material";

function App() {
  // Defining a state named rows
  // which we can update by calling on setRows function
  const [rows, setRows] = useState([]);

  // Initial states
  const [open, setOpen] = useState(false);
  const [isAdd, setAdd] = useState(false);
  const [disable, setDisable] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);

  // Function For closing the alert snackbar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // Function For adding new row object
  const handleAdd = () => {
    setRows([
      ...rows,
      {
        id: rows.length + 1,
        amount: "",
      },
    ]);
    setAdd(true);
  };

  // Function to handle save
  const handleSave = () => {
    setAdd(!isAdd);
    setRows(rows);
    setDisable(true);
    setOpen(true);
    console.log(rows);
  };

  // The handleInputChange handler can be set up to handle
  // many different inputs in the form, listen for changes
  // to input elements and record their values in state
  const handleInputChange = (e, index) => {
    setDisable(false);
    const { name, value } = e.target;
    const list = [...rows];
    list[index][name] = value;
    setRows(list);
  };

  // Showing delete confirmation to users
  const handleConfirm = () => {
    setShowConfirm(true);
  };

  // Handle the case of delete confirmation where
  // user click yes delete a specific row of rowId
  const handleRemoveClick = (rowId) => {
    // const lists = rows.filter((row) => row.id !== rowId); //only remove the selected row
    // setRows(lists);
    // console.log(lists);
    // setShowConfirm(false);
    let list = rows.filter((row) => row.id !== rowId); //only remove the selected row
    list = list.map((row, index) => ({
      ...row,
      id: index, //assign the new index for id
    }));
    setRows(list);
    console.log(list);
    setShowConfirm(false);
  };

  // Handle the case of delete confirmation
  // where user click no
  const handleNo = () => {
    setShowConfirm(false);
  };

  const handleClearAll = () => {
    setAdd(false);
    setRows([]); //clear all rows
  };

  return (
    <div style={{ width: 600, margin: "auto" }}>
      <Button onClick={handleAdd}>
        <AddBoxIcon />
        INSERT NEW ROW
      </Button>
      <Button onClick={handleClearAll}>
        <ClearIcon /> CLEAR ROW
      </Button>

      {disable ? (
        <Button disabled align="right" onClick={handleSave}>
          <DoneIcon />
          SUBMIT
        </Button>
      ) : (
        <Button align="right" onClick={handleSave}>
          <DoneIcon />
          SUBMIT
        </Button>
      )}

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Item name </TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows?.map((row, i) => {
            return (
              <TableRow key={i}>
                {isAdd ? (
                  <TableCell>{`Item ${row.id}`}</TableCell>
                ) : (
                  <TableCell>{`Item ${row.id}`}</TableCell>
                )}
                {isAdd ? (
                  <TableCell align="left">
                    <TextField
                      sx={{
                        width: 100,
                      }}
                      type="number"
                      value={row.amount}
                      name="amount"
                      onChange={(e) => handleInputChange(e, i)}
                    />
                  </TableCell>
                ) : (
                  <TableCell>{row.amount}</TableCell>
                )}

                {isAdd ? (
                  <TableCell>
                    <Button className="mr10" onClick={handleConfirm}>
                      <ClearIcon />
                    </Button>
                  </TableCell>
                ) : (
                  <TableCell>
                    <Button className="mr10" onClick={handleConfirm}>
                      <DeleteOutlineIcon />
                    </Button>
                  </TableCell>
                )}
                {showConfirm && (
                  <div>
                    <Dialog open={showConfirm} onClose={handleNo}>
                      <DialogTitle id="alert-dialog-title">
                        {"Confirm Delete"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Are you sure to delete
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={() => handleRemoveClick(i)}
                          color="primary"
                          autoFocus
                        >
                          Yes
                        </Button>
                        <Button onClick={handleNo} color="primary" autoFocus>
                          No
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                )}
              </TableRow>
            );
          })}

          <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              Record saved successfully!
            </Alert>
          </Snackbar>
        </TableBody>
      </Table>
    </div>
  );
}

export default App;

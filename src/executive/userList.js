import React, { useEffect, useState } from 'react';
import { TableContainer, TableBody, TableCell, Table, TableHead, Paper, TextField, Button, Grid, TableRow, Dialog, DialogTitle, Checkbox, DialogContent, DialogActions } from "@mui/material";

const UserList = () => {
  const [userList, setUserList] = useState([]);
  const [loding, setLoding] = useState(false);
  const [userRole, setUserRole] = useState();
  const [userName, setUserName] = useState();
  const [userLastName, setUserLastName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userPassword, setUserPassword] = useState();
  const [branchList, setBranchList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectName, setSelectedName] = useState();
  const [selectedItem, setSelectedItem] = useState();
  const [selectedLastName, setSelectedLastName] = useState();
  const [selectedRole, setSelectedRole] = useState();
  const [selectedEmail, setSelectedEmail] = useState();
  const [selectedBranch, setSelectedBranch] = useState();
  const [selectedBranchLessons, setSelectedBranchLessons] = useState([]);
  const [roleList, setRoleList] = useState();
  const [openModalSubmit, setOpenModalSubmit] = useState(false);
  const [lessonList, setLessonList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/get-lesson",
      {
        mode: "cors",
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => res.json()).then(res => setLessonList(res))
  }, []);

  const getUserListFetch = async (params) => {
    let url = "http://localhost:5001/user-list-all";
    if (params) {
      url += "?" + params
    }
    await fetch(url, {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then(res => {
      if (!res.length) {
        alert("Data Bulunamadı!")
      } else {
        setUserList(res);
        setLoding(false)
      }
    })
  }

  useEffect(() => {
    getUserListFetch();
  }, [loding]);

  const userListData = () => {
    let data = {
      role: userRole,
      name: userName,
      lastName: userLastName,
      email: userEmail,
      password: userPassword,
      branch: selectedBranch,
      lessons: selectedBranchLessons,
    };
    fetch("http://localhost:5001/user-listSave", {
      mode: "cors",
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.ok && setLoding(true))
  };


  useEffect(() => {
    fetch("http://localhost:5001/branchList", {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then(res => {
      setBranchList(res)
      console.log(res)
    })
  }, []);

  const UserUpdate = (id) => {
    let putData = {
      role: selectedRole,
      name: selectName,
      lastName: selectedLastName,
      email: selectedEmail,
      branch: selectedBranch,
      lessons: selectedBranchLessons,
    };
    fetch("http://localhost:5001/userlistupdate/" + id, {
      model: "cors",
      method: "PUT",
      body: JSON.stringify(putData),
      headers: {
        "Content-Type": "application/json"
      }

    }).then(res => {
      console.log(res)
      if (res.status === 200) {
        setLoding(true)
      }
    })
  }
  const handlOpenModal = (item) => {
    setSelectedItem(item)
    setModalOpen(true)
  }
  const closeModal = () => {
    setModalOpen(false)
  }


  const branchName = (id) => {
    let res = ""
    if (id && branchList?.length) {
      let findbranch = branchList.find(item => item._id === id)
      if (findbranch) {
        res = findbranch.name
      }

    }
    return res
  }

  useEffect(() => {
    fetch("http://localhost:5001/roleList", {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then(res => {
      setRoleList(res)

    })
  }, []
  );

  const handleUserFilter = () => {
    let queryParams = "";
    if (selectedBranch && selectedBranch !== -1) {
      queryParams += "branchId=" + selectedBranch + "&"
    }
    if (userRole && userRole !== "-1") {
      queryParams += "role=" + userRole
    }

    console.log(queryParams)
    if (!!queryParams) {
      getUserListFetch(queryParams);
    }
  };

  console.log(selectedBranchLessons)
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {
            openModalSubmit &&
            <Dialog
              onClose={() => setOpenModalSubmit(false)}
              open={openModalSubmit}
              maxWidth={'sm'}
              fullWidth
              >
              <DialogTitle>Set backup account</DialogTitle>
              <DialogContent>
                <Grid container spacing={2}>

                  <Grid item xs={12} md={6}>
                    <TextField fullWidth onChange={(e) => setUserName(e.target.value)} 
                    id="outlined-basic" 
                    label="Name" 
                    variant="outlined"
                     margin='normal' 
                     color='success' />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth onChange={(e) => setUserLastName(e.target.value)} 
                    id="outlined-basic" 
                    label="LastName" 
                    variant="outlined" 
                    margin='normal' 
                    color='success' />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth onChange={(e) => setUserEmail(e.target.value)} 
                    id="outlined-basic" 
                    label="Email" 
                    variant="outlined"
                     margin='normal' 
                     color='success' />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth onChange={(e) => setUserPassword(e.target.value)} 
                    id="outlined-basic" 
                    label="Password" 
                    variant="outlined"
                    margin='normal' 
                    color='success' />
                  </Grid>
                  {userRole === "Teacher" ?
                    <Grid item xs={12} md={6}>
                      <TextField
                        select
                        fullWidth
                        onChange={e => setSelectedBranchLessons([].slice.call(e.target.selectedOptions).map(item => 
                        { return { value: e.target.value, name: e.target.options[e.target.selectedIndex].text } }))}
                        id="outlined-basic"
                        label="Lessons"
                        variant="outlined"
                        margin='normal'
                        color='success'
                        SelectProps={{
                          native: true,
                        }} >
                        {
                          lessonList.map((item, i) => (
                            <option key={i} value={item.value}>{item.label}</option>
                          ))
                        }
                      </TextField>
                    </Grid>
                    :
                    null
                  }
                  <Grid item xs={12} md={6}>

                    <TextField
                      select
                      fullWidth
                      onChange={(e) => setUserRole(e.target.value)}
                      id="outlined-basic"
                      label="Roles"
                      variant="outlined"
                      margin='normal'
                      color='success'
                      InputLabelProps={{
                        shrink: true,
                      }}
                      SelectProps={{
                        native: true,
                      }} >
                      {
                        roleList?.map((item, i) => (
                          <option key={i} value={item.role}>{item.role}</option>
                        ))
                      }
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      onChange={(e) => setSelectedBranch(e.target.value)}
                      id="outlined-select-currency-native"
                      select
                      fullWidth
                      label="Şube Adı"
                      margin='normal'
                      color='success'
                      InputLabelProps={{
                        shrink: true,
                      }}
                      SelectProps={{
                        native: true,
                      }}
                    >
                      {branchList?.length && branchList?.map((option, i) => (
                        <option key={i} value={option._id}>
                          {option.name}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => userListData()} size={"small"} variant="contained" color="primary">Kaydet</Button>
                <Button onClick={() => setOpenModalSubmit(false)} size={"small"} variant="contained" color="secondary">Kapat</Button>
              </DialogActions>
            </Dialog>
          }
        </Grid>
        <Grid item xs={12} md={2}>
          <Button onClick={() => setOpenModalSubmit(true)} size={"small"} variant="contained" color="primary">Yeni Kullanıcı Ekle</Button>
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            select
            onChange={(e) => setUserRole(e.target.value)}
            id="outlined-basic"
            fullWidth
            variant="outlined"
            color='primary'
            size={"small"}

            SelectProps={{
              native: true,
            }} >
            {
              roleList?.map((item, i) => (
                <option key={i} value={item.role}>{item.role}</option>
              ))
            }
          </TextField>
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            onChange={(e) => setSelectedBranch(e.target.value)}
            id="outlined-select-currency-native"
            select
            fullWidth
            color='success'
            size={"small"}
            SelectProps={{
              native: true,
            }}
          >
            {branchList?.length && branchList?.map((option, i) => (
              <option key={i} value={option._id}>
                {option.name}
              </option>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button onClick={() => handleUserFilter()} size={"small"} fullWidth variant="contained" color="primary">Filtrele</Button>
        </Grid>
        <Grid item xs={12} md={6}>
        </Grid>
        <Grid item xs={12}>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}  >
              <TableHead>
                <TableRow>
                  <TableCell >No</TableCell>
                  <TableCell >Position</TableCell>
                  <TableCell >Name</TableCell>
                  <TableCell >Lastname</TableCell>
                  <TableCell >Email</TableCell>
                  <TableCell >Lessons</TableCell>
                  <TableCell >Branch</TableCell>
                  <TableCell >Process</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  userList?.length && userList?.map((item, i) => (
                    <TableRow>
                      <TableCell >{i + 1}</TableCell>
                      <TableCell >
                        {item.role}
                      </TableCell>
                      <TableCell >{item.name}</TableCell>
                      <TableCell >{item.lastName}</TableCell>
                      <TableCell >{item.email}</TableCell>
                      <TableCell >{item.lessons?.length ? item.lessons[0].name : null}</TableCell>
                      <TableCell >{item.branch ? branchName(item.branch) : null}</TableCell>
                      <TableCell>
                        <Button variant="contained" color="secondary" onClick={() => handlOpenModal(item)}>UpDate</Button>
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      {
        modalOpen ?
          <Dialog
            onClose={closeModal}
            open={modalOpen}
            maxWidth={'sm'}
            fullWidth
          >
            <DialogTitle>Set backup account</DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    select
                    size={'small'}
                    id="outlined basic"
                    defaultValue={selectedItem?.role}
                    variant='outlined'
                    SelectProps={{
                      native: true,
                    }}
                    helperText="Please select your currency" onChange={(e) => setSelectedRole(e.target.value)}>
                    {roleList?.map((item, i) => (
                      <option key={i} value={item.role}>{item.role}</option>))}
                  </TextField>
                </Grid>
                {selectedItem?.role === "Teacher"
                  &&
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      select
                      size={'small'}
                      id="outlined basic"
                      defaultValue={selectedItem?.lessons}
                      variant='outlined'
                      SelectProps={{
                        native: true,
                      }}
                      helperText="Please select your currency" 
                      onChange={(e) => setSelectedBranchLessons({ value: e.target.value, name: e.target.options[e.target.selectedIndex].text })}>
                      {
                        lessonList.map((item, i) => (
                          <option key={i} value={item.value}>{item.label}</option>
                        ))
                      }
                    </TextField>
                  </Grid>
                }
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size={'small'}
                    id="outlined basic"
                    defaultValue={selectedItem?.name}
                    variant='outlined'
                    SelectProps={{
                      native: true,
                    }}
                    helperText="Please select your currency" onChange={(e) => setSelectedName(e.target.value)}>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size={'small'}
                    id="outlined basic"
                    defaultValue={selectedItem?.lastName}
                    variant='outlined'
                    SelectProps={{
                      native: true,
                    }}
                    helperText="Please select your currency" onChange={(e) => setSelectedLastName(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size={'small'}
                    id="outlined basic"
                    defaultValue={selectedItem?.email}
                    variant='outlined'
                    SelectProps={{
                      native: true,
                    }}
                    helperText="Please select your currency" onChange={(e) => setSelectedEmail(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    select
                    size={'small'}
                    label="Şube Adı"
                    defaultValue={selectedItem?.branch}
                    SelectProps={{
                      native: true,
                    }}
                    variant='outlined'
                    helperText="Please select your currency"
                  >
                    {branchList?.length && branchList?.map((option, i) => (
                      <option key={i} value={option._id}>
                        {option.name}
                      </option>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" color="secondary" onClick={() => UserUpdate(selectedItem._id)}>Save</Button>
            </DialogActions>
          </Dialog>

          : null
      }

    </>
  )
}
export default UserList;    
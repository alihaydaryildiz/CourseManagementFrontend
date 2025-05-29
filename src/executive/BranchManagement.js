import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Modal, Card } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const BranchManagements = () => {
  const [branchName, setBrachName] = useState();
  const [address, setAdress] = useState();
  const [numberOfClassrooms, setNumberOfClassrooms] = useState();
  const [loding, setLoding] = useState(false);
  const [branchList, setBranchList] = useState([]);
  const [open, setOpen] = useState(false)
  const [classroom, setClassRoom] = useState();
  const [classroomBranch, setClassRoomBranch] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [branchId, setBranchId] = useState(null);
  const navigate = useNavigate();

  const brachDataSubmit = () => {
    let data = {
      name: branchName,
      address: address,
      classroomCount: numberOfClassrooms,
      classroom: classroom,
      classroomBranch: classroomBranch
    };
    console.log(data)
    fetch("http://localhost:5001/branchSave", {
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
      method: "GET",
      mode: "cors",
      headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json()).then(res => setBranchList(res))
  }, [loding]);

  const handleOpen = (id) => {
    setBranchId(id);
    setOpen(true)
  };
  const handleClose = () => setOpen(false);

  const userListData = () => {
    let data = {
      classroom: classroom,
      classroomBranch: classroomBranch,
      branch: branchId,
    };

    fetch("http://localhost:5001/classroomDepartman", {
      mode: "cors",
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.ok && setLoding(true))
  };


  const serverUpload = (fileBuf, ext, id) => {
    fetch("http://localhost:5001/fileUpload", {
      mode: "cors",
      method: "POST",
      body: JSON.stringify({ data: fileBuf, ext: ext , id: id}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(data => uploadsSave(data, id))

  };

  const handleFileUploader = (file, id) => {
    setBranchId(id)
    let url = URL.createObjectURL(file[0])
    setSelectedFile(url)
    let fileExt = file[0].type.split("/")[1];
    if (file[0]) {
      const reader = new FileReader();
      reader.onload = async () => {
        serverUpload(reader.result, fileExt, id)
      };
      reader.readAsDataURL(file[0]);
    }
  };
 const uploadsSave=(data, id)=>{
  fetch("http://localhost:5001/branchUploads/" +id, {
    mode: "cors",
    method: "PUT",
    body: JSON.stringify({path:data.url}),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json()).then(data => console.log(data))
 }  



  return (
    <Grid container spacing={2} >
      <Grid item xs={12}>
        <h3>Yeni Şube Kaydet</h3>
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField onChange={(e) => setBrachName(e.target.value)} id="outlined-basic" label="Şube Adı" variant="outlined" color='success' size='small' />
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField onChange={(e) => setAdress(e.target.value)} id="outlined-basic" label="Adresi" variant="outlined" color='success' size='small' />
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField onChange={(e) => setNumberOfClassrooms(e.target.value)} id="outlined-basic" label="Derslik Sayısı" variant="outlined" color='success' size='small' />
      </Grid>
      <Grid item xs={12} md={3}>
        <Button onClick={() => brachDataSubmit()} color={"secondary"} variant="contained" size='small'>Kaydet</Button>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper} >
          <Table sx={{ minWidth: 650, marginTop: 10 }} >
            <TableHead>
              <TableRow>
                <TableCell >Sınıf/Şube Ekle</TableCell>
                <TableCell >Şube Adı</TableCell>
                <TableCell >Adresi</TableCell>
                <TableCell >Derslik Sayısı</TableCell>
                <TableCell >Detay</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {
                branchList?.length && branchList.map((branch, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Button onClick={() => handleOpen(branch._id)} variant="contained" margin="normal">Sınıf/Şube Ekle</Button>
                    </TableCell>
                    <TableCell >{branch.name}</TableCell>
                    <TableCell >{branch.address}</TableCell>
                    <TableCell >{branch.classroomCount}</TableCell>
                    <TableCell>
                      <Button onClick={() => navigate("/admin/branch-details/" + branch._id)} endIcon={<SendIcon />}
                        variant="contained" color="success" size="small">
                        Detaya Git
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button variant='contained' component="label" color='primary' size='small' >
                        Dosya Seç
                        <input type='file' hidden onChange={(e) => handleFileUploader(e.target.files, branch._id )} />
                      </Button>
                      {selectedFile && branch._id===branchId ? 
                        <img src={selectedFile} style={{ width: "100px" }} />
                        :
                        null}
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      {
        open &&
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >

          <Box sx={style}>
            <Grid container spacing={2}>

              <Grid item xs={12}>
                <TextField
                  onChange={(e) => setClassRoom(e.target.value)}
                  id="outlined-select-currency-native"

                  label="Sınıfı"
                  margin='normal'
                  color='success'
                  SelectProps={{
                    native: true,
                  }}
                  helperText="Please select your currency"
                >

                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={(e) => setClassRoomBranch(e.target.value)}
                  id="outlined-select-currency-native"

                  label="Sınıf Kodu"
                  margin='normal'
                  color='success'
                  SelectProps={{
                    native: true,
                  }}
                  helperText="Please select your currency"
                >

                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Button onClick={() => userListData()} size={"small"} variant="contained" color="primary">Kaydet</Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      }
    </Grid >


  );
}
export default BranchManagements;
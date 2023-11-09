import React, { useState } from 'react';
import Menu from './Menu';
import PostList from './PostList';
import { Fab, Grid, Modal } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import useStyle from '../css/styleAdd';
import Home1 from './Home1';
import FormNews from './FormNews';


export default function News() {
  const classes = useStyle();
  const [showModal, setShowModal] = useState(false);


  const role = localStorage.getItem('role');
  const isAdmin = role === 'admin';



  const handleAddButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };





  return (
    <div>
      <Menu />
      <Home1 />
      <PostList />
      {isAdmin && (
        <Fab color='primary' className={classes.fab} onClick={handleAddButtonClick}>
          <AddIcon />
        </Fab>
      )}

      <Modal open={showModal} onClose={handleCloseModal}>
        <Grid container className={classes.modalContainer}>
          <Grid item xs={12} className={classes.modalContent}>
            <FormNews />
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
}
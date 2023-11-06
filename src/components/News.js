import React from 'react';
import Menu from './Menu';
import PostList from './PostList';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import useStyle from '../css/styleAdd';
import Home1 from './Home1';

export default function News() {
  const classes = useStyle();

  const handleAddButtonClick = () => {
    // Xử lý khi người dùng nhấp vào nút AddIcon
    // Hiển thị modal và thực hiện chức năng thêm bài đăng
  };

  const role = localStorage.getItem('role');
  const isAdmin = role === 'admin';

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
    </div>
  );
}
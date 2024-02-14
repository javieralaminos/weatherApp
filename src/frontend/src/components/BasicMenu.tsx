import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Dispatch, SetStateAction, useState } from 'react';

export interface BasicMenuProps {
  title: string;
  items: string[];
  setResponse: Dispatch<SetStateAction<string | null>>;
}

export default function BasicMenu(props: BasicMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [title, setTitle] = useState<string>(props.title);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSelect = (item: string) => {
    setTitle(item);
    props.setResponse(item);
    handleClose();
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {title}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {props.items.map((item, index) => (
          <MenuItem key={index} onClick={
            () => handleSelect(item)
          }>{item}</MenuItem>
        ))}
      </Menu>
    </div>
  );
}
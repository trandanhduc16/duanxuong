import { List, ListItem, ListItemIcon, ListItemText, Drawer, Toolbar } from "@mui/material";
import { Dashboard, AddCircleOutline, Home } from "@mui/icons-material";
import { Link } from "react-router-dom";

type SidebarProps = {
  onAddProduct: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ onAddProduct }) => {

  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: '#f5f5f5', // Light background color for the sidebar
          color: 'black', // Text color
          borderRight: '1px solid #ddd', // Optional: border color for separation
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <List>
        <ListItem button component={Link} to="/" sx={{ "&:hover": { backgroundColor: '#e0e0e0' } }}>
          <ListItemIcon sx={{ color: 'black' }}>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" primaryTypographyProps={{ style: { color: 'black' } }} />
        </ListItem>
        <ListItem button component={Link} to="/admin/product/list" sx={{ "&:hover": { backgroundColor: '#e0e0e0' } }}>
          <ListItemIcon sx={{ color: 'black' }}>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" primaryTypographyProps={{ style: { color: 'black' } }} />
        </ListItem>
        <ListItem button onClick={onAddProduct} component={Link} to="/admin/product/add" sx={{ "&:hover": { backgroundColor: '#e0e0e0' } }}>
          <ListItemIcon sx={{ color: 'black' }}>
            <AddCircleOutline />
          </ListItemIcon>
          <ListItemText primary="Add Product" primaryTypographyProps={{ style: { color: 'black' } }} />
        </ListItem>
        <ListItem button onClick={onAddProduct} component={Link} to="/admin/category" sx={{ "&:hover": { backgroundColor: '#e0e0e0' } }}>
          <ListItemIcon sx={{ color: 'black' }}>
            <AddCircleOutline />
          </ListItemIcon>
          <ListItemText primary="Add Category" primaryTypographyProps={{ style: { color: 'black' } }} />
        </ListItem>      </List>
    </Drawer>
  );
};

export default Sidebar;

import { Badge, Stack, styled, Typography, useTheme, useMediaQuery } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useCart } from "src/contexts/cart";
import { useMemo } from "react";

const menus = [
  {
    label: "Home",
    link: "/",
  },
  {
    label: "Shop",
    link: "/shop",
  },
  {
    label: "About",
    link: "/about",
  },
  {
    label: "Contact",
    link: "/contact",
  },
];

const Header = () => {
  const { cart } = useCart();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const cartQuantity = useMemo(
    () =>
      cart
        ? cart.products.reduce((total, { quantity }) => total + quantity, 0)
        : 0,
    [cart]
  );

  return (
    <Wrapper
      sx={{ padding: isMobile ? "0 20px" : "0 50px" }}
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <img src="/logo.svg" alt="logo" style={{ height: 50 }} />
      <Stack direction={"row"} gap={isMobile ? "30px" : "75px"}>
        {/* menu */}
        {menus.map((menu, index) => (
          <Link to={menu.link} key={index}>
            <Typography fontWeight={"500"}>{menu.label}</Typography>
          </Link>
        ))}
      </Stack>
      <Stack gap={isMobile ? "20px" : "45px"} direction={"row"}>
        <Link to={"/login"}>
          <img src="/user.svg" alt="user" style={{ height: 24 }} />
        </Link>
        <SearchIcon />
        <FavoriteBorderIcon />
        <Link to={"/cart"}>
          <Badge badgeContent={cartQuantity} color="secondary">
            <img src="/cart.svg" alt="cart" style={{ height: 24 }} />
          </Badge>
        </Link>
      </Stack>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled(Stack)(({ theme }) => ({
  height: 100,
  padding: "0 50px",
  boxShadow: theme.shadows[3],
  [theme.breakpoints.down("sm")]: {
    height: 80,
    padding: "0 20px",
  },
}));

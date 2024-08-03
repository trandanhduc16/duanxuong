import { FC, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
  styled
} from "@mui/material";
import { Product } from "src/types/Product";
import { Link } from "react-router-dom";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useProductCart } from "src/hooks/useProductCart";

// Styled components for hover effect
const StyledCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  maxWidth: 345,
  transition: '0.3s',
  overflow: 'hidden',
  boxShadow: theme.shadows[3], // Default shadow
  '&:hover': {
    boxShadow: theme.shadows[6], // Darker shadow on hover
    '& .card-actions': {
      opacity: 1,
      visibility: 'visible',
    },
  },
}));

const CardMediaStyled = styled(CardMedia)(({ theme }) => ({
  objectFit: 'cover', // Make image cover the entire area
  height: 200, // Adjust height as needed
}));

const CardActionsWrapper = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(1),
  backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background for visibility
  opacity: 0,
  visibility: 'hidden',
  transition: '0.3s',
  borderRadius: theme.shape.borderRadius, // Rounded corners for the action area
  '& .MuiIconButton-root': {
    color: theme.palette.common.white,
    margin: theme.spacing(0.5), // Space between icons
    transition: '0.3s',
    transform: 'scale(1)',
  },
  '&:hover .MuiIconButton-root': {
    transform: 'scale(1.2)', // Increase size on hover
  }
}));

type ProductCardProps = {
  product: Product;
};


const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useProductCart();
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = () => {
    if (quantity > 0 && product) {
      addToCart({ product, quantity });
    }
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  return (
    <StyledCard>
      <Box>
        <img
          src={product.image}
          alt={product.title}
          style={{
            height: '200px',
            width: '300px',
            objectFit: 'cover',
          }}
        />
      </Box>

      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {product.title}
        </Typography>
        <Typography fontWeight={"bold"} color={"text.primary"} mt={1}>
          ${product.price}
        </Typography>
        <Typography>
          {product.category?.name || "No Category"}
        </Typography>
      </CardContent>
      <CardActionsWrapper className="card-actions">
        <IconButton>
          <ShareIcon />
        </IconButton>
        <IconButton>
          <FavoriteBorderIcon />
        </IconButton>
      </CardActionsWrapper>
      <CardActions>
        <Link to={`/product/${product._id}`}>
          <Button size="small" variant="contained" color="primary">
            Detail
          </Button>
        </Link>
        <Button
          size="small" variant="contained" color="primary"
          onClick={handleAddToCart}
        >
          Add To Cart
        </Button>
      </CardActions>
    </StyledCard>
  );
};

export default ProductCard;

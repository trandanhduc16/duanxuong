import {
  Button,
  Container,
  IconButton,
  Grid,
  Stack,
  styled,
  Typography,
  TextField,
} from "@mui/material";
import Banner from "src/components/Banner";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "src/contexts/cart";
import { useProductCart } from "src/hooks/useProductCart";
import { Link } from "react-router-dom";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useReducer } from "react";

// Define type for cart item quantity state
type CartItemQuantity = {
  [productId: string]: number;
};

// Initial state for quantities
const initialQuantityState: CartItemQuantity = {};

// Reducer function to manage quantity state
const quantityReducer = (state: CartItemQuantity, action: { type: string, productId: string, quantity?: number }) => {
  switch (action.type) {
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        [action.productId]: action.quantity ?? 1,
      };
    default:
      return state;
  }
};

const labels = ["Product", "Price", "Quantity", "Subtotal", ""];

function Cart() {
  const { cart } = useCart();
  const { removeFromCart, addToCart } = useProductCart();
  const [quantities, dispatch] = useReducer(quantityReducer, initialQuantityState);

  const calculateSubtotal = (price: number, quantity: number) => price * quantity;

  const calculateTotal = () =>
    cart?.products.reduce((total, item) =>
      total + calculateSubtotal(item.product.price, quantities[item.product._id] ?? item.quantity), 0
    ) || 0;

  const handleQuantityChange = (productId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (value > 0) {
      dispatch({ type: 'UPDATE_QUANTITY', productId, quantity: value });
      const product = cart?.products.find(item => item.product._id === productId)?.product;
      if (product) {
        addToCart({ product, quantity: value });
      }
    }
  };

  const handleDecreaseQuantity = (productId: string) => {
    const newQuantity = Math.max((quantities[productId] ?? 1) - 1, 1);
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity: newQuantity });
    const product = cart?.products.find(item => item.product._id === productId)?.product;
    if (product) {
      addToCart({ product, quantity: newQuantity });
    }
  };

  const handleIncreaseQuantity = (productId: string) => {
    const newQuantity = (quantities[productId] ?? 1) + 1;
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity: newQuantity });
    const product = cart?.products.find(item => item.product._id === productId)?.product;
    if (product) {
      addToCart({ product, quantity: newQuantity });
    }
  };

  return (
    <>
      <Banner page="Cart" />
      <Container>
        <Grid container spacing={2}>
          {/* Cart Items */}
          <Grid item xs={12} md={8}>
            <Wrapper>
              <LabelWrapper
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                flexWrap="wrap"
              >
                {labels.map((label, index) => (
                  <Typography
                    fontWeight={600}
                    key={index}
                    flex={1}
                    textAlign="center"
                    sx={{ color: '#333' }}
                  >
                    {label}
                  </Typography>
                ))}
              </LabelWrapper>
              <Stack gap={2} my={3}>
                {cart?.products.map((item) => {
                  const productId = item.product._id;
                  return (
                    <ItemWrapper
                      key={productId}
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      flexWrap="wrap"
                    >
                      <Stack direction="column" alignItems="flex-start" spacing={1}>
                        <img src={item.product.image} width="100px" alt={item.product.title} />
                        <Typography fontWeight={500}>
                          {item.product.title}
                        </Typography>
                      </Stack>
                      <Typography fontWeight={500}>{item.product.price}đ</Typography>
                      <Stack direction="row" alignItems="center">
                        <IconButton onClick={() => handleDecreaseQuantity(productId)}>
                          <RemoveIcon />
                        </IconButton>
                        <TextField
                          type="number"
                          value={quantities[productId] ?? item.quantity}
                          onChange={(event) => handleQuantityChange(productId, event)}
                          inputProps={{ min: 1 }}
                          sx={{ width: '50px', height: '50px' }}  
                        />
                        <IconButton onClick={() => handleIncreaseQuantity(productId)}>
                          <AddIcon />
                        </IconButton>
                      </Stack>
                      <Typography fontWeight={500}>{calculateSubtotal(item.product.price, quantities[productId] ?? item.quantity)}đ</Typography>
                      <IconButton onClick={() => removeFromCart(productId)} sx={{ color: "red" }}>
                        <DeleteIcon />
                      </IconButton>
                    </ItemWrapper>
                  );
                })}
              </Stack>
            </Wrapper>
          </Grid>

          {/* Cart Totals */}
          <Grid item xs={12} md={4} mt={2}>
            <CartSummary>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Cart Totals
              </Typography>
              <Stack direction="row" justifyContent="space-between" paddingY={1}>
                <Typography fontWeight={500}>Subtotal</Typography>
                <Typography fontWeight={500}>{calculateTotal()}đ</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" paddingY={1}>
                <Typography fontWeight={600}>Total</Typography>
                <Typography fontWeight={600}>{calculateTotal()}đ</Typography>
              </Stack>
              <Stack alignItems="center" paddingTop={2}>
                <Link to="/checkout" style={{ textDecoration: 'none' }}>
                  <Button variant="contained" color="primary">Check Out</Button>
                </Link>
              </Stack>
            </CartSummary>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Cart;

const Wrapper = styled(Stack)({
  padding: '16px',
});

const LabelWrapper = styled(Stack)({
  background: "#F9F1E7",
  height: 55,
  borderRadius: 4,
});

const ItemWrapper = styled(Stack)({
  padding: '8px 16px',
  borderBottom: '1px solid #ddd',
});

const CartSummary = styled(Stack)({
  padding: '16px',
  backgroundColor: '#F9F1E7',
  borderRadius: 4,
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
});

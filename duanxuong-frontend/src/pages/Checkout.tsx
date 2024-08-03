import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import Banner from "src/components/Banner";
import { useNavigate } from "react-router-dom";
import { useLoading } from "src/contexts/loading";
import axios from "axios";
import { Field, Form } from "react-final-form";
import { InputText } from "src/components/elements/InputText";
import { useCart } from "src/contexts/cart";
import { useMemo } from "react";
import { useUser } from "src/contexts/user";
import { useProductCart } from "src/hooks/useProductCart";

type CheckoutFormParams = {
  name: string;
  phone: string;
  address: string;
  payment: string;
};

function Checkout() {
  const nav = useNavigate();
  const { setLoading } = useLoading();
  const { cart } = useCart();
  const { user } = useUser();
  const { getCartUser } = useProductCart();

  const totalPrice = useMemo(
    () =>
      cart
        ? cart.products.reduce(
          (total, { product, quantity }) => total + product.price * quantity,
          0
        )
        : 0,
    [cart]
  );

  const onSubmit = async (values: CheckoutFormParams) => {
    if (!user || !cart || !cart?.products.length) return;
    try {
      setLoading(true);
      await axios.post("/orders", {
        ...values,
        products: cart.products,
        user: user._id,
        totalPrice,
      });
      await getCartUser();
      alert("Checkout thank you");
      nav("/");
    } catch (error) {
      // Handle error appropriately
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Banner page="Checkout" />
      <Container sx={{ mb: 10, mt: 5 }}>
        <Grid container spacing={8}>
          <Grid item xs={7} sx={{ mb: 4 }}> {/* Add margin-bottom to create space */}
            <Typography variant="h4">Billing details</Typography>
            <Form
              onSubmit={onSubmit}
              initialValues={{
                payment: "COD",
              }}
              render={({ values }) => {
                return (
                  <Stack gap={3}>
                    <Field
                      name="name"
                      render={({ input, meta }) => (
                        <InputText
                          input={input}
                          label={"Name"}
                          messageError={meta.touched && meta.error}
                        />
                      )}
                    />
                    <Field
                      name="phone"
                      render={({ input, meta }) => (
                        <InputText
                          input={input}
                          label={"Phone"}
                          messageError={meta.touched && meta.error}
                        />
                      )}
                    />
                    <Field
                      name="address"
                      render={({ input, meta }) => (
                        <InputText
                          input={input}
                          label={"Address"}
                          messageError={meta.touched && meta.error}
                        />
                      )}
                    />
                    <Field<string>
                      name="payment"
                      render={({ input }) => {
                        return (
                          <FormControl>
                            <FormLabel>Payment</FormLabel>
                            <RadioGroup {...input}>
                              <FormControlLabel
                                value="COD"
                                control={<Radio />}
                                label="Cash On Delivery"
                              />
                              <FormControlLabel
                                value="BANK"
                                control={<Radio />}
                                label="Direct Bank Transfer"
                              />
                            </RadioGroup>
                          </FormControl>
                        );
                      }}
                    />
                    <Button variant="contained" onClick={() => onSubmit(values)}>
                      Place Order
                    </Button>
                  </Stack>
                );
              }}
            />
          </Grid>

          {/* Product Subtotal Section */}
          <Grid item xs={5}>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between" paddingY={1}>
                <Typography variant="h6">Product</Typography>
                <Typography variant="h6">Subtotal</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" paddingY={1}>
                {cart?.products.map((item) => (
                  <Stack key={item.product._id} direction="row" justifyContent="space-between" width="100%">
                    <Typography>
                      {item.product.title} x {item.quantity} +
                    </Typography>
                    <Typography>
                      {item.product.price.toLocaleString()}đ
                    </Typography>
                  </Stack>
                ))}
              </Stack>

              <Stack spacing={2} mt={3}>
                <Stack direction="row" justifyContent="space-between" paddingY={1}>
                  <Typography fontWeight={500}>Subtotal</Typography>
                  <Typography>{totalPrice.toLocaleString()}đ</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" paddingY={1}>
                  <Typography variant="h6">Total</Typography>
                  <Typography>{(totalPrice * 1).toLocaleString()}đ</Typography> {/* Example total with tax */}
                </Stack>
                <hr />
                <Typography variant="body2" color="textSecondary" mt={2}>
                  Direct Bank Transfer: Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Cash On Delivery: Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy.
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Checkout;

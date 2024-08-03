import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "src/types/Product";
import {
  Button,
  Container,
  IconButton,
  Stack,
  TextField,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import Loading from "src/components/Loading";
import AddIcon from "@mui/icons-material/Add";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import RemoveIcon from "@mui/icons-material/Remove";
import { useProductCart } from "src/hooks/useProductCart";
import GradeIcon from '@mui/icons-material/Grade';
function ProductDetail() {
  const { addToCart } = useProductCart();
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<Product | undefined>();
  const [quantity, setQuantity] = useState<number>(1);

  const getProduct = async (id: string) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/products/${id}`);
      setProduct(data);
    } catch (error) {
      console.error("Failed to fetch product", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getProduct(id);
    }
  }, [id]);

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

  const generateSmallImages = (baseImage: string) => {
    // Tạo URL hình ảnh nhỏ dựa trên URL hình ảnh gốc
    return [
      baseImage.replace(/(\.[\w\d_-]+)$/i, '-small1$1'),
      baseImage.replace(/(\.[\w\d_-]+)$/i, '-small2$1'),
      baseImage.replace(/(\.[\w\d_-]+)$/i, '-small3$1'),
      baseImage.replace(/(\.[\w\d_-]+)$/i, '-small4$1')
    ];
  };

  return (
    <>
      <Loading isShow={loading} />
      <Container>
        {product ? (
          <Stack direction="row" spacing={5}>
            {/* Hình Ảnh Nhỏ */}
            <Stack spacing={1} alignItems="center">
              {generateSmallImages(product.image).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Small view ${index}`}
                  style={{
                    cursor: 'pointer',
                    border: '1px solid #ddd',
                    height: '80px',
                    width: '70px',
                    objectFit: 'cover',
                  }}
                  onClick={() => setProduct(prev => prev ? { ...prev, image } : prev)}
                />
              ))}
            </Stack>
            {/* Hình Ảnh Lớn */}
            <Box>
              <img
                src={product.image}
                alt={product.title}
                style={{
                  height: '370px',
                  width: '300px',
                  objectFit: 'cover',
                }}
              />
            </Box>
            {/* Chi Tiết Sản Phẩm */}
            <Stack spacing={2}>
              <Typography component="h1" variant="h4">
                {product.title}
              </Typography>
              <Typography variant="h6" color="secondary">
                {product.price}đ
              </Typography>
              {/* Bỏ Commen nếu cần thiết */}
              <Typography variant="body1">
                {product.category?.name || "No Category"}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography>
                  <GradeIcon style={{ color: 'gold' }} />
                  <GradeIcon style={{ color: 'gold' }} />
                  <GradeIcon style={{ color: 'gold' }} />
                  <GradeIcon style={{ color: 'gold' }} />
                  <GradeIcon style={{ color: 'gold' }} />
                </Typography>|
                <Typography>5 Customer Reviews</Typography>
              </Stack>
              <Typography>{product.description}</Typography>
              <Typography>Size</Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    backgroundColor: '#f5f5f5',
                    textAlign: 'center'
                  }}
                >
                  <Typography variant="body2">S</Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    backgroundColor: '#f5f5f5',
                    textAlign: 'center'
                  }}
                >
                  <Typography variant="body2">M</Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    backgroundColor: '#f5f5f5',
                    textAlign: 'center'
                  }}
                >
                  <Typography variant="body2">L</Typography>
                </Box>
              </Box>
              <Stack direction="row" alignItems="center">
                <Typography>Số lượng:</Typography>
                <IconButton
                  onClick={() => setQuantity(prev => Math.max(prev - 1, 1))}
                >
                  <RemoveIcon />
                </IconButton>
                <TextField
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  inputProps={{ min: 1 }}
                />
                <IconButton onClick={() => setQuantity(prev => prev + 1)}>
                  <AddIcon />
                </IconButton>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddToCart}
                >
                  Add To Cart
                </Button>
              </Stack>
              <hr />
              <Card>
                <CardContent>
                  <Typography variant="h6">SKU: SS001</Typography>
                  <Typography>
                    Category: {product.category?.name || "No Category"}
                  </Typography>
                  <Stack direction="row" spacing={1} marginTop={1}>
                    <Typography variant="subtitle1">Tags:</Typography>
                    <Chip label="Sofa" />
                    <Chip label="Chair" />
                    <Chip label="Home" />
                    <Chip label="Shop" />
                  </Stack>
                  <Stack direction="row" spacing={1} marginTop={1} >
                    <Typography variant="subtitle1">Share:</Typography>
                    <Stack spacing={1} />
                    <IconButton >
                      <FacebookIcon />
                      <InstagramIcon />
                      <TwitterIcon />
                    </IconButton>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Stack>
        ) : (
          <Typography>Sản phẩm không tồn tại</Typography>
        )}
      </Container>
    </>
  );
}

export default ProductDetail;

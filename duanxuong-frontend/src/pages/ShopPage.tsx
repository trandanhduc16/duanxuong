import React, { useEffect, useState } from 'react';
import { Container, Grid, Box, Typography, InputLabel, Select, MenuItem, FormControl, Stack, AppBar } from '@mui/material';
import axios from 'axios';
import ProductCard from 'src/components/ProductCard';
import { Category, Product } from 'src/types/Product';
import Loading from 'src/components/Loading';
import Banner from 'src/components/Banner';

const ShopPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [itemsPerPage, setItemsPerPage] = useState<number>(16);
  const [sortOrder, setSortOrder] = useState<string>('default');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/products');
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get('/categories');
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    let filtered = products.filter(product =>
      product.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product =>
        product.category?._id === selectedCategory
      );
    }

    if (sortOrder === 'price-low-high') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'price-high-low') {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered.slice(0, itemsPerPage));
  }, [searchQuery, products, itemsPerPage, sortOrder, selectedCategory]);

  const handleItemsPerPageChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setItemsPerPage(event.target.value as number);
  };

  const handleSortChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSortOrder(event.target.value as string);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedCategory(event.target.value as string);
  };

  return (
    <>
      <Banner page="Shop" />
      <Box sx={{ maxWidth: 'auto', margin: '0 auto' }}>
        <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
          <Box
            sx={{
              padding: '8px 16px',
              backgroundColor: "#F9F1E7",
              borderBottom: '1px solid #ddd',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="h6" sx={{ color: "black" }}>
                Bộ lọc |
              </Typography>
              <Typography variant="h6" sx={{ color: "black" }}>
                Hiển thị {filteredProducts.length} của {products.length} kết quả
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <FormControl sx={{ minWidth: 70 }}>
                <InputLabel id="show-label">Hiển thị</InputLabel>
                <Select
                  labelId="show-label"
                  id="show-select"
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                  label="Hiển thị"
                >
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={16}>16</MenuItem>
                  <MenuItem value={24}>24</MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ minWidth: 70 }}>
                <InputLabel id="sort-label">Sắp xếp theo</InputLabel>
                <Select
                  labelId="sort-label"
                  id="sort-select"
                  value={sortOrder}
                  onChange={handleSortChange}
                  label="Sắp xếp theo"
                >
                  <MenuItem value="default">Mặc định</MenuItem>
                  <MenuItem value="price-low-high">Giá: Từ Thấp đến Cao</MenuItem>
                  <MenuItem value="price-high-low">Giá: Từ Cao đến Thấp</MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel id="category-label">Danh mục</InputLabel>
                <Select
                  labelId="category-label"
                  id="category-select"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  label="Danh mục"
                >
                  <MenuItem value="all">Tất cả danh mục</MenuItem>
                  {categories.map(category => (
                    <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Box>
        </AppBar>
      </Box>

      <Container>
        <Box sx={{ padding: '0 50px', marginTop: 2 }}>
          <Loading isShow={loading} />
          <Grid container spacing={2}>
            {filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default ShopPage;

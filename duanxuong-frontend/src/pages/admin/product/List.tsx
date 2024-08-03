import {
  Button,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField, // Thêm TextField để tìm kiếm
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ConfirmDialog from "src/components/ConfirmDialog";
import Flash from "src/components/Flash";
import { useLoading } from "src/contexts/loading";
import { Product } from "src/types/Product";

function AdminProductList() {
  const { setLoading } = useLoading();
  const [showFlash, setShowFlash] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [idDelete, setIdDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(""); // Trạng thái từ khóa tìm kiếm

  const getAllProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/products");
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  const handleConfirm = (id: string) => {
    setConfirm(true);
    setIdDelete(id);
  };

  const handleDelete = async () => {
    try {
      await axios.delete("/products/" + idDelete);
      setShowFlash(true);
      getAllProduct();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Container>
        <Flash isShow={showFlash} />
        <Stack gap={2}>
          <Typography variant="h2" textAlign={"center"}>
            Product List
          </Typography>
          <TextField
            label="Search by title"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật từ khóa tìm kiếm
          />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 1200 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Desc</TableCell>
                  <TableCell align="right">Image</TableCell>
                  <TableCell align="right">Category</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts.map((product, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {product.title}
                    </TableCell>
                    <TableCell align="right">{product.price}</TableCell>
                    <TableCell align="right">{product.description}</TableCell>
                    <TableCell align="right">
                      <img
                        src={product.image}
                        alt={product.title}
                        style={{ width: '70px', height: '70px' }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      {product.category?.name || "No Category"}
                    </TableCell>
                    <TableCell align="right">
                      <Stack
                        direction={"row"}
                        gap={3}
                        justifyContent={"center"}
                      >
                        <Link to={`/admin/product/edit/${product._id}`}>
                          <Button variant="contained" sx={{ bgcolor: "blue" }}>
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="contained"
                          sx={{ bgcolor: "red" }}
                          onClick={() => handleConfirm(product._id)}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <ConfirmDialog
              confirm={confirm}
              onConfirm={setConfirm}
              onDelete={handleDelete}
            />
          </TableContainer>
        </Stack>
      </Container>
    </>
  );
}

export default AdminProductList;

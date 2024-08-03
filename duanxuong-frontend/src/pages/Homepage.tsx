import { Box, Grid, CardContent, Typography, Input, Stack, Card } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Banner from "src/components/Banner";
import Loading from "src/components/Loading";
import ProductCard from "src/components/ProductCard";
import { Product } from "src/types/Product";

function Homepage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const getAllProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/products");
      setProducts(data);
      setFilteredProducts(data); // Set initial filtered products
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <Banner page="Home" />
      <Box>
        <Loading isShow={loading} />
        <Box sx={{ padding: '0 50px' }}>
          <Typography variant="h5" gutterBottom mt={3}>
            New
          </Typography>
          <hr />
          <Stack spacing={2} sx={{ mb: 4 }}>
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{ width: '100%', padding: 1 }}
            />
          </Stack>
          <Grid container spacing={2} sx={{ mt: 4 }}>
            {filteredProducts.slice(0, 4).map((product, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>

          <Typography variant="h5" gutterBottom mt={3}>
            Shop
          </Typography>
          <hr />
          <Grid container spacing={2} mt={2}>
            {/* Add your image grid layout here */}
            <Grid container item spacing={2}>
              <Grid item xs={6}>
                <Box
                  component="img"
                  src="https://s3-alpha-sig.figma.com/img/7528/c088/104274c88e1fb7455ffd94c65dcb012f?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qQ5Vc9P~h68YWuhf19zUpLzoOlnNEywy3vw9z300AEMCWyPqwb5nIkPDCmrL1dh2mifH003fmmi~zw3qSilLUIHKQSIuNTNJHz2p5sLZVK9uAWbmIhJeMP0jqvZiL3bmKSY8i8kwjPP~0GeEsU1zjojvrED0eDB4ef64e-aNxcZ7ffNGpQjTykGN5tEn0nS1D7IEjZgr7lctUsSRaDkNox6pK~FKZBLCzXD4iZIqkf~vAQkwtdiPd8RBPcensAJfMSEGpu-jh28vFql8Gyl2NV4A6XqjmpmHU0te48yu159BSHn5sbggRTWzgSESj6CWp2R3TRSVROhhaongikLrfg__"
                  alt="Image 1"
                  sx={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: 1 }}
                />
              </Grid>
              <Grid item xs={6}>
                <Box
                  component="img"
                  src="https://s3-alpha-sig.figma.com/img/0a1e/c7b8/b8d5802698da4ececd703b4dd570245b?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=o5rP59tSA6NYlQBilWqzluiAqiWoraK2ssRURMRwgBKiuohu8trJzQXNw8QDVUrNhMRsmLfvOQFX6U1a7D7RiT2kieWDdvASVjnQyup0jOGUBdr9-NY~dizTqQGzD88RD88RvbKuUiQU1zPB1VQTN1RXkJWItLAgHYIalWBXQNMbGLek~jeNQrb1~wqD3pOKnQqxSDtEARX6OHnzNoScHlbieDpEw-aRwFk3XQtK3saYeS3GQpxltfery7Q84fGpr55kVLey7NV8RIVvKCrNQ9yKN1z57MKvfk0eajUgaefBle4zicx3i8WcbyrzOZp9cP1exIV17VKJyjx8NJO30A__"
                  alt="Image 2"
                  sx={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: 1 }}
                />
              </Grid>
            </Grid>
            <Grid container item spacing={2}>
              <Grid item xs={6}>
                <Box
                  component="img"
                  src="https://s3-alpha-sig.figma.com/img/ffb5/2565/ffc80117d370a199a47ec758114e7efc?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ch3-PuZge7MFJgdyLJPyxfqARAgxFG7x1pYw7TyMMgwiyeGzOJ5chOsimTUzWsyrEdSGZq6-nut~-MvKMic2m~ilqclvTsnq99kIhK4x7kPv9~2eQzeswzKGQw9o5HVpHqPI5Je0bKm3msZUWWC3JBqnzWDfEvCq6olPxQzXac-r8dWe87ltyC~v25DU24uDCdejGKcpY76sLSYI16d2WDLul8K0DzDqcnsBm2BpOWevYj91eLhv5clu0Jju7tS9EuY9yQKCplKa7HRhApeSq5AVKkdVGtYdz4jYR6O8OXvyLuSXjkBfUNMa9JSFe5IW1ffyaBLw3S9QQcB-UFUf2w__"
                  alt="Image 3"
                  sx={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: 1 }}
                />
              </Grid>
              <Grid item xs={6}>
                <Box
                  component="img"
                  src="https://s3-alpha-sig.figma.com/img/9b1f/5afb/f6ad4c2183251c889b322df119ef34c8?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=lMM5xL585T7oGlLiUkwpgVD71-5MR1HOn4JIX~luebuvpARRFO0zRzI3gmH7jWqBNFzPtXxyJtWOQ~abXhiChQFYLTs6yZTyjZv8YUR5r8lXJe0rfJGoQwq6Z7-zEugcCu6rhxYXooPop~LMOS~ZJRpIzeqESEiWMbMaGQJmMu~e0WJnCNYl2-Srb5zfrXTg2UXIAA-4hs4apmV0UM0Ws9I1tdBHP0A9G2XgknGbmO1CQOlbpMi6G~mfqrL3uYEuhOMSYDBKKSxtN4vLoxicg~ESUysPs5K8zAqgXbQ6RzCabLJg5ISofRRwRtbxqL3wAy-F8vGW4tX9QLP5ZkzLfg__"
                  alt="Image 4"
                  sx={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: 1 }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Typography variant="h5" gutterBottom mt={3}>
          Blog
        </Typography>
        <hr />

        <Card sx={{ marginBottom: 4 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box
                  component="img"
                  src="https://s3-alpha-sig.figma.com/img/511b/7769/8fdab0973cf6b8459ad38d0209e94c15?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aopuIEAdfEP-DmMiD7YygU6GJB4QcgHcvykx57hb59uyH7Rb8tNWqfVXGIKOqoRS4wXTcriwAjLAXCFCoQ7xtuEXRelewJPcTiExG~K823vvFSmFLR6lhLol3SVsDGtK~qefI~qyKDP8NRwypKi736GuYOdtPJnv~F7r95WriqimN7OE70X3KdrBDG3AfztswmUgrhCj8DacXNbVICrzwR-qD57pdHNX5R0tTbKqmsOx3nv~3QRDSDSt6768t9X4ApQs7jyY0k3IwCbRf30IrtJixjzHaAf7sGIz6W495kfs2LNVCXs9ncCYy6~ocuLK39tdmu~9oWuEXTLdUlnwcg__"
                  alt="The Ultimate Sofa Buying Guide"
                  sx={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h4" gutterBottom>
                  THE ULTIMATE SOFA BUYING GUIDE
                </Typography>
                <Typography variant="body1">
                  Your level of comfort when getting into and out of bed can be greatly influenced by the bed frame you choose. It may significantly affect how you want your bedroom to feel and look.
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card sx={{ marginBottom: 4 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box
                  component="img"
                  src="https://s3-alpha-sig.figma.com/img/a224/6239/95432abad09eb8de37f4a236cf0f1e7c?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=H8RjrLTLeBhmUQwQzhY3c~yWrVvL7Z5yTaoXjF64c2Oqeoa66NcbMH867R9CBBHC4~9jNSP9KLztpM2O~PKbtEMGXY2rn9EEopcA7koZ8FjEFOaHokIcRj16MD58dueIlurdBNDD~cCMemYHZfxoXTRQdxbyTgNy7QpEykffJMscgqPZDIC7FsJPyvqIuPSFqDniOFvWBXV7CP5vACskOyg4PbbiOntayHc7tiZ75x7-QF5UvdsgrxOY0plGQcNOf3OclUm2ZTHLc2kMHyk1X6no23DryI92Jl6P7YxFnb-GkVZUMGToO4pN5lc-bxjULXsDiPcjCL~3gDZSh2rz2A__"
                  alt="A Bedroom Must Have Something Like This"
                  sx={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h4" gutterBottom>
                  A BEDROOM MUST HAVE SOMETHING LIKE THIS
                </Typography>
                <Typography variant="body1">
                  Your level of comfort when getting into and out of bed can be greatly influenced by the bed frame you choose. It may significantly affect how you want your bedroom to feel and look.
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box
                  component="img"
                  src="https://s3-alpha-sig.figma.com/img/fdd9/64bc/80337241ae54cb06a47ebf73f4d5e4d4?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CctKaIeuuCBvFLE1K52Ehp8uOvR92OIAxRpBbtrMhKOMX~nOdsWAJo4hH96BSDgZpuYZ3XCkkqCLAjISS8som0sp4X0lsCil0bVYx8dSOWtJmB5JDwpP4HD~N8zo~BQSjRGUpJlWqPAwfe4OAxW35~4jNrEjrF-8cFiPYPNyfY5uHNj3sgMlVT-LLTsrKmwvg9uet7gz5FEBSqbWorW4fV2CZhR3J2qBrL5k3ANkTaahq~8uXom0hWY-DvX004bEdHzNjRn4r4SMh53TdjcmR7RJ23lAUfSKU2VqoAw1xKotGohBLJ085EUf5Xrhi3pPjNN5f3yb82cZSfPvsk8J6w__"
                  alt="Why Is a TV Console a Must in Every House"
                  sx={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h4" gutterBottom>
                  WHY IS A TV CONSOLE A MUST IN EVERY HOUSE
                </Typography>
                <Typography variant="body1">
                  People do a lot of research to make sure they purchase the ideal television. And like the rest of us, you want to keep that gorgeous flat screen in your living or bedroom on a table or stand.
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

export default Homepage;

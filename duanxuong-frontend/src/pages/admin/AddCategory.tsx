// src/components/AddCategory.tsx
import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Container, Typography } from "@mui/material";

const AddCategory: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post<{ _id: string; name: string; description: string }>("/categories", { name, description });
      console.log("Category added:", response.data);
      setName("");
      setDescription("");
    } catch (err) {
      setError("Failed to add category.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Thêm Danh Mục
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Tên Danh Mục"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Mô Tả"
          variant="outlined"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? "Đang Thêm..." : "Thêm Danh Mục"}
        </Button>
      </form>
    </Container>
  );
};

export default AddCategory;

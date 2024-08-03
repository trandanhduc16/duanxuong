import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
import { ValidationErrors } from 'final-form';
import { Field, Form } from 'react-final-form';
import { ProductFormParams, Category } from 'src/types/Product';
import { InputText } from './elements/InputText';

type ProductFormProps = {
  onSubmit: (values: ProductFormParams) => void;
  initialValues?: any;
};

function ProductForm({ onSubmit, initialValues }: ProductFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get<Category[]>('/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    }

    fetchCategories();
  }, []);

  const validate = (values: ProductFormParams) => {
    const { title, image, category, price } = values;
    const errors: ValidationErrors = {};
    if (!title) errors.title = 'Can nhap title vao';
    if (title && title.length < 6)
      errors.title = 'Can nhap toi thieu 6 ky tu vao';
    if (!image) errors.image = 'Can nhap image vao';
    if (!category) errors.category = 'Can nhap category vao';
    if (!price) errors.price = 'Can nhap price vao';
    return errors;
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={initialValues}
      render={({ handleSubmit, values }) => (
        <form onSubmit={handleSubmit}>
          <Stack>
            <Field
              name="title"
              render={({ input, meta }) => (
                <InputText
                  input={input}
                  label={"Title"}
                  messageError={meta.touched && meta.error}
                />
              )}
            />
            <Field
              name="image"
              render={({ input, meta }) => (
                <InputText
                  input={input}
                  label={"Image"}
                  messageError={meta.touched && meta.error}
                />
              )}
            />
            <Field<string>
              name="description"
              render={({ input, meta }) => (
                <InputText
                  input={input}
                  label={"Description"}
                  messageError={meta.touched && meta.error}
                />
              )}
            />
            <Field<number>
              name="price"
              render={({ input, meta }) => (
                <InputText
                  input={input}
                  label={"Price"}
                  messageError={meta.touched && meta.error}
                  type="number"
                />
              )}
            />
            <Field<boolean>
              name="isShow"
              type="checkbox"
              render={({ input }) => (
                <FormControlLabel
                  control={<Checkbox {...input} />}
                  label="Show Product"
                />
              )}
            />
            <Field<string>
              name="category"
              render={({ input, meta }) => (
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    label="Category"
                    {...input}
                    error={!!meta.error && meta.touched}
                    value={input.value || ''} // Ensure value is properly controlled
                  >
                    <MenuItem value="">Select</MenuItem>
                    {categories.map(category => (
                      <MenuItem key={category._id} value={category._id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {meta.touched && meta.error && (
                    <FormHelperText>{meta.error}</FormHelperText>
                  )}
                </FormControl>
              )}
            />
            <Button type="submit">
              Submit
            </Button>
          </Stack>
        </form>
      )}
    />
  );
}

export default ProductForm;

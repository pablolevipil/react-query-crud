import React from 'react'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {createProduct} from '../api/productsAPI'

function ProductForm() {

    const queryClient = useQueryClient()

    const addProductMutation = useMutation({
        mutationFn: createProduct, 
        onSuccess: () => {
            console.log('Producto añadido!!'), 
            queryClient.invalidateQueries('products')
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const product = Object.fromEntries(formData)
        console.log(product)
        addProductMutation.mutate({
            ...product, 
            inStock: true
        })
    }

  return (
    <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name"></input>

        <label htmlFor="name">Description</label>
        <input type="text" id="description" name="description"></input>

        <label htmlFor="name">Price</label>
        <input type="number" id="price" name="price"></input>

        <button>Add Product</button>
    </form>
  )
}

export default ProductForm
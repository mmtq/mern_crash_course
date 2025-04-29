import {create} from "zustand"

export const useProductStore = create ((set)=> ({
    products: [],
    setProducts: (products)=> set({products}),
    createProduct: async (newProduct) => {
        if(!newProduct.name || !newProduct.price || !newProduct.image){
            return {success:false, message:"Please fill in all the fields"}
        }
        const res = await fetch("/api/products",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(newProduct)
        })
        const data = await res.json()
        set((state) => ({products: [...state.products, data.data]}))
        return {success:true, message:"Product Created Successfully"}
    },
    getProducts: async () => {
        const res = await fetch("/api/products", {
            method:"GET"
        })
        const data = await res.json()
        set({products: data.data})
        return {success:true, data:data.data}
    },
    deleteProduct: async (id) => {
        const res = await fetch(`/api/products/${id}`, {
            method:"DELETE"
        })
        const data = await res.json()
        set((state) => ({products: state.products.filter((product) => product._id !== id)}))
        if (data.success){
            return {success:true, message:"Product Deleted Successfully"}
        }
        return {success:false, message:"Product not found"}
    },
    updateProduct: async (id, product) => {
        if(!product.name || !product.price || !product.image){
            return {success:false, message:"Please fill in all the fields"}
        }
        const res = await fetch(`/api/products/${id}`,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(product)
        })
        const data = await res.json()
        set((state) => ({products: state.products.map((product) => product._id === id ? data.data : product)}))
        return {success:true, message:"Product Updated Successfully"}
    }
}))
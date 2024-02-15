import { useEffect, useState } from "react";
import { getAllCategories } from "../services/Apis";
import { toast } from "react-toastify";

export default function useCategory() {
    const [categories,setCategories] =useState([]);
    // get category
    const getCategories = async () =>{
        try {
            const response = await getAllCategories();
            setCategories(response?.category);
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        getCategories()
    },[])

    return categories;
}
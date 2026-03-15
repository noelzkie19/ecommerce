"use client";

import { useState } from "react";
import {
  CreateProductPayload,
  UpdateProductPayload,
  ProductImage,
} from "@/types/product.types";
import { productsService } from "../../../shared/services/products.service";

export const useProductMutations = (onSuccess?: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAsync = async (fn: () => Promise<void>) => {
    setIsLoading(true);
    setError(null);
    try {
      await fn();
      onSuccess?.();
    } catch {
      setError("Operation failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const createProduct = (payload: CreateProductPayload) =>
    handleAsync(() => productsService.create(payload).then(() => {}));

  const updateProduct = (id: string, payload: UpdateProductPayload) =>
    handleAsync(() => productsService.update(id, payload).then(() => {}));

  const deleteProduct = (id: string) =>
    handleAsync(() => productsService.delete(id));

  // ---------------------------------------------------------------------------
  // Single image upload (legacy, used for the primary image_url field)
  // ---------------------------------------------------------------------------
  const uploadImage = async (file: File): Promise<string | null> => {
    setIsLoading(true);
    setError(null);
    try {
      return await productsService.uploadImage(file);
    } catch {
      setError("Image upload failed.");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // ---------------------------------------------------------------------------
  // Multi-image upload — uploads files and returns public URLs
  // ---------------------------------------------------------------------------
  const uploadImages = async (files: File[]): Promise<string[]> => {
    setIsLoading(true);
    setError(null);
    try {
      return await productsService.uploadImages(files);
    } catch {
      setError("Image upload failed.");
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // ---------------------------------------------------------------------------
  // Gallery management (called after product is saved)
  // ---------------------------------------------------------------------------
  const addProductImages = async (
    productId: string,
    urls: string[],
  ): Promise<ProductImage[]> => {
    setIsLoading(true);
    setError(null);
    try {
      return await productsService.addProductImages(productId, urls);
    } catch {
      setError("Failed to attach images.");
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const replaceProductImages = async (
    productId: string,
    urls: string[],
  ): Promise<ProductImage[]> => {
    setIsLoading(true);
    setError(null);
    try {
      return await productsService.replaceProductImages(productId, urls);
    } catch {
      setError("Failed to update images.");
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProductImage = async (imageId: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await productsService.deleteProductImage(imageId);
    } catch {
      setError("Failed to delete image.");
    } finally {
      setIsLoading(false);
    }
  };

  const reorderProductImages = async (
    productId: string,
    images: { id: string; position: number }[],
  ): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await productsService.reorderProductImages(productId, images);
    } catch {
      setError("Failed to reorder images.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createProduct,
    updateProduct,
    deleteProduct,
    uploadImage,
    uploadImages,
    addProductImages,
    replaceProductImages,
    deleteProductImage,
    reorderProductImages,
    isLoading,
    error,
  };
};

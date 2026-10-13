"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Product, CartItem, OrderReservation, ToastNotification } from "@/lib/types";

function safeParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

// Toast Store
export function useToast() {
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const addToast = useCallback((message: string, type: "success" | "info" | "warning" = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
}

// Cart Store
export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const getCart = (): CartItem[] => {
    if (typeof window === "undefined") return [];
    return safeParse<CartItem[]>(localStorage.getItem("komu_cart"), []);
  };

  const saveCart = useCallback((nextCart: CartItem[]) => {
    setCart(nextCart);
    localStorage.setItem("komu_cart", JSON.stringify(nextCart));
    window.dispatchEvent(new Event("komu-cart-updated"));
  }, []);

  useEffect(() => {
    const updateCart = () => setCart(getCart());
    updateCart();
    window.addEventListener("komu-cart-updated", updateCart);
    window.addEventListener("storage", updateCart);
    return () => {
      window.removeEventListener("komu-cart-updated", updateCart);
      window.removeEventListener("storage", updateCart);
    };
  }, []);

  const addToCart = useCallback(
    (product: Product, size: string, color: string, quantity: number = 1) => {
      const currentCart = getCart();
      const existingIndex = currentCart.findIndex(
        (item) => item.product.id === product.id && item.size === size && item.color === color
      );

      if (existingIndex >= 0) {
        currentCart[existingIndex].quantity += quantity;
      } else {
        currentCart.push({ product, size, color, quantity });
      }

      saveCart(currentCart);
      window.dispatchEvent(new CustomEvent("komu-toast", { detail: { message: `Added "${product.name}" (${size}) to Bag!` } }));
    },
    [saveCart]
  );

  const removeFromCart = useCallback(
    (productId: string, size: string, color: string) => {
      const currentCart = getCart();
      const filtered = currentCart.filter(
        (item) => !(item.product.id === productId && item.size === size && item.color === color)
      );
      saveCart(filtered);
    },
    [saveCart]
  );

  const updateQuantity = useCallback(
    (productId: string, size: string, color: string, quantity: number) => {
      const currentCart = getCart();
      const item = currentCart.find(
        (item) => item.product.id === productId && item.size === size && item.color === color
      );
      if (item) {
        item.quantity = Math.max(1, quantity);
        saveCart(currentCart);
      }
    },
    [saveCart]
  );

  const clearCart = useCallback(() => {
    setCart([]);
    localStorage.setItem("komu_cart", "[]");
    window.dispatchEvent(new Event("komu-cart-updated"));
  }, []);

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0), [cart]);

  return { cart, cartCount, cartTotal, getCart, addToCart, removeFromCart, updateQuantity, clearCart };
}

// Wishlist Store
export function useWishlist() {
  const [wishlist, setWishlist] = useState<string[]>([]);

  const getWishlist = (): string[] => {
    if (typeof window === "undefined") return [];
    return safeParse<string[]>(localStorage.getItem("komu_wishlist"), []);
  };

  const saveWishlist = useCallback((nextWishlist: string[]) => {
    setWishlist(nextWishlist);
    localStorage.setItem("komu_wishlist", JSON.stringify(nextWishlist));
    window.dispatchEvent(new Event("komu-wishlist-updated"));
  }, []);

  useEffect(() => {
    const updateWishlist = () => {
      setWishlist(getWishlist());
    };
    updateWishlist();
    window.addEventListener("komu-wishlist-updated", updateWishlist);
    window.addEventListener("storage", updateWishlist);
    return () => {
      window.removeEventListener("komu-wishlist-updated", updateWishlist);
      window.removeEventListener("storage", updateWishlist);
    };
  }, []);

  const toggleWishlist = useCallback(
    (product: Product) => {
      const current = getWishlist();
      const index = current.indexOf(product.id);
      let isAdded = false;

      if (index >= 0) {
        current.splice(index, 1);
      } else {
        current.push(product.id);
        isAdded = true;
      }

      saveWishlist(current);
      window.dispatchEvent(
        new CustomEvent("komu-toast", {
          detail: { message: isAdded ? `Added "${product.name}" to Wishlist!` : `Removed from Wishlist.` },
        })
      );
    },
    [saveWishlist]
  );

  const isInWishlist = useCallback(
    (productId: string) => {
      return wishlist.includes(productId);
    },
    [wishlist]
  );

  return { wishlist, wishlistCount: wishlist.length, getWishlist, toggleWishlist, isInWishlist };
}

// Order Reservations Store
export function useOrders() {
  const [orders, setOrders] = useState<OrderReservation[]>([]);

  const getOrders = (): OrderReservation[] => {
    if (typeof window === "undefined") return [];
    return safeParse<OrderReservation[]>(localStorage.getItem("komu_orders"), []);
  };

  const addOrder = useCallback((order: OrderReservation) => {
    const current = getOrders();
    const next = [order, ...current];
    setOrders(next);
    localStorage.setItem("komu_orders", JSON.stringify(next));
    window.dispatchEvent(new Event("komu-orders-updated"));
  }, []);

  useEffect(() => {
    const updateOrders = () => setOrders(getOrders());
    updateOrders();
    window.addEventListener("komu-orders-updated", updateOrders);
    return () => window.removeEventListener("komu-orders-updated", updateOrders);
  }, []);

  return { orders, addOrder, getOrders };
}

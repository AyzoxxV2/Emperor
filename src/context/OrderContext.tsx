import React, { createContext, useContext, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';
import { CartItem } from '../data/products';

export interface Order {
  id: string;
  product_id: number;
  product_name: string;
  amount: number;
  status: string;
  created_at: string;
}

interface OrderContextType {
  orders: Order[];
  placing: boolean;
  placeOrder: (items: CartItem[]) => Promise<{ success: boolean; error: string | null }>;
  fetchOrders: () => Promise<void>;
}

const OrderContext = createContext<OrderContextType | null>(null);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [placing, setPlacing] = useState(false);
  const { user, session } = useAuth();

  const fetchOrders = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    if (data) setOrders(data);
  }, [user]);

  const placeOrder = useCallback(async (items: CartItem[]): Promise<{ success: boolean; error: string | null }> => {
    if (!user || !session) return { success: false, error: 'You must be logged in to purchase.' };

    setPlacing(true);
    try {
      // Simulate payment processing delay
      await new Promise(r => setTimeout(r, 1500));

      // Insert one order row per item
      const rows = items.map(item => ({
        user_id: user.id,
        product_id: item.id,
        product_name: item.name,
        amount: item.price * item.quantity,
        status: 'completed',
      }));

      const { error } = await supabase.from('orders').insert(rows);
      if (error) return { success: false, error: error.message };

      await fetchOrders();
      return { success: true, error: null };
    } catch (e: any) {
      return { success: false, error: e.message || 'Unknown error' };
    } finally {
      setPlacing(false);
    }
  }, [user, session, fetchOrders]);

  return (
    <OrderContext.Provider value={{ orders, placing, placeOrder, fetchOrders }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrders must be used within OrderProvider');
  return ctx;
};

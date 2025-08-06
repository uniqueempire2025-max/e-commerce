'use client'

import React, { createContext, useContext, useReducer, ReactNode, useMemo } from 'react'
import { CartItem, Product, Frame, User } from '@/types'

interface StoreState {
  cart: CartItem[]
  user: User | null
  isAuthenticated: boolean
}

type StoreAction =
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_USER'; payload: User }
  | { type: 'LOGOUT' }

const initialState: StoreState = {
  cart: [],
  user: null,
  isAuthenticated: false,
}

function storeReducer(state: StoreState, action: StoreAction): StoreState {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.product.id === action.payload.product.id)
      if (existingItem && !action.payload.customization) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.product.id === action.payload.product.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        }
      }
      return {
        ...state,
        cart: [...state.cart, action.payload],
      }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((_, index) => index.toString() !== action.payload),
      }

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      }

    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
      }

    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      }

    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      }

    default:
      return state
  }
}

const StoreContext = createContext<{
  state: StoreState
  dispatch: React.Dispatch<StoreAction>
} | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(storeReducer, initialState)

  const contextValue = useMemo(() => ({ state, dispatch }), [state])

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  return context
}

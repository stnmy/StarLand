export interface Order {
    id: number
    buyerEmail: string
    shippingAddress: ShippingAddress
    orderDate: string
    orderItems: OrderItem[]
    subtotal: number
    deliveryFee: number
    discount: number
    paymentIntentId: string
    orderStatus: number
    paymentSummary: PaymentSummary
  }
  
  export interface ShippingAddress {
    name: string
    line1: string
    line2?: any
    city: string
    state: string
    postal_code: string
    country: string
  }
  
  export interface OrderItem {
    productId: number
    name: string
    pictureUrl: string
    price: number
    quantity:number
  }
  
  // export interface ItemOrdered {
  //   productId: number
  //   name: string
  //   pictureUrl: string
  // }
  
  export interface PaymentSummary {
    last4: string | number
    brand: string
    exp_month: number
    exp_year: number
  }

  export interface CreateOrder {
    shippingAddress : ShippingAddress
    paymentSummary: PaymentSummary
  }
  
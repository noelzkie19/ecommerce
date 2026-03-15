/** Persisted row returned from the API */
export interface ShippingAddress {
  id: string;
  userId: string;
  fullName: string;
  phone: string;
  address: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

/** POST /shipping — create */
export interface CreateShippingAddressDTO {
  fullName: string;
  phone: string;
  address: string;
  notes?: string;
}

export interface UpdateShippingAddressDTO {
  fullName?: string;
  phone?: string;
  address?: string;
  notes?: string;
}

export interface ShippingFormData {
  fullName: string;
  phone: string;
  address: string;
  notes: string;
}

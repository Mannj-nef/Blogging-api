export type UserResponse = {
  id: string
  updatedAt: Date
  createdAt: Date
  userName: string
  email: string
  firstName: string | null
  lastName: string | null
  coverPhoto: string | null
  phoneNumber: number | null
  dateOfBirth: Date | null
  city: string | null
  biography: string | null
}

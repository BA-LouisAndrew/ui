import { Customer } from "@/types"

export type SampleCustomer = {
  label: string
  key: string
  data: Customer
}

export const presetCustomers: SampleCustomer[] = [
  {
    label: "Trustworthy customer",
    key: "trustworthy",
    data: {
      firstName: "Mickey",
      lastName: "Mouse",
      address: {
        country: "United States",
        state: "California",
        city: "Anaheim",
        postalCode: "92802",
        streetName: "1313 Disneyland Dr",
      },
      email: "hello-world@mickey.com",
      phoneNumber: "+17147814636",
    },
  },
  {
    label: "Fraudulent customer",
    key: "fraudulent",
    data: {
      firstName: "Winnie",
      lastName: "the Pooh",
      address: {
        streetName: "Storkowerstr. 219",
        postalCode: "10367",
        city: "Berlin",
        state: "Berlin",
        country: "Germany",
      },
      email: "winnie-the-pooh@mmmmail.com",
      phoneNumber: "01788888812",
    },
  },
]

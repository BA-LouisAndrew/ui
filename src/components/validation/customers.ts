import { Customer } from "@/types"

export type SampleCustomer = {
  label: string
  key: string
  data: Customer
}

export const presetCustomers: SampleCustomer[] = [
  {
    label: "US-based trustworthy customer",
    key: "us-trust",
    data: {
      firstName: "Mickey",
      lastName: "Mouse",
      address: {
        country: "United States",
        state: "California",
        city: "San Fransisco",
        postalCode: "94107",
        streetName: "210 King Street",
      },
      email: "real-mickey@mickey.com",
      phoneNumber: "+17147814636",
    },
  },
  {
    label: "Berlin-based customer (not registered, domain blacklisted)",
    key: "de",
    data: {
      firstName: "G.G.",
      lastName: "Goofy",
      address: {
        streetName: "Storkowerstr. 219",
        postalCode: "10367",
        city: "Berlin",
        state: "Berlin",
        country: "Germany",
      },
      email: "goofy@tx.go",
      phoneNumber: "01788888812",
    },
  },
  {
    label: "Italy-based customer (suspicious)",
    key: "sus",
    data: {
      firstName: "Masha and the",
      lastName: "Bear",
      email: "bear-is@fraud.com",
      address: {
        state: "Lazio",
        postalCode: "12345",
        city: "Rome",
        country: "Italy",
        streetName: "Shady-street",
      },
      phoneNumber: "123454312",
    },
  },
  {
    label: "France-based customer (not-registered, blacklisted)",
    key: "fr",
    data: {
      firstName: "Thomas",
      lastName: "and Friends",
      email: "thomas-and@friends.com",
      address: {
        state: "Île-de-France",
        streetName: "Champ de Mars, 5 Av. Anatole",
        city: "Paris",
        country: "France",
        postalCode: "75007",
      },
      phoneNumber: "12313123",
    },
  },
  {
    label: "US-based customer (blacklisted-email)",
    key: "us-fraud",
    data: {
      firstName: "Scooby",
      lastName: "Doo",
      email: "scooby-doo@fraud.co",
      address: {
        streetName: "Suite 5000 185 Berry St",
        city: "San Fransisco",
        state: "CA",
        country: "United States",
        postalCode: "94107",
      },
      phoneNumber: "123131123",
    },
  },
]

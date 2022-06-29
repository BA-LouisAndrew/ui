import { Customer } from "@/types"

export type SampleCustomer = {
  label: string
  key: string
  data: Customer
}

export const presetCustomers: SampleCustomer[] = [
  {
    label: "Trustworthy customer",
    key: "us-trust",
    data: {
      firstName: "Mickey",
      lastName: "Mouse",
      address: {
        country: "DE",
        state: "Munich",
        city: "Munich",
        postalCode: "80331",
        streetName: "Zweibrückenstraße 12",
      },
      email: "real-mickey@mickey.com",
      phoneNumber: "+17147814636",
    },
  },
  {
    label: "Berlin-based customer (registered, domain blacklisted)",
    key: "de",
    data: {
      firstName: "G.G.",
      lastName: "Goofy",
      address: {
        streetName: "Storkowerstr. 219",
        postalCode: "10367",
        city: "Berlin",
        state: "Berlin",
        country: "DE",
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
        country: "IT",
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
        country: "FR",
        postalCode: "75007",
      },
      phoneNumber: "12313123",
    },
  },
  {
    label: "Berlin-based customer (invalid address)",
    key: "de-invalid-fraud",
    data: {
      firstName: "Scooby",
      lastName: "Doo",
      email: "scooby-doo@fraud.co",
      address: {
        streetName: "Storkowerstr. 500",
        city: "Berlin",
        state: "Berlin",
        country: "DE",
        postalCode: "10465",
      },
      phoneNumber: "123131123",
    },
  },
]

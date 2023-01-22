export interface Address {
  idAddress?: number;
  rue: string;
  departement: string;
  ville: Address;
  pays: string;
}

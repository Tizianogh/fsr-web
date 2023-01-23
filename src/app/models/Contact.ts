import { Address } from './Address';
import { ContactGroups } from './ContactGroups';
import { PhoneNum } from './PhoneNum';

export interface Contact {
  idContact?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  address?: Address;
  phones?: Set<PhoneNum>;
  contactGroups?: Set<ContactGroups>;
}

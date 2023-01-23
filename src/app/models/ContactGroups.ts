import { Contact } from './Contact';

export interface ContactGroups {
  idContactGroup?: number;
  libelle?: string;
  contacts?: Set<Contact>;
}

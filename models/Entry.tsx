export enum EntryType {
  Link,
  Text,
}

export interface Entry {
  id: string;
  title: string;
  content: string;
  date_of_next_send: string;
  category?: string;
  type: EntryType;
}

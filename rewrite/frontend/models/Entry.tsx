export enum EntryType {
	Link,
	Text,
}

export interface Entry {
	id: string
	title: string
	content: string
	dateOfNextSend: string
	category?: string
	type: EntryType
}
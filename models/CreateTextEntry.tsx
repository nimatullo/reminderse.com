interface CreateEntry {
	entry_title: string
	category?: string
	dateOfNextSend: string
}

export interface CreateLinkEntry extends CreateEntry {
	url: string
}

export interface CreateTextEntry extends CreateEntry {
	text_content: string
}
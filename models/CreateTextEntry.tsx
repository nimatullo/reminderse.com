interface CreateEntry {
	entry_title: string
	category?: string
	date_of_next_send?: string
}

export interface CreateLinkEntry extends CreateEntry {
	url: string
}

export interface CreateTextEntry extends CreateEntry {
	text_content: string
}
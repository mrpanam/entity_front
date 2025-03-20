// For responses from the backend
export interface Entity {
    id: recordId;
    name: string;
}

// For creating/updating entities
export interface EntityInput {
    id?: string;
    name: string;
}

export interface recordId {
    tb: string;
    id: {
        String: string;
    };
}


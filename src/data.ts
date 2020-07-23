
export interface Event {
    event: string;
    date: string;
}

export interface Record {
    id: string;
    events: Event[];
}

export interface EventData {
    records: Record[];
}

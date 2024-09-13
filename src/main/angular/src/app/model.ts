export interface StatusItem {
    id: string,
    status: "SUCCESS" | "DEGRADED" | "FAILURE";
    rangeStart: Date;
}

export interface StatusRow {
    service: string;
    items: StatusItem[];
    resolutionMinutes: number;
}

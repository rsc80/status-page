export interface StatusItem {
    id: string,
    status: "SUCCESS" | "DEGRADED" | "FAILURE" | "NO_DATA";
    rangeStart: Date;
}

export interface StatusRow {
    service: string;
    items: StatusItem[];
    resolutionMinutes: number;
}

export interface DailyServiceMetrics {
    totalRequests: number;
    totalSuccessCount: number;
    totalClientErrorCount: number;
    totalServerErrorCount: number;
}

export interface HourMetrics {
    successCount: number;
    clientErrorCount: number;
    serverErrorCount: number;
}

export interface Service {
    serviceName: string;
    serviceVersion: string;
    dailyMetrics: DailyServiceMetrics;
    hours: { [key: string]: HourMetrics };
}

export interface DailyData {
    date: string;
    statusIndicator: "WARNING" | "SUCCESS";
    services: Service[]
}

export interface Participant {
    id: string;
    name: string;
    isExternal: boolean;
    dailyData: DailyData[]
}

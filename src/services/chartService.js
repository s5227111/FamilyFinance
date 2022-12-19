import submitApi from "../config/submitApi";

export const handleGetChartToMonth = async () => {
    const response = await submitApi("charts/months", "GET");
    return response;
}
import submitApi from "../config/submitApi";

/**
 * Get the chart data
 * @returns
 * @memberof Charts
 * @description Get the chart data
 * @returns {Promise<void>}
 * @param {string} url
 * @param {string} method
 * @returns {Promise<void>}
 * @memberof Charts
 */
export const handleGetChartToMonth = async () => {
    const response = await submitApi("charts/months", "GET");
    return response;
}

export const handleGetChartToCategory = async () => {
    const response = await submitApi("charts/categories", "GET");
    return response;
}
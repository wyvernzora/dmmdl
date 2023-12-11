/**
 * Async function that waits until a condition becomes true, checking every {interval} milliseconds.
 * @param condition Predicate function that returns true when condition is satisfied.
 * @param interval Number of milliseconds to wait between each check of the condition. Default: 200
 * @returns Promise that resolves when the condition is satisfied.
 */
export async function waitUntil(
    condition: () => boolean, 
    interval: number = 200, 
    timeout: number = 10000
): Promise<void> {
    const startTime = Date.now();
    return new Promise((resolve, reject) => {
        const ticker = setInterval(() => {
            if (condition()) {
                clearInterval(ticker);
                return resolve();
            }
            if (Date.now() - startTime > timeout) {
                clearInterval(ticker);
                return reject(new Error("timed out waiting for condition"));
            }
        }, interval);
    });
}

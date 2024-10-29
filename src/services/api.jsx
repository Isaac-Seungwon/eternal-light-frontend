export const fetchMessage = async () => {
    const response = await fetch('/api');
    return await response.text();
};

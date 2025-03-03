const checkUrl = (url: string): boolean => {
    if (!url || !url.startsWith("http") || !url.includes(".")) return false;

    return true;
}

export default checkUrl;
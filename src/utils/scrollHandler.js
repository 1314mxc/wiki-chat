// scrollHandler.js

export function setupScrollHandler(rightSectionRef, callback) {
    const handleScroll = () => {
        if (!rightSectionRef.value) return;

        const isAtBottom =
            rightSectionRef.value.scrollTop + rightSectionRef.value.clientHeight >=
            rightSectionRef.value.scrollHeight;

        if (isAtBottom) {
            debounceCallback(callback);
        }
    };

    const debounceCallback = (callback) => {
        setTimeout(() => {
            callback();
        }, 1500);
    };

    return handleScroll;
}
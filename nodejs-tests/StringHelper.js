function truncate(text, maxLength, suffix = "...") {

    if (maxLength <= 0) {
        throw new Error("maxLength debe ser mayor que 0");
    }

    if (text.length <= maxLength) {
        return text;
    }

    return text.substring(0, maxLength) + suffix;
}

function toSlug(text) {

    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
}

function countWords(text) {

    if (!text.trim()) {
        return 0;
    }

    return text.split(/\s+/).filter(Boolean).length;
}

module.exports = {
    truncate,
    toSlug,
    countWords
};
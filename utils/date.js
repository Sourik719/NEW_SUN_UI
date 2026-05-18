const normalizeDate = (date) => {
    if (!date) return null;

    const parsedDate = date instanceof Date ? date : new Date(date);
    return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
};

export const formatDate = (date) => {
    const parsedDate = normalizeDate(date);
    if (!parsedDate) return '-';

    return parsedDate.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
};

export const formatMonthYear = (date) => {
    const parsedDate = normalizeDate(date);
    if (!parsedDate) return '-';

    return parsedDate.toLocaleDateString('en-IN', {
        month: 'short',
        year: 'numeric',
    });
};

export const formatDateInputValue = (date) => {
    const parsedDate = normalizeDate(date);
    if (!parsedDate) return '';

    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const day = String(parsedDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

export const formatDateRange = (startDate, endDate) => {
    const start = normalizeDate(startDate);
    const end = normalizeDate(endDate);

    if (!start || !end) return '-';

    if (
        start.getMonth() === end.getMonth() &&
        start.getFullYear() === end.getFullYear()
    ) {
        return formatMonthYear(start);
    }

    return `${formatMonthYear(start)} - ${formatMonthYear(end)}`;
};

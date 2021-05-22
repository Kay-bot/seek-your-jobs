export const getCurrencySymbol = (country) => {
    const currencies = {
        gb: '£',
        us: '$',
        au: '$',
        ca: '$',
    };
    return currencies[country];
};

export const extractFormData = (form) =>
    Array.from(form.elements).reduce(
        (acc, { id, value }) => ({...acc, [id]: value }, {})
    );
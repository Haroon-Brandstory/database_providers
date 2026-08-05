/**
 * phoneMin / phoneMax = national number length (no country dial digits).
 * groups = display chunk sizes, e.g. US [3,3,4] → 555 123 4567
 * example = placeholder hint
 */
export const COUNTRY_DIAL_CODES = [
    { code: "US", name: "United States", dial: "+1", phoneMin: 10, phoneMax: 10, groups: [3, 3, 4], example: "555 123 4567" },
    { code: "IN", name: "India", dial: "+91", phoneMin: 10, phoneMax: 10, groups: [5, 5], example: "98765 43210" },
    { code: "AE", name: "United Arab Emirates", dial: "+971", phoneMin: 9, phoneMax: 9, groups: [2, 3, 4], example: "50 123 4567" },
    { code: "SG", name: "Singapore", dial: "+65", phoneMin: 8, phoneMax: 8, groups: [4, 4], example: "9123 4567" },
    { code: "MY", name: "Malaysia", dial: "+60", phoneMin: 9, phoneMax: 10, groups: [2, 4, 4], example: "12 3456 7890" },
    { code: "GB", name: "United Kingdom", dial: "+44", phoneMin: 10, phoneMax: 10, groups: [4, 3, 3], example: "7911 123 456" },
    { code: "AU", name: "Australia", dial: "+61", phoneMin: 9, phoneMax: 9, groups: [3, 3, 3], example: "412 345 678" },
    { code: "CA", name: "Canada", dial: "+1", phoneMin: 10, phoneMax: 10, groups: [3, 3, 4], example: "416 555 0199" },
    { code: "DE", name: "Germany", dial: "+49", phoneMin: 10, phoneMax: 11, groups: [3, 4, 4], example: "151 2345 6789" },
    { code: "FR", name: "France", dial: "+33", phoneMin: 9, phoneMax: 9, groups: [1, 2, 2, 2, 2], example: "6 12 34 56 78" },
    { code: "NL", name: "Netherlands", dial: "+31", phoneMin: 9, phoneMax: 9, groups: [2, 3, 4], example: "6 123 4567" },
    { code: "IE", name: "Ireland", dial: "+353", phoneMin: 9, phoneMax: 9, groups: [2, 3, 4], example: "85 123 4567" },
    { code: "NZ", name: "New Zealand", dial: "+64", phoneMin: 8, phoneMax: 10, groups: [2, 3, 4], example: "21 123 4567" },
    { code: "PH", name: "Philippines", dial: "+63", phoneMin: 10, phoneMax: 10, groups: [3, 3, 4], example: "917 123 4567" },
    { code: "ID", name: "Indonesia", dial: "+62", phoneMin: 9, phoneMax: 12, groups: [3, 4, 4], example: "812 3456 7890" },
    { code: "TH", name: "Thailand", dial: "+66", phoneMin: 9, phoneMax: 9, groups: [2, 3, 4], example: "81 234 5678" },
    { code: "VN", name: "Vietnam", dial: "+84", phoneMin: 9, phoneMax: 10, groups: [3, 3, 4], example: "912 345 678" },
    { code: "JP", name: "Japan", dial: "+81", phoneMin: 10, phoneMax: 10, groups: [2, 4, 4], example: "90 1234 5678" },
    { code: "KR", name: "South Korea", dial: "+82", phoneMin: 9, phoneMax: 10, groups: [2, 4, 4], example: "10 1234 5678" },
    { code: "CN", name: "China", dial: "+86", phoneMin: 11, phoneMax: 11, groups: [3, 4, 4], example: "131 2345 6789" },
    { code: "HK", name: "Hong Kong", dial: "+852", phoneMin: 8, phoneMax: 8, groups: [4, 4], example: "9123 4567" },
    { code: "TW", name: "Taiwan", dial: "+886", phoneMin: 9, phoneMax: 9, groups: [3, 3, 3], example: "912 345 678" },
    { code: "SA", name: "Saudi Arabia", dial: "+966", phoneMin: 9, phoneMax: 9, groups: [2, 3, 4], example: "50 123 4567" },
    { code: "QA", name: "Qatar", dial: "+974", phoneMin: 8, phoneMax: 8, groups: [4, 4], example: "3312 3456" },
    { code: "KW", name: "Kuwait", dial: "+965", phoneMin: 8, phoneMax: 8, groups: [4, 4], example: "5000 1234" },
    { code: "BH", name: "Bahrain", dial: "+973", phoneMin: 8, phoneMax: 8, groups: [4, 4], example: "3600 1234" },
    { code: "OM", name: "Oman", dial: "+968", phoneMin: 8, phoneMax: 8, groups: [4, 4], example: "9212 3456" },
    { code: "ZA", name: "South Africa", dial: "+27", phoneMin: 9, phoneMax: 9, groups: [2, 3, 4], example: "82 123 4567" },
    { code: "NG", name: "Nigeria", dial: "+234", phoneMin: 10, phoneMax: 10, groups: [3, 3, 4], example: "802 123 4567" },
    { code: "KE", name: "Kenya", dial: "+254", phoneMin: 9, phoneMax: 9, groups: [3, 3, 3], example: "712 345 678" },
    { code: "BR", name: "Brazil", dial: "+55", phoneMin: 10, phoneMax: 11, groups: [2, 5, 4], example: "11 91234 5678" },
    { code: "MX", name: "Mexico", dial: "+52", phoneMin: 10, phoneMax: 10, groups: [3, 3, 4], example: "55 1234 5678" },
    { code: "AR", name: "Argentina", dial: "+54", phoneMin: 10, phoneMax: 10, groups: [2, 4, 4], example: "11 2345 6789" },
    { code: "ES", name: "Spain", dial: "+34", phoneMin: 9, phoneMax: 9, groups: [3, 3, 3], example: "612 345 678" },
    { code: "IT", name: "Italy", dial: "+39", phoneMin: 9, phoneMax: 10, groups: [3, 3, 4], example: "312 345 6789" },
    { code: "PT", name: "Portugal", dial: "+351", phoneMin: 9, phoneMax: 9, groups: [3, 3, 3], example: "912 345 678" },
    { code: "SE", name: "Sweden", dial: "+46", phoneMin: 9, phoneMax: 9, groups: [2, 3, 4], example: "70 123 4567" },
    { code: "NO", name: "Norway", dial: "+47", phoneMin: 8, phoneMax: 8, groups: [3, 2, 3], example: "406 12 345" },
    { code: "DK", name: "Denmark", dial: "+45", phoneMin: 8, phoneMax: 8, groups: [2, 2, 2, 2], example: "20 12 34 56" },
    { code: "FI", name: "Finland", dial: "+358", phoneMin: 9, phoneMax: 10, groups: [2, 3, 4], example: "40 123 4567" },
    { code: "CH", name: "Switzerland", dial: "+41", phoneMin: 9, phoneMax: 9, groups: [2, 3, 4], example: "78 123 4567" },
    { code: "AT", name: "Austria", dial: "+43", phoneMin: 10, phoneMax: 11, groups: [3, 3, 4], example: "664 123 4567" },
    { code: "BE", name: "Belgium", dial: "+32", phoneMin: 9, phoneMax: 9, groups: [3, 2, 2, 2], example: "470 12 34 56" },
    { code: "PL", name: "Poland", dial: "+48", phoneMin: 9, phoneMax: 9, groups: [3, 3, 3], example: "512 345 678" },
    { code: "TR", name: "Turkey", dial: "+90", phoneMin: 10, phoneMax: 10, groups: [3, 3, 4], example: "501 234 5678" },
    { code: "IL", name: "Israel", dial: "+972", phoneMin: 9, phoneMax: 9, groups: [2, 3, 4], example: "50 123 4567" },
    { code: "PK", name: "Pakistan", dial: "+92", phoneMin: 10, phoneMax: 10, groups: [3, 7], example: "300 1234567" },
    { code: "BD", name: "Bangladesh", dial: "+880", phoneMin: 10, phoneMax: 10, groups: [4, 6], example: "1711 234567" },
    { code: "LK", name: "Sri Lanka", dial: "+94", phoneMin: 9, phoneMax: 9, groups: [2, 3, 4], example: "71 234 5678" },
    { code: "NP", name: "Nepal", dial: "+977", phoneMin: 10, phoneMax: 10, groups: [3, 3, 4], example: "984 123 4567" },
];

export const DEFAULT_COUNTRY_CODE = "US";

export function getCountryByCode(code) {
    return COUNTRY_DIAL_CODES.find((c) => c.code === code) || COUNTRY_DIAL_CODES[0];
}

/** PNG flags work on Windows/Linux/Android — emoji flags often do not. */
export function getCountryFlagUrl(code, width = 40) {
    const iso = String(code || "US").toLowerCase();
    return `https://flagcdn.com/w${width}/${iso}.png`;
}

export function digitsOnly(value) {
    return String(value || "").replace(/\D/g, "");
}

/** Format national digits using country grouping. */
export function formatNationalNumber(digits, countryCode) {
    const country = getCountryByCode(countryCode);
    const max = country.phoneMax || 15;
    const clean = digitsOnly(digits).slice(0, max);
    const groups = country.groups || [3, 3, 4];

    const parts = [];
    let index = 0;
    for (const size of groups) {
        if (index >= clean.length) break;
        parts.push(clean.slice(index, index + size));
        index += size;
    }
    if (index < clean.length) {
        parts.push(clean.slice(index));
    }
    return parts.filter(Boolean).join(" ");
}

export function normalizeNationalNumber(value, countryCode) {
    const country = getCountryByCode(countryCode);
    return digitsOnly(value).slice(0, country.phoneMax || 15);
}

export function validateNationalNumber(value, countryCode) {
    const country = getCountryByCode(countryCode);
    const digits = digitsOnly(value);
    const min = country.phoneMin || 6;
    const max = country.phoneMax || 15;

    if (!digits) return "Mobile Number is required";
    if (digits.length < min || digits.length > max) {
        if (min === max) {
            return `Enter a valid ${min}-digit ${country.name} mobile number`;
        }
        return `Enter a valid ${min}–${max} digit ${country.name} mobile number`;
    }
    return "";
}

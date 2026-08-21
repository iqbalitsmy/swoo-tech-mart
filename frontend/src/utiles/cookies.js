// Reads a cookie's value by name. Only works for cookies the backend sets
// WITHOUT the HttpOnly flag - HttpOnly cookies (like the refresh token) are
// invisible to document.cookie entirely, by design, for XSS protection.
export const getCookie = (name) => {
    const match = document.cookie.match(new RegExp('(?:^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[1]) : null;
};
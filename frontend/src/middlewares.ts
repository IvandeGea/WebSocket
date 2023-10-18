export function isUserAuthenticated() {
    return document.cookie.split(';').some(cookie => cookie.trim().startsWith('userId='));
  }


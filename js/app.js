document.addEventListener("DOMContentLoaded", function() {
    const path = window.location.pathname;

    if (path === "/index.html") {
        import('./user.min.js').then(module => module.default());
        import('./chat.min.js').then(module => module.default());
    } else if (path === "/schedule.html" || path === "/about.html") {
        import('./user.min.js').then(module => module.default());
    } else if (path === "/live-chat.html") {
        import('./user.min.js').then(module => module.default());
        import('./chat.min.js').then(module => module.default());
    }
});

function addOnload(func) {
    var tempOnload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        
    }
} 
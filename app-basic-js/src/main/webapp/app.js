var keycloak = new Keycloak();

function notAuthenticated() {
    document.getElementById('not-authenticated').style.display = 'block';
    document.getElementById('authenticated').style.display = 'none';
}

function authenticated() {
    document.getElementById('not-authenticated').style.display = 'none';
    document.getElementById('authenticated').style.display = 'block';

    var name;
    if (keycloak.tokenParsed['given_name'] && keycloak.tokenParsed['family_name']) {
        name = keycloak.tokenParsed['given_name']  + ' ' +  keycloak.tokenParsed['family_name'];
    } else {
        name = keycloak.tokenParsed['preferred_username'];
    }
    document.getElementById('name').innerText = name;
}

keycloak.onAuthLogout = notAuthenticated;

window.onload = function () {
    keycloak.init({ onLoad: 'check-sso', checkLoginIframeInterval: 1 }).success(function () {
        if (keycloak.authenticated) {
            authenticated();
        } else {
            notAuthenticated();
        }

        document.body.style.display = 'block';
    });
}
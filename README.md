## Set Up

Run `npm run dev` to launch the server


## HTTPS

HTTPS is mandatory for SameSite=none cookies, so localhost must be run in HTTPS.

For our purposes, all you need to do is to install a reverse proxy like Caddy 2* ($ brew install Caddy or https://caddyserver.com/docs/download) and launch it:

`$ caddy reverse-proxy --from localhost:443 --to localhost:3000`

All you need to do now is to launch your app with node server.js and navigate to https://localhost. You’ll see the familiar prompt and, once authenticated, the user greeting:

- `https://localhost/` displays publicly accessible page
- `https://localhost/login` or `https://localhost/profile` (any page that requires authentication) prompts the login and display private page
- `https://localhost/logout` logs out

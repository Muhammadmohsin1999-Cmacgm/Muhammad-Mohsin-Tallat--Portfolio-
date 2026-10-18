# Portfolio launch checklist

## Before publishing

1. Confirm the name, phone number, email, employment details, dates and metrics are accurate and that you want them public.
2. Decide which contact details you want publicly visible. The portfolio has email, WhatsApp and an Al-Khobar Google Maps search link; it does not collect or store visitor data.
3. The four project cards link to independent HTML/CSS/JavaScript portfolio app prototypes: employee tracking, inventory control, fleet dispatch, and a safety action register. They use sample data saved in the visitor's browser only; they have no backend, shared real-time database, authentication, or employer-system connection. Do not describe them as deployed client or employer systems.
4. Choose an available domain with an appropriate extension, for example `.com`, `.net` or `.sa`. Check registration eligibility and current prices with the registrar.

## Deploy with Netlify

1. Create a GitHub repository and upload this portfolio folder, including `assets/muhammad-mohsin-tallat.jpg`.
2. In Netlify, import the repository as a new site. This is a static HTML/CSS/JavaScript website; no build command is needed and the publish directory is the repository root. Keep `portfolio-projects.html`, `portfolio-projects.css`, and `portfolio-projects.js` in the published root so the project demos work.
3. In the Netlify domain settings, add the domain you registered and follow the DNS records Netlify provides.
4. Wait for domain verification and the automatic TLS/SSL certificate. Test the site on its HTTPS URL.
5. Replace `https://YOUR-DOMAIN.com/` in `sitemap.xml` with the final canonical HTTPS URL. Add `Sitemap: https://YOUR-DOMAIN.com/sitemap.xml` to `robots.txt`.
6. Test the site, links, 404 page, and responsive layout at phone, tablet and desktop sizes.

GitHub Pages or Vercel can also host this static site. Use one hosting provider at a time and follow its current custom-domain and DNS instructions. Hosting, a domain, and certificates are separate provider/account setup; they cannot be activated from these files alone.

## Google search setup

1. After the custom domain serves the site over HTTPS, add and verify the domain in Google Search Console using the verification method Google provides.
2. Submit `https://YOUR-DOMAIN.com/sitemap.xml` after replacing the placeholder with the real domain.
3. Check Search Console's URL Inspection and request indexing. Indexing and ranking are controlled by Google and are not guaranteed.
4. The page has descriptive metadata, index/follow robots directives, a Person schema, a sitemap template, and a crawlable `robots.txt`.

## Privacy, analytics and backups

- Google Analytics is not included. Add it only if you choose a measurement ID and determine the applicable privacy and consent requirements.
- No cookie banner is included because this static portfolio does not set analytics or advertising cookies and has no visitor-data form. Reassess before adding third-party tracking, forms, or embedded services.
- Keep the GitHub repository private if you do not want the source and resume image publicly browsable; the deployed website itself will still be public. Store a second backup in a separate secure location.
- Regular backups require an ongoing schedule. Verify that the image and all website files are included in repository history and in the separate backup.
- Use only photos and other media you have permission to publish. The profile photo in this site was supplied for this request.

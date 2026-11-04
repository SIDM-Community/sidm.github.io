# SIDM Community website

A dependency-free static starter site for **SIDM: Standards, Interoperability and Data Management**.

**Public domain:** `https://sidm.org.uk`  
**Website repository:** `https://github.com/SIDM-Community/sidm.github.io`  
**Community repository:** `https://github.com/SIDM-Community/sidm-community`

This is a starter publication, not an official statement or endorsement by BCS, HL7 UK, PRSB or other organisations. Review the content and governance wording before public launch.

## What is included

| File | Function |
| --- | --- |
| `index.html` | Home and community introduction |
| `about.html` | Purpose, participants and relationships |
| `focus.html` | Standards, interoperability and data management |
| `projects.html` | Exploratory work areas and live public GitHub project issues |
| `resources.html` | Searchable and filterable external reference directory |
| `participate.html` | Routes to proposals, contributions and discussions |
| `governance.html` | Editorial status, approvals and responsible publication |
| `privacy.html` | Website privacy and accessibility information |
| `404.html` | Fallback for missing pages |
| `assets/css/styles.css` | Responsive visual design |
| `assets/js/site.js` | Mobile navigation, filters and optional public GitHub issues feed |
| `assets/img/favicon.svg` | Original starter brand symbol (not a formally approved SIDM logo) |
| `CNAME` | Registers `sidm.org.uk` as the custom domain for branch-based GitHub Pages |
| `.nojekyll` | Publishes the files as-is, without Jekyll processing |
| `robots.txt`, `sitemap.xml` | Search crawler information |

No npm, dependencies, build tools, server logic, forms, cookies or third-party analytics are required.

## 1. The repository naming distinction

Your GitHub organisation is named **SIDM-Community**. The *special* GitHub Pages organisation site would require a repository named `SIDM-Community.github.io`, served by default at `https://sidm-community.github.io/`.

Your existing repository `SIDM-Community/sidm.github.io` is instead an ordinary project Pages repository. It would have a **default** Pages address such as:

`https://sidm-community.github.io/sidm.github.io/`

**You do not have to rename it** to use the custom domain. GitHub Pages can publish this repo as `https://sidm.org.uk/`. All internal links in this package are relative and support both addresses.

You could optionally rename the repository to `SIDM-Community.github.io` later if you want a clean organisation-level fallback domain. This is not necessary for the custom domain.

## 2. Upload and publish

1. Open `https://github.com/SIDM-Community/sidm.github.io`.
2. Put **the contents of this directory** into the root of the repository's `main` branch. The `index.html` file must be at the repository root, not nested within a `sidm-website` folder. You can use **Add file → Upload files** or `git push`. If uploading via the browser, take care that the hidden `.nojekyll` file is included. (The included `CNAME` is important.)
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, select branch **main** and folder **/(root)**, then save.
5. In the same page, set **Custom domain** to `sidm.org.uk` and save. This ordinarily creates or updates the root `CNAME` file in branch-based publishing.
6. Configure the domain's DNS at your registrar as described below. After the certificate is available, enable **Enforce HTTPS**.
7. Open `https://sidm.org.uk/`, test every page, and review links, wording and mobile layout.

GitHub recommends verifying the custom domain before pointing DNS to it. If you can, use GitHub's **Verified domains** controls for the organisation and follow the TXT challenge it gives you. Do not invent the TXT value.

## 3. DNS records for sidm.org.uk

At your DNS provider, create the following **four A records** for the apex domain (`@`):

| Type | Host | Value |
| --- | --- | --- |
| A | @ | `185.199.108.153` |
| A | @ | `185.199.109.153` |
| A | @ | `185.199.110.153` |
| A | @ | `185.199.111.153` |

For the optional, recommended `www` name:

| Type | Host | Target |
| --- | --- | --- |
| CNAME | www | `SIDM-Community.github.io` |

Do not point the `www` CNAME at the repository path. Avoid wildcard records and remove conflicting old parking/default A records. Some registrars call the host for the apex `@`, while others require the field to be blank. Keep existing MX records unchanged if the domain is also used for email.

The site's chosen canonical name is `sidm.org.uk`. With both apex and `www` configured correctly, GitHub Pages should redirect the alternative to the configured custom domain. DNS propagation and HTTPS certificate issuance can take time.

Official documentation:
- [GitHub Pages site types](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
- [Managing a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [Publishing from a branch](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## 4. Using the two repositories

| Repository | Primary purpose |
| --- | --- |
| `sidm.github.io` | Public HTML, styling, navigation, resource signposts and publishing governance |
| `sidm-community` | Community issues, work proposals, contributions, decisions and eventually any formal project files |

The website's **Projects** page shows a few *concepts* based on discussion topics, clearly labelled as concepts. It also has a separate **live feed** that loads from open public issues in `sidm-community` with the label **`project`**. The live feed is implemented in `assets/js/site.js` using GitHub's public REST API, with no credentials and no build step.

To add a real project proposal:
1. Create the label `project` in the `sidm-community` repository, if not already present.
2. Create an Issue in that repository with a meaningful title and description. Explain the problem, audience, proposed outcome, relevant sources and what is being requested.
3. Apply the `project` label once the issue is ready to appear as a public proposal. It will then appear automatically in the live list on `projects.html` without changing the website code.
4. Participants can use that issue's comments for the initial thread. Keep the discussion in one issue rather than creating duplicates.
5. When the work concludes, close the issue and, if appropriate, publish a reviewed output on the website. Open issues appear in the live feed; closed issues do not.

**GitHub Discussions is currently disabled** on `sidm-community` (checked when the site was prepared). If you later enable it in repository settings, you may create discussion categories for structured debate. The initial website deliberately uses GitHub Issues because that feature is already enabled and public issues are readily queryable from static JavaScript. GitHub Issues are public, not a private committee workspace.

## 5. How to edit

- **Text and page structure:** edit the corresponding `.html` file.
- **Look and feel:** edit `assets/css/styles.css`. Brand colours are defined at the top as CSS variables.
- **Reference directory:** edit the resource cards in `resources.html`, keeping `data-item`, `data-tags` and `data-search-text` attributes for the filters.
- **Concept cards:** edit `projects.html`. Concept cards are *not* the same as the live feed from GitHub Issues.
- **Community repository URL, live-label logic or API:** edit `assets/js/site.js`.
- **Logo:** replace the provisional vector icon in `assets/img/favicon.svg` and the matching inline symbol in the repeated HTML headers/footers. Please approve branding before treating it as official.
- **New page:** duplicate a page, change title/content, and add it to navigation/footer in the HTML pages. Also update `sitemap.xml`.

Because the site is small, the header/footer are intentionally repeated in each page. This keeps every page self-contained and understandable without a templating or deployment build system. If the site grows significantly, consider a static site generator for reusable layouts.

## 6. Preview locally

From the extracted site directory:

```sh
python -m http.server 8000
```

Then open `http://localhost:8000`. Static pages also work by opening `index.html` directly, but a local HTTP server is the better test of browser and API behaviour.

JavaScript is only used for progressive enhancements. The external GitHub API feed may be blocked by network policy or rate limits; if so, the site shows a friendly fallback and still provides working links to the community repository.

## 7. Before public launch

- Confirm the purpose, institutional wording, participation arrangements and governance text with the SIDM steering group.
- Check that proposed projects are described as proposals, not authorised workstreams.
- Agree editorial ownership and how publications receive review and approval.
- Ensure internal minutes, meeting materials, action trackers, participant data and draft papers are **not** included in this public repository without explicit permission.
- Verify every external resource URL and decide who will maintain signposts.
- Decide whether to publish a separate software/content licence and code of conduct.
- Check keyboard access, narrow screens, site metadata and cross-browser behaviour.
- If analytics, embedded media or forms are introduced, revisit privacy and cookie obligations.

Prepared 4 November 2026 as an initial public-site package.

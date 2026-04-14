

## Plan: Maximize AI Visibility

### What we'll build

1. **Add `.well-known/ai-plugin.json`** -- An emerging standard that AI platforms check for site metadata and capabilities. We'll create `public/.well-known/ai-plugin.json` with your business info, logo, contact, and pointers to `llms.txt` and `llms-full.txt`.

2. **Update `llms.txt` date** -- Bump "Last updated" to April 2026 so crawlers see fresh content.

3. **Add `<link>` tags in `index.html`** for AI discovery -- Add `<link rel="ai-content" href="/llms.txt">` and `<link rel="ai-content-full" href="/llms-full.txt">` so crawlers find these files from any page.

### How to submit your site directly to AI platforms

These are manual steps you do outside Lovable (no code needed):

| Platform | How to Submit | Link |
|----------|--------------|------|
| **Bing/Copilot** | Submit sitemap in Bing Webmaster Tools (Copilot uses Bing's index) | https://www.bing.com/webmasters |
| **Google/Gemini** | Ensure sitemap is in Google Search Console (Gemini uses Google's index) | https://search.google.com/search-console |
| **ChatGPT (OpenAI)** | No direct submission -- GPTBot crawls allowed sites automatically. Your robots.txt already allows it. Ensure your site is linked from high-authority sources. | -- |
| **Perplexity** | No submission portal -- PerplexityBot crawls automatically. Already allowed in your robots.txt. | -- |
| **Claude (Anthropic)** | No submission portal -- ClaudeBot crawls automatically. Already allowed. | -- |
| **You.com** | Submit at You.com webmaster tools | https://you.com/webmaster |
| **Phind** | No submission -- crawls automatically | -- |

**Key action items for you:**
1. Verify your sitemap is submitted in **Bing Webmaster Tools** (this feeds Copilot, DuckDuckGo, and Yahoo)
2. Verify your sitemap is submitted in **Google Search Console** (this feeds Gemini and Google AI Overviews)
3. Build backlinks from local directories, Muskoka tourism sites, and HGTV/Dockside pages to increase crawl priority

### Technical details

- `public/.well-known/ai-plugin.json` -- standard JSON manifest with `schema_version`, `name_for_human`, `description`, `auth`, `api`, and `logo_url`
- `<link>` tags use `rel="ai-content"` which is an emerging convention some AI crawlers check
- All changes are static files in `public/` so they deploy as-is


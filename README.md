# Small Business Website Launch Kit

A free website planning tool for small businesses. Fill in a short brief, work through a 20-point launch checklist and download the result as a text file. No sign-in, analytics, external packages or server required. Your answers stay in your browser unless you download or copy them.

## Try it

Open `index.html` in a browser. https://expertjuwelier.github.io/small-business-website-launch-kit/.

## What it helps with

- Define your website's audience, main offer and primary action.
- Plan essential pages, proof and contact options.
- Check content, trust, mobile usability, basic search visibility and final launch details.
- Take your brief to any developer, designer or website platform.

This is a planning aid. Check legal requirements, accessibility and technical performance for your own business and location.

## Publish on GitHub Pages

1. Create a **public** GitHub repository named `small-business-website-launch-kit`.
2. Unzip the download and upload the **files inside** `website-launch-kit` to the root of your new repository. Commit them to the `main` branch.
3. Go to **Settings → Pages → Build and deployment**. Choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. Wait for GitHub to show the live Pages URL and open it on your phone and laptop.
5. Edit the **Try it** section above to add your live Pages link.

GitHub Pages publishes the HTML, CSS and JavaScript as a separate site. Its URL will usually look like `https://YOUR-USERNAME.github.io/small-business-website-launch-kit/`.

## Where the business link goes

The page contains one relevant, clearly identified link to [The Marketing Specialists' website builder](https://marketingspecialists.co.za/website-builder/) for readers who want to build a website after planning it. The tool works without clicking that link.

## Customise

- Edit `index.html` to update the business link and page wording.
- Edit `app.js` to change checklist items and exported brief sections.
- Edit `styles.css` to change colours and layout.
- If you change the saved data structure, change the `website-launch-kit-v1` storage key in `app.js` to avoid mixing old and new answers.

## Privacy and licence

The app stores form answers and checklist progress in browser `localStorage`. It makes no network requests of its own. Clicking the external website link takes the visitor to that site's separate privacy practices.

The source code is available under the [MIT Licence](LICENSE).

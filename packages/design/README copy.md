# Hound Component Library

Welcome to the Hound Component Library! This library provides a collection of reusable UI components for your projects.

## 📦 Installation

To install the Hound component library, follow these steps:

1. Create a `.npmrc` file in your project root with the following content:

   ```txt
   /npm.pkg.github.com/:_authToken=<auth-toke>
   <br/>@Mable-AI:registry=https://npm.pkg.github.com
   ```

   Replace `<auth-token>` with your [Github Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).

2. Install the package using.

   ```bash
   pnpm i @Mable-AI/hound
   ```

## 🎨 CSS Usage

The Hound Component Library uses Tailwind CSS. To ensure proper styling, you need to configure your tailwind.config.js file. Here's how:

1. Import the Hound preset in your tailwind.config.js:

```bash
   /** @type {import('tailwindcss').Config} */
import houndPreset from '@Mable-AI/hound/lib/tailwind.config.js';

export default {
  presets: [houndPreset],
  content: [
    './app/**/*.{ts,tsx}',
    './node_modules/@Mable-AI/hound/**/*.{js,jsx,ts,tsx}',
  ],
  // ... other configurations
}
```

This configuration does two important things:

- It imports and uses the Hound preset, which includes all the necessary Tailwind configurations for the library components.
- It includes the Hound library files in the content array, ensuring that Tailwind processes the styles used in the library components.

## 🏷️ Package Versions

### We publish three different categories of packages:

- **Testing Candidate (TC) 🧪** - Represents the develop environment
  > Example: @mable-ai/hound@0.1.3-tc.1721648918
- **Release Candidate (RC) 🚀** - Represents the integration environment
  > Example: @mable-ai/hound@0.1.3-rc.1721648918
- **Production Release ✨** - Represents the stable production version
  > Example: @mable-ai/hound@0.1.3

## 🤝 Contributing

### Here's how you can get started:

1. Clone the repository
2. Install packages
3. Run Storybook
   ```bash
   pnpm run storybook
   ```

### 🧱 Add New Components

1. Navigate to `src/component`
2. Add your component in the appropriate folder:
   1. atom
   2. molecule
   3. loader
   4. Or create a new folder if needed

If you've created a new folder, update the `./generate-index.sh` file:

Add the following line:

```bash
process_directory "<Folder-Name>"
```

Push your changes to GitHub

### Use in Development

1. Edit the path of the Mable Dashboard local repository in restart_dev_server.sh
2. In the Mable Dashboard repository, add the Hound repository path as the version for the @Mable-AI/hound dependency
   - e.g - '@Mable-AI/hound' : 'file:{INSERT_FILE_PATH_TO_HOUND_DIR}' 
3. Use the following command in the hound directory to start the dev server 
   - reflex -r '\.tsx$' -R '^components/index\.tsx$' -s sh restart_dev_server.sh -v

@mableharshit Please edit this

  

## 🔄 Seamless Releases

#### Our CI/CD pipeline automatically:

- Generates an updated index file for new components
- Triggers a new release when PRs are merged to develop, int, or master
- Publishes a fresh package version

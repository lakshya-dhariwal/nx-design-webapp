const { createGlobPatternsForDependencies } = require("@nx/react/tailwind");
const { join } = require("path");
const baseConfig = require("../../tailwind.config");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        join(
            __dirname,
            "{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}"
        ),
        ...createGlobPatternsForDependencies(__dirname),

        // Add custom component library paths here
        ...createGlobPatternsForDependencies(
            join(__dirname, "../../packages/design")
        ),
    ],
    ...baseConfig,
};
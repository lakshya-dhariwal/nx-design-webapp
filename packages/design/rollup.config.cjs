const nrwlConfig = require("@nrwl/react/plugins/bundle-rollup");
const { default: generateIndex } = require("./generateIndex.plugin");

module.exports = (config) => {
    const nxConfig = nrwlConfig(config);
    return {
        ...nxConfig,
        plugins: [generateIndex(), ...nxConfig.plugins],
    };
};

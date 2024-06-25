import type { ExternalPluginConfig } from '@windy/interfaces';

const config: ExternalPluginConfig = {
    name: 'windy-plugin-pm-example',
    version: '0.1.0',
    icon: '🔌',
    title: 'Location & temperature',
    description: 'This is my first plugin.',
    author: 'John Doe (optional company name)',
    repository: 'https://github.com/windycom/windy-plugin-template',
    desktopUI: 'rhpane',
    mobileUI: 'fullscreen',
    routerPath: '/pm-example',
    listenToSingleclick: true,
};

export default config;

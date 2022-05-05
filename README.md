## Google Tag Manager - Page View
This widget inserts the required google tag manager scripts into the head and body tags in order to send page view data to your container. The widget sends an event each time it is rendered.

## Features
1. Initializes google tag manager on the page.
2. Sends either a custom or normal page view event.
3. Can customize what data you would like to send with the page view event.

## Usage
1. Add your [measurement ID](https://support.google.com/tagmanager/answer/6103696).
2. Configure your [GTM container](https://support.google.com/tagmanager/answer/9442095?hl=en) such that you are recording the appropriate information.
3. If using google analytics, configure GTM to send the data to the appropriate property.

## Issues, suggestions and feature requests
The connection to GTM was accomplished using this [npm module](https://www.npmjs.com/package/react-gtm-module). For any issues, please submit a change request in its corresponding github repository which is linked from the npm page. For any other requests, please add them to this [github repository]() under the appropriate section.

## Known limitations and design decisions
1. Pop-ups and modal pop-ups will not currently send a page view because they are considered minor page interactions.

## Development and contribution
1. Install NPM package dependencies by using: `npm install`. If you use NPM v7.x.x, which can be checked by executing `npm -v`, execute: `npm install --legacy-peer-deps`.
2. Run `npm start` to watch for code changes. On every change:
    - the widget will be bundled;
    - the bundle will be included in a `dist` folder in the root directory of the project;
    - the bundle will be included in the `deployment` and `widgets` folder of the Mendix test project.

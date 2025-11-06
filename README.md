# COMPSA Gallery# Getting Started with Create React App



A modern, interactive photo gallery showcasing COMPSA events and activities.This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).



## 🎨 Features## Available Scripts



- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devicesIn the project directory, you can run:

- **Interactive Galleries**: Hover effects and smooth animations

- **Event Organization**: Photos organized by event with descriptions and dates### `npm start`

- **Optimized Performance**: All images compressed for fast loading (219MB total)

- **Modal View**: Click any event to view full gallery in a modalRuns the app in the development mode.\

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 📁 Project Structure

The page will reload when you make changes.\

```You may also see any lint errors in the console.

gallery-page/

├── public/### `npm test`

│   ├── events/          # Event photo folders (900 total images)

│   │   ├── cruise/Launches the test runner in the interactive watch mode.\

│   │   ├── qwic-welcome/See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

│   │   ├── ai-collective/

│   │   ├── orientation-2025/### `npm run build`

│   │   ├── resume-roast/

│   │   ├── group-shots/Builds the app for production to the `build` folder.\

│   │   ├── formal-2025/It correctly bundles React in production mode and optimizes the build for the best performance.

│   │   ├── merch-shoot/

│   │   ├── basketball/The build is minified and the filenames include the hashes.\

│   │   ├── fall-night/Your app is ready to be deployed!

│   │   └── soccer-2024/

│   ├── index.htmlSee the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

│   ├── manifest.json

│   └── robots.txt### `npm run eject`

├── src/

│   ├── components/**Note: this is a one-way operation. Once you `eject`, you can't go back!**

│   │   ├── Gallery.js

│   │   └── Gallery.cssIf you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

│   ├── App.js

│   ├── App.cssInstead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

│   ├── index.js

│   └── index.cssYou don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

└── package.json

```## Learn More



## 🚀 Getting StartedYou can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).



### PrerequisitesTo learn React, check out the [React documentation](https://reactjs.org/).



- Node.js (v14 or higher)### Code Splitting

- npm or yarn

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Installation

### Analyzing the Bundle Size

1. Clone the repository:

```bashThis section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

git clone https://github.com/dan-opse/compsa-gallery-page-drive-api.git

cd gallery-page### Making a Progressive Web App

```

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

2. Install dependencies:

```bash### Advanced Configuration

npm install

```This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)



3. Start the development server:### Deployment

```bash

npm startThis section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

```

### `npm run build` fails to minify

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## 🏗️ Building for Production

Create an optimized production build:

```bash
npm run build
```

The build folder will contain the production-ready files.

## 📸 Adding New Images

See [HOW_TO_ADD_IMAGES.md](HOW_TO_ADD_IMAGES.md) for detailed instructions on adding new photos to the gallery.

**Quick Steps:**
1. Add images to the appropriate folder in `public/events/`
2. Follow the naming convention: `eventprefix-###.jpg` (e.g., `fno-001.jpg`)
3. Compress images using ImageMagick: `mogrify -resize '1200>' -quality 85 *.jpg`
4. Update the image count in `src/components/Gallery.js`

## 🎯 Events Included

- **Cruise** (49 photos)
- **QWIC Welcome Home Night** (24 photos)
- **AI Collective** (60 photos)
- **Orientation 2025** (53 photos)
- **Resume Roast** (15 photos)
- **COMPSA Group Shots** (21 photos)
- **2025 Formal** (178 photos)
- **2025 Merch Shoot** (103 photos)
- **COMPSA Basketball Tournament** (128 photos)
- **2025 Fall Night Out** (172 photos)
- **2024 Soccer Tournament** (97 photos)

**Total: 900 optimized images**

## 🛠️ Technologies Used

- **React** (v19.2.0) - UI Framework
- **React Scripts** (v5.0.1) - Build tooling
- **CSS3** - Styling with animations and responsive design

## 📦 Deployment

This project can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

For GitHub Pages:
```bash
npm install gh-pages --save-dev
npm run deploy
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is for COMPSA internal use.

## 🙋 Support

For questions or issues, contact the COMPSA tech team.

---

Built with ❤️ by COMPSA

const keepfolder = require('imagemin-keep-folder');
const mozjpeg = require('imagemin-mozjpeg');
const pngquant = require('imagemin-pngquant');
// const svgo = require('imagemin-svgo');
const mode = process.env.NODE_ENV !== 'production' ? 'development' : 'production';

keepfolder(['src/assets/img/**/*.{jpg,png,gif,svg,ico}'], {
  plugins: [
    mozjpeg({
      quality: 75,
    }),
    pngquant({
      quality: [0.7, 0.85],
    }),
    // svgo({
    //   plugins: [
    //     { name: 'removeViewBox', active: false },
    //     { name: 'removeMetadata', active: false },
    //     { name: 'removeUnknownsAndDefaults', active: false },
    //     { name: 'convertShapeToPath', active: false },
    //     { name: 'collapseGroups', active: false },
    //     { name: 'cleanupIDs', active: false },
    //   ],
    // }),
  ],
  replaceOutputDir: (output) => {
    return output.replace(/src\//, mode === 'development' ? '../htdocs/' : './dist/');
  },
});

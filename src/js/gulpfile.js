const { src, dest, watch, series } = require('gulp');

// CSS & SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

// Image Processing
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css( done ) {
    src('../scss/app.scss')
        .pipe( sourcemaps.init() )
        .pipe( sass() )
        .pipe( postcss([ autoprefixer(), cssnano() ]) )
        .pipe( sourcemaps.write('.'))
        .pipe( dest('../../build/css') )

    done();
}

function images() {
    return src('../images/**/*')
        .pipe( imagemin({ optimizationLevel: 3 }) )
        .pipe( dest('../../build/images') )
}

function versionWebp() {
    const opciones = {
        quality: 50
    }
    return src('../images/**/*.{png,jpg}')
        .pipe( webp( opciones ) )
        .pipe( dest('../../build/images') )
}
function versionAvif() {
    const opciones = {
        quality: 50
    }
    return src('../images/**/*.{png,jpg}')
        .pipe( avif( opciones ) )
        .pipe( dest('../../build/images'))
}

function dev() {
    watch( '../scss/**/*.scss', css );
    watch( '../images/**/*', images );
}


exports.css = css;
exports.dev = dev;
exports.images = images;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series( images, versionWebp, versionAvif, css, dev  );

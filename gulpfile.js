//var gulp = require('gulp');

//const del = require('del');

//const fileinclude = require('gulp-file-include');


let project_folder = "dist";
let source_folder = "#src";
let path = {
    build: {
        html: project_folder + "/",
        css: project_folder + "/css/",
        js: project_folder + "/js/",
        img: project_folder + "/img/",
        fonts: project_folder + "/fonts/",
    },
    src: {
        html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
        css: [source_folder + "/scss/style.scss", source_folder + "/scss/*.css"],
        js: [source_folder + "/js/script.js", "!" + source_folder + "/js/*min.js", source_folder + "/js/*.js"],
        img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
        fonts: source_folder + "/fonts/*.*",
    },
    watch: {
        html: source_folder + "/**/*.html",
        css: source_folder + "/scss/**/*.*",
        js: source_folder + "/js/**/*.js",
        img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
        fonts: source_folder + "/fonts/**/*.*",
    },
    clean: "./" + project_folder + "/"
}

let { src, dest } = require('gulp'),
    gulp = require('gulp'),
    browsersync = require("browser-sync").create(),
    fileinclude = require("gulp-file-include"),
    del = require("del"),
    //scss = require("gulp-sass"),
    scss = require('gulp-sass')(require('sass')),
    autoprefixer = require("gulp-autoprefixer"),
    //group_media = require("gulp-group-css-media-queries"), //сборка медиа запросов
    clean_css = require("gulp-clean-css"),
    rename = require("gulp-rename"),
    uflify = require("gulp-uglify-es").default, // минификация js (для старых установить buble)
    imagemin = require("gulp-imagemin"); // оптимизация картинок

function browserSync(params) {
    browsersync.init({
        server: {
            baseDir: "./" + project_folder + "/"
        },
        port: 3000,
        notify: false
    })
}

function html() {
    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}

function css() {
    return src(path.src.css)
        .pipe(
          scss({ outputStyle: 'expanded' }).on('error', scss.logError)
            //scss({
            //    outputStyle: "expanded"
            //})
        )
        //.pipe ( //сборка медиа запросов
          //group_media()
        //)
        .pipe(
          autoprefixer({
            overrideBrowserslist: ["last 3 version"],
            cascade: true
          })
        )
        .pipe(dest(path.build.css))
        .pipe(clean_css())
        .pipe(
          rename({
            extname: ".min.css"
          })
        )
        .pipe(dest(path.build.css))
        
        //.pipe(browserSync.reload({stream: true}))
        .pipe(browsersync.stream())
}

function js() {
    return src(path.src.js)
        .pipe(fileinclude())
        .pipe(dest(path.build.js))
        .pipe(uflify())
        .pipe(
          rename({
            extname: ".min.js"
          })
        )
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}


function images() {
    return src(path.src.img)
      .pipe(
        imagemin({
          progressive: true,
          svgoPlagins: [{removeViewBox: false}],
          interlaced: true,
          optimizationLevel: 3 // 0-7
        })
      )
      .pipe(dest(path.build.img))
      .pipe(browsersync.stream())
}
function fonts() {
  return src(path.src.fonts)
    .pipe(dest(path.build.fonts))
    .pipe(browsersync.stream())
}


function watchFiles(params) {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.fonts], fonts);
    gulp.watch([path.watch.css],{ usePolling: true }, css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
}

function clean(params) {
    return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(js, css, html, fonts, images));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.fonts = fonts;
exports.build = build;
exports.watch = watch;
exports.default = watch;
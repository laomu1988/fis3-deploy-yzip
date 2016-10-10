/*
 * author: laomu1988
 * date: 2016-10-10
 * desc: 将输出打包成zip包
 * from https://github.com/fex-team/fis-deploy-tar
 */
var yazl = require("yazl");
var fs = require('fs');
var path = require('path');

module.exports = function (option, modified, files, next) {
    var zipfile = new yazl.ZipFile();
    if (!option || !option.zip) {
        fis.log.error('[fis3-deploy-yzip] need option [zip]')
    }
    // console.log('fis.project.getProjectPath():', fis.project.getProjectPath());
    var targetPath = path.resolve(fis.project.getProjectPath() + '/', option.zip);

    if (!fis.util.exists(targetPath)) {
        fis.util.mkdir(fis.util.pathinfo(targetPath).dirname);
    }
    // console.log('targetPath:', targetPath);

    files.forEach(function (file) {
        // console.log(file);
        if (!file.release) return;
        var name = (file.release).replace(/^\/*/g, '');
        var content = file.getContent();
        zipfile.addBuffer(typeof content === 'string' ? new Buffer(content) : content, name);
    });

    zipfile.outputStream.pipe(fs.createWriteStream(targetPath)).on("close", function () {
        console.log("\nfis3-deploy-zip:", targetPath);
        next && next();
    });
    zipfile.end();
};
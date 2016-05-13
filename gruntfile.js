module.exports = function (grunt) {

    grunt.registerMultiTask('cleanjs', 'Log stuff.', function () {
	var options = this.data;
        grunt.file.recurse(options.folder, function (abspath, rootdir, subdir, filename) {
            var toDelete = !abspath.startsWith(options.exclude);
            if (filename && toDelete) {
                var ext = filename.split('.')[1];
                if (ext == 'js') {
                    var message = 'Deleting ' + filename;
                    grunt.log.writeln(message);
                    grunt.file.delete(abspath);
                }
            }
        });
    });

    grunt.initConfig({
        cleanjs: {
            folder: { "folder" : "Scripts", "exclude" : "Scripts/test" }
        },
        typescript: {
            base: {
                src: ['Scripts/**/*.ts', "!typings/**/*.ts", "!node_modules/**/*.ts"],
                options: {
                    module: 'amd',
                    target: 'es5',
                    removeComments: true,
                    references: ["typings/main.d.ts"]
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-typescript");

    grunt.registerTask('default', ['typescript']);
}
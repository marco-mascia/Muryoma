module.exports = function (grunt) {
// Load grunt tasks automatically
require('load-grunt-tasks')(grunt);
grunt.loadNpmTasks('grunt-contrib-jshint');

// Define the configuration for all the tasks
grunt.initConfig({
    // Project settings
    config: {
        // Configurable paths
        app: '/src',
        dist: '/dist'
    },
    // Watches files for changes and runs tasks based on the changed files
    watch: {
        livereload: {
            options: {
                livereload: '<%= connect.options.livereload %>'
            },
            files: [
                'src/{,*/}*.html',
                'src/{,*/}*.js',
                '.tmp/styles/{,*/}*.css',
                'src/images/{,*/}*'
            ]
        }
    },
    // The actual grunt server settings
    connect: {
        options: {
            port: 9000,
            livereload: 35729,
            hostname: '0.0.0.0'
        },
        livereload: {
            options: {
                open: true,
                base: [
                    '.tmp',
                    'src'
                ]
            }
        },
    },
    /**************  EXTRA OPTIONS  *************/
    // Empties folders to start fresh
    clean: {
        dist: {
            files: [{
                dot: true,
                src: [
                    '.tmp',
                    'dist/*'                    
                ]
            }]
        },
        server: '.tmp'
    },
   
    // Copies remaining files to places other tasks can use
    
    // Concat && uglifycode
 

    uglify : {
         options: {            
                       
        },
      task0 : {
        src : 'src/js/**/*.js',
        dest : 'dist/muryoma.min.js'
      }
    },

    // fix 
    useminPrepare: {
        html: 'src/index.html',
        options: {         
          dest: 'dist'
        }
      },
    usemin: {
        html:['dist/index.html']
    },
    copy: {        
        task0: {               
            src:'src/vendor/*.js', 
            dest:'dist/vendor/phaser-min.js'
        },
        task1: {
            expand: true,
            dot: true,
            cwd: 'src',
            dest: 'dist',
            src: [
                '*.{ico,png,txt}',                    
                '*.html',                    
                'css/*.*',
                'assets/{,*/}*.*'
            ]   
        }
    },
    jshint: {
        all: ['Gruntfile.js', 'src/js/**/*.js']
    }
    
});

  
    grunt.registerTask('serve', function (target) {
        grunt.task.run([
            'connect:livereload',
            'jshint',
            'watch'
        ]);
    });

    // Build version for production    
    grunt.registerTask('build', [        
            'clean:dist',            
            'jshint',
            'copy:task0', 
            'copy:task1',            
            'useminPrepare',             
            'uglify:task0',
            'usemin'
    ]);


};


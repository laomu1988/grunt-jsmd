var fs = require('fs');
module.exports = function (grunt) {
  "use strict";

  // Export the SpriteMaker function
  grunt.registerMultiTask('jsmd', 'create md from jsfile.', function () {
    var that = this,
        done = this.async(),
        log = function(msg){console.log(msg);};//console.log;

    var options = this.options({
    });

    var jsmd = function (file, callback) {
      try{
        log(file);
        var src = file.src[0];
        console.log("    read file: "+src);
        var context = fs.readFileSync(src,'utf-8');
        var outdata = "";

        var lines = context.split("\n"),line;
        var exe = /^\s*(.*?)\s*$/g;
        var inNote = false;
        //清理左右空格
        for(var i = 0;i<lines.length;i++){
          line = lines[i];
          if(line.charAt(line.length -1 ) === '\r'){
            line = line.substring(0,line.length -1);
          }
          exe.lastIndex = 0;
          var result = exe.exec(line);
          line = result[1];
          lines[i] = line;
        }


        for(i = 0;i<lines.length;i++){
          line = lines[i];
          if(line.substring(0,3) === "/**"){//find start
            while(i<lines.length && line.lastIndexOf("*/") !== line.length - 2){//find end
              //没有找到*/结尾标记,则继续向下一行查找
              var next = getParam(lines[++i]);
              if(next === "*/"){
                line += "*/";
              }else{
                line += next.length > 0 ?'\n    * '+next :'\n';
              }
            }
            line = line.substring(0,line.length - 2);
            line = line.substring(3,line.length);
            if(line.length<1){
              continue;
            }
            if(line.charAt(0) === "#"){
              line = '\n'+line;
            }else{
              var func = getFuncName(lines[i+1]);
              if(func){
                line = '  * '+func+':'+line;
              }else{
                line = '* '+line;
              }
              
            }
            log(i+':'+line);
            outdata += line+"\n";
          }
        }
        console.log("----write to file:"+file.dest);
        fs.writeFileSync(file.dest,outdata,"utf-8");
        callback();
      }catch(err){
        throw err;
        callback();
      }
    };
    /*取得函数名称及参数*/
    function getFuncName(str){
      /** log = function(a,b)
      * a.b.fun = function(a,b)
      */

      var result = /\s*([\w.]*)/.exec(str);//取得函数名
      if(!result){
        return '';
      }
      var func = result[1];
      if(func.indexOf(".") >=0){
        func = func.substring(func.lastIndexOf('.')+1);
      }
      //取得参数部分
      var param = str.match(/\([^\)]*\)/g);
      if(param){
        func += param[0];
      }
      /*!function abc(){}*/

      return func;
    }

    /**取得参数说明*/
    function getParam(str){
      /*@param a:参数说明*/
      /*@abc*/
      str =str.substring(str.indexOf("@")+1);
      return str;
    }

    grunt.util.async.forEachSeries(this.files, jsmd, function (err) {
      done();
    });

  });

};

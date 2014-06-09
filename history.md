#历史记录


#14.06.05
  * Bug
    * RegExp第二次exec时返回结果为空,原因执行后RegExp对象lastIndex属性被更改了，需重置为0
    * 见[http://www.w3school.com.cn/jsref/jsref_exec_regexp.asp](http://www.w3school.com.cn/jsref/jsref_exec_regexp.asp)
    
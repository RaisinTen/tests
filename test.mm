#include <JavaScriptCore/JavaScriptCore.h>

template <typename ReturnType, typename... Arguments>
auto bind_function(ReturnType (^function)(Arguments...)) -> void;

void f() {
  bind_function<JSValue *>(^{
    JSValue *val;
    return val;
  });
}
